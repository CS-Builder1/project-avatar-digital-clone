/* ═══════════════════════════════════════════════════════════════
   FEARLESS JEWELLERY — Digital Avatar Lookbook
   Interactive JavaScript
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM Ready ───
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initParticles();
    initScrollReveal();
    initNavigation();
    initGalleryThumbnails();
    initSocialTabs();
    initParallax();
    initSmoothScroll();
  }

  /* ═══════════════════════════════════════════════════════════════
     GOLD PARTICLE CANVAS — Hero Section
     ═══════════════════════════════════════════════════════════════ */
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let width, height;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.15 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        // Gold color variations
        const goldVariants = [
          [201, 169, 78],
          [212, 175, 55],
          [232, 220, 200],
          [200, 180, 100],
          [180, 155, 65]
        ];
        this.color = goldVariants[Math.floor(Math.random() * goldVariants.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeDirection * this.fadeSpeed;

        if (this.opacity <= 0.05 || this.opacity >= 0.6) {
          this.fadeDirection *= -1;
        }

        if (this.x < -10 || this.x > width + 10 ||
            this.y < -10 || this.y > height + 10) {
          this.reset();
          this.y = this.speedY < 0 ? height + 5 : -5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
        ctx.fill();

        // Glow effect for larger particles
        if (this.size > 1.2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity * 0.1})`;
          ctx.fill();
        }
      }
    }

    function createParticles() {
      const count = Math.min(Math.floor((width * height) / 8000), 150);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    }

    // Visibility-based optimization
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animId) animate();
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.1 });

    resize();
    createParticles();
    animate();
    observer.observe(canvas);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SCROLL REVEAL — Intersection Observer
     ═══════════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger children in grids
            const parent = entry.target.closest('.gallery__grid, .social__template-grid');
            if (parent) {
              const siblings = parent.querySelectorAll('.reveal');
              const siblingIndex = Array.from(siblings).indexOf(entry.target);
              entry.target.style.transitionDelay = `${siblingIndex * 0.1}s`;
            }

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    reveals.forEach(el => observer.observe(el));
  }

  /* ═══════════════════════════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════════════════════════ */
  function initNavigation() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav__links');
    const links = document.querySelectorAll('.nav__link');

    // Scroll state
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      nav.classList.toggle('scrolled', currentScroll > 80);
      lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });

      // Close on link click
      links.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
          hamburger.classList.remove('open');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px -40% 0px`
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('active',
              link.getAttribute('href') === `#${id}` ||
              (id.includes('-section') && link.getAttribute('href') === '#amara-section')
            );
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ═══════════════════════════════════════════════════════════════
     GALLERY THUMBNAILS — Image Switching
     ═══════════════════════════════════════════════════════════════ */
  function initGalleryThumbnails() {
    const profiles = document.querySelectorAll('.avatar-profile');

    profiles.forEach(profile => {
      const mainImage = profile.querySelector('.avatar-profile__main-image img');
      const placeholder = profile.querySelector('.avatar-profile__placeholder');
      const thumbs = profile.querySelectorAll('.avatar-profile__thumb');

      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const src = thumb.getAttribute('data-src');
          const label = thumb.getAttribute('data-label');

          // Update active state
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');

          // Fade transition
          if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
              mainImage.src = src;
              mainImage.alt = label || '';
              mainImage.style.opacity = '1';

              // Show/hide placeholder based on image load
              mainImage.onerror = () => {
                mainImage.style.display = 'none';
                if (placeholder) placeholder.style.display = 'flex';
              };
              mainImage.onload = () => {
                mainImage.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
              };
            }, 300);
          }
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SOCIAL MEDIA TABS
     ═══════════════════════════════════════════════════════════════ */
  function initSocialTabs() {
    const tabs = document.querySelectorAll('.social__tab');
    const panels = document.querySelectorAll('.social__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const platform = tab.getAttribute('data-platform');

        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        panels.forEach(panel => {
          const isTarget = panel.getAttribute('data-platform') === platform;
          panel.classList.toggle('active', isTarget);

          // Re-trigger reveal animations for the new panel
          if (isTarget) {
            const reveals = panel.querySelectorAll('.reveal:not(.visible)');
            reveals.forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.1}s`;
              el.classList.add('visible');
            });
          }
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     PARALLAX — Subtle background effects
     ═══════════════════════════════════════════════════════════════ */
  function initParallax() {
    const accents = document.querySelectorAll('.avatar-profile__bg-accent');
    if (!accents.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          accents.forEach(accent => {
            const section = accent.closest('.avatar-profile');
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const offset = (scrollY - sectionTop) * 0.08;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
              accent.style.transform = `translateY(${offset}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════════
     SMOOTH SCROLL — Enhanced anchor behavior
     ═══════════════════════════════════════════════════════════════ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (target) {
          const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     UTILITY — Hover tilt effect for gallery cards
     ═══════════════════════════════════════════════════════════════ */
  (function initCardTilt() {
    const cards = document.querySelectorAll('.gallery__card');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  })();

})();
