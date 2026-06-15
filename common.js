/* ═══════════════════════════════════════════════════════════════
   FEARLESS JEWELLERY — Shared behaviour
   Navigation, scroll-reveal and smooth-scroll used on every page.
   Exposed on window.FEARLESS so page scripts can re-run them after
   injecting content dynamically.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAVIGATION ─── */
  function initNavigation() {
    var nav = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.querySelector('.nav__links');
    var links = document.querySelectorAll('.nav__link');
    if (!nav || nav.dataset.bound) return;
    nav.dataset.bound = 'true';

    // Background state on scroll.
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    // Mobile menu toggle.
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });

      links.forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Active section highlighting (in-page anchors only).
    var sections = document.querySelectorAll('section[id]');
    if (sections.length) {
      var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            links.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { threshold: 0.3, rootMargin: '-' + navHeight + 'px 0px -40% 0px' });

      sections.forEach(function (section) { sectionObserver.observe(section); });
    }
  }

  /* ─── SCROLL REVEAL ─── */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal:not(.visible)');
    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var parent = entry.target.closest('.gallery__grid, .social__template-grid');
          if (parent) {
            var siblings = parent.querySelectorAll('.reveal');
            var siblingIndex = Array.prototype.indexOf.call(siblings, entry.target);
            entry.target.style.transitionDelay = (siblingIndex * 0.1) + 's';
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ─── SMOOTH SCROLL (in-page anchors) ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      if (anchor.dataset.smooth) return;
      anchor.dataset.smooth = 'true';
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        var target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      });
    });
  }

  function init() {
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.FEARLESS = {
    initNavigation: initNavigation,
    initScrollReveal: initScrollReveal,
    initSmoothScroll: initSmoothScroll
  };
})();
