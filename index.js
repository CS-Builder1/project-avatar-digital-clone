/* ═══════════════════════════════════════════════════════════════
   FEARLESS JEWELLERY — Home Page
   Hero particle canvas, social-template tabs and gallery card tilt.
   Shared navigation / reveal / smooth-scroll live in common.js.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initParticles();
    initSocialTabs();
    initCardTilt();
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
     SOCIAL MEDIA TABS
     ═══════════════════════════════════════════════════════════════ */
  function initSocialTabs() {
    const tabs = document.querySelectorAll('.social__tab');
    const panels = document.querySelectorAll('.social__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const platform = tab.getAttribute('data-platform');

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(panel => {
          const isTarget = panel.getAttribute('data-platform') === platform;
          panel.classList.toggle('active', isTarget);

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
     GALLERY CARD TILT
     ═══════════════════════════════════════════════════════════════ */
  function initCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = document.querySelectorAll('.gallery__card');

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
  }
})();
