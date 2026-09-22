/* =========================================================
   Dump Wizard — interactions
   Vanilla JS. No dependencies, no external calls.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeNav() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open && window.innerWidth <= 900 ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Before / after comparison sliders ---------- */
  document.querySelectorAll('[data-compare]').forEach(function (card) {
    var frame = card.querySelector('.ba-frame');
    var before = card.querySelector('[data-before]');
    var handle = card.querySelector('[data-handle]');
    var range = card.querySelector('[data-range]');
    if (!frame || !before || !handle || !range) return;

    var beforeImg = before.querySelector('img');

    function syncWidth() {
      if (beforeImg) beforeImg.style.width = frame.clientWidth + 'px';
    }

    function setPos(pct) {
      var v = Math.max(0, Math.min(100, pct));
      before.style.width = v + '%';
      handle.style.left = v + '%';
      range.value = String(v);
    }

    function fromClientX(clientX) {
      var rect = frame.getBoundingClientRect();
      if (!rect.width) return;
      setPos(((clientX - rect.left) / rect.width) * 100);
    }

    var dragging = false;

    function startDrag(e) {
      dragging = true;
      frame.classList.add('dragging');
      if (e.clientX !== undefined) fromClientX(e.clientX);
    }
    function moveDrag(e) {
      if (!dragging) return;
      var x = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      if (x === null) return;
      if (e.cancelable) e.preventDefault();
      fromClientX(x);
    }
    function endDrag() {
      dragging = false;
      frame.classList.remove('dragging');
    }

    frame.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', moveDrag, { passive: false });
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // Keyboard + native range fallback
    range.addEventListener('input', function () {
      setPos(parseFloat(range.value));
    });

    window.addEventListener('resize', syncWidth);
    if (beforeImg && !beforeImg.complete) {
      beforeImg.addEventListener('load', syncWidth);
    }

    syncWidth();
    setPos(parseFloat(range.value || '50'));
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(siblings, 6) * 70 + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = document.querySelectorAll('.faq-list details');
  faqs.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqs.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Quote form → mailto (no backend, no external API) ---------- */
  var form = document.getElementById('quoteForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = ['qname', 'qphone', 'qcity'];
      var missing = false;

      required.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var empty = !el.value.trim();
        el.classList.toggle('invalid', empty);
        if (empty && !missing) {
          missing = true;
          el.focus();
        }
      });

      if (missing) {
        if (status) status.textContent = 'Please add your name, phone, and city — or just call (561) 980-3444.';
        return;
      }

      var name = document.getElementById('qname').value.trim();
      var phone = document.getElementById('qphone').value.trim();
      var city = document.getElementById('qcity').value.trim();
      var service = document.getElementById('qservice').value;
      var details = document.getElementById('qdetails').value.trim();

      var subject = 'Quote request: ' + service + ' — ' + city;
      var body =
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'City: ' + city + '\n' +
        'Service: ' + service + '\n\n' +
        'Details:\n' + (details || '(none provided)') + '\n';

      window.location.href =
        'mailto:dumpwizardfl@gmail.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = 'Opening your email app… For the fastest answer, call or text (561) 980-3444.';
      }
    });

    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', function () { input.classList.remove('invalid'); });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
