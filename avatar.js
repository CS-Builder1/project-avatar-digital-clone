/* ═══════════════════════════════════════════════════════════════
   FEARLESS JEWELLERY — Avatar Profile Page
   Reads ?id=<avatar> and renders that avatar's full profile,
   including the swipeable image slider and prev/next navigation.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var root = document.getElementById('profile');
    if (!root || !window.AVATARS) return;

    var id = new URLSearchParams(window.location.search).get('id');
    var data = window.AVATARS.get(id);

    if (!data) {
      renderNotFound(root);
      return;
    }

    document.title = data.name + ' — ' + data.title + ' | FEARLESS';
    renderProfile(root, id, data);
    buildSlider(root.querySelector('.avatar-profile__main-image'),
                window.AVATARS.imagesFor(id), data.name.toUpperCase());

    // Re-run shared behaviours now that the content exists.
    if (window.FEARLESS) {
      window.FEARLESS.initScrollReveal();
      window.FEARLESS.initSmoothScroll();
    }
  }

  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function renderNotFound(root) {
    document.title = 'Avatar not found | FEARLESS';
    root.innerHTML =
      '<div class="avatar-missing">' +
      '<p class="section-label">Not found</p>' +
      '<h1 class="avatar-profile__name">Avatar not found</h1>' +
      '<p class="avatar-missing__text">We couldn\'t find that avatar. Browse the full collection instead.</p>' +
      '<a class="avatar-back-link" href="index.html#gallery">&larr; Back to the Collection</a>' +
      '</div>';
  }

  function renderProfile(root, id, data) {
    var order = window.AVATARS.order;
    var idx = order.indexOf(id);
    var prevId = idx > 0 ? order[idx - 1] : order[order.length - 1];
    var nextId = idx < order.length - 1 ? order[idx + 1] : order[0];
    var prev = window.AVATARS.get(prevId);
    var next = window.AVATARS.get(nextId);

    var jewelry = data.jewelry.map(function (item) {
      return '<div class="jewelry-item"><span class="jewelry-icon">◆</span> ' + esc(item) + '</div>';
    }).join('');

    var thumbs = window.AVATARS.imagesFor(id).map(function (img, i) {
      return '<button class="avatar-profile__thumb' + (i === 0 ? ' active' : '') +
        '" data-src="' + esc(img.src) + '" data-label="' + esc(img.label) + '">' +
        '<div class="thumb-placeholder">' + (i + 1) + '</div></button>';
    }).join('');

    root.style.setProperty('--placeholder-hue', data.hue);
    root.innerHTML =
      '<div class="avatar-profile__bg-accent"></div>' +
      '<div class="avatar-profile__container">' +
        '<div class="avatar-profile__gallery reveal">' +
          '<a class="avatar-back-link" href="index.html#gallery">&larr; Back to the Collection</a>' +
          '<div class="avatar-profile__main-image">' +
            '<img src="' + esc('images/' + id + '_closeup_1.png') + '" alt="' + esc(data.name) + '" data-active />' +
            '<div class="avatar-profile__placeholder">' + esc(data.name.toUpperCase()) + '</div>' +
          '</div>' +
          '<div class="avatar-profile__thumbs">' + thumbs + '</div>' +
        '</div>' +
        '<div class="avatar-profile__bio reveal">' +
          '<span class="avatar-profile__number">' + esc(data.number) + '</span>' +
          '<h1 class="avatar-profile__name">' + esc(data.name) + '</h1>' +
          '<p class="avatar-profile__title-line">' + esc(data.title) + '</p>' +
          '<div class="avatar-profile__divider"></div>' +
          '<div class="avatar-profile__meta">' +
            '<div class="meta-item"><span class="meta-label">Origin</span><span class="meta-value">' + esc(data.origin) + '</span></div>' +
            '<div class="meta-item"><span class="meta-label">Profession</span><span class="meta-value">' + esc(data.profession) + '</span></div>' +
          '</div>' +
          '<div class="avatar-profile__story">' +
            '<h3>Backstory</h3><p>' + esc(data.backstory) + '</p>' +
            '<h3>Personality</h3><p>' + esc(data.personality) + '</p>' +
          '</div>' +
          '<div class="avatar-profile__jewelry"><h3>Fearless Jewellery</h3>' + jewelry + '</div>' +
          '<div class="avatar-profile__appearance"><h3>Styling Notes</h3><p>' + esc(data.styling) + '</p></div>' +
        '</div>' +
      '</div>' +
      '<nav class="avatar-pager">' +
        '<a class="avatar-pager__link avatar-pager__link--prev" href="avatar.html?id=' + esc(prevId) + '">' +
          '<span class="avatar-pager__dir">&larr; Previous</span>' +
          '<span class="avatar-pager__name">' + esc(prev.name) + '</span>' +
        '</a>' +
        '<a class="avatar-pager__link avatar-pager__link--next" href="avatar.html?id=' + esc(nextId) + '">' +
          '<span class="avatar-pager__dir">Next &rarr;</span>' +
          '<span class="avatar-pager__name">' + esc(next.name) + '</span>' +
        '</a>' +
      '</nav>';
  }

  /* ─── IMAGE SLIDER ─── */
  function buildSlider(container, images, name) {
    if (!container || !images.length) return;
    var thumbs = container.parentElement.querySelectorAll('.avatar-profile__thumb');

    var track = document.createElement('div');
    track.className = 'avatar-profile__slider-track';

    images.forEach(function (img, index) {
      var slide = document.createElement('div');
      slide.className = 'avatar-profile__slide';
      slide.setAttribute('data-index', index);

      var image = document.createElement('img');
      image.className = 'avatar-profile__slide-img';
      image.alt = img.label;
      image.loading = index === 0 ? 'eager' : 'lazy';

      var ph = document.createElement('div');
      ph.className = 'avatar-profile__slide-placeholder';
      ph.textContent = name;

      image.onload = function () { image.style.display = 'block'; ph.style.display = 'none'; };
      image.onerror = function () { image.style.display = 'none'; ph.style.display = 'flex'; };
      image.src = img.src;

      slide.appendChild(image);
      slide.appendChild(ph);
      track.appendChild(slide);
    });

    container.innerHTML = '';
    container.appendChild(track);

    var leftArrow = document.createElement('button');
    leftArrow.className = 'avatar-profile__arrow avatar-profile__arrow--left disabled';
    leftArrow.setAttribute('aria-label', 'Previous image');
    leftArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>';

    var rightArrow = document.createElement('button');
    rightArrow.className = 'avatar-profile__arrow avatar-profile__arrow--right';
    if (images.length <= 1) rightArrow.classList.add('disabled');
    rightArrow.setAttribute('aria-label', 'Next image');
    rightArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';

    container.appendChild(leftArrow);
    container.appendChild(rightArrow);

    var getIndex = function () {
      var width = track.clientWidth;
      if (width <= 0) return 0;
      return Math.round(track.scrollLeft / width);
    };

    var updateActiveStates = function () {
      var index = getIndex();
      thumbs.forEach(function (t, i) { t.classList.toggle('active', i === index); });
      leftArrow.classList.toggle('disabled', index === 0);
      rightArrow.classList.toggle('disabled', index === images.length - 1);
    };

    var scrollToIndex = function (index) {
      track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    };

    var isScrolling = false;
    track.addEventListener('scroll', function () {
      if (!isScrolling) {
        window.requestAnimationFrame(function () { updateActiveStates(); isScrolling = false; });
        isScrolling = true;
      }
    });

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () { scrollToIndex(index); });
    });

    leftArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      var index = getIndex();
      if (index > 0) scrollToIndex(index - 1);
    });

    rightArrow.addEventListener('click', function (e) {
      e.stopPropagation();
      var index = getIndex();
      if (index < images.length - 1) scrollToIndex(index + 1);
    });

    // Keyboard navigation.
    container.setAttribute('tabindex', '0');
    var isHovered = false;
    container.addEventListener('mouseenter', function () { isHovered = true; });
    container.addEventListener('mouseleave', function () { isHovered = false; });

    var handleKeyDown = function (e) {
      if (e.key === 'ArrowLeft') {
        var i = getIndex();
        if (i > 0) { e.preventDefault(); scrollToIndex(i - 1); }
      } else if (e.key === 'ArrowRight') {
        var j = getIndex();
        if (j < images.length - 1) { e.preventDefault(); scrollToIndex(j + 1); }
      }
    };
    container.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', function (e) {
      if (isHovered && document.activeElement !== container) handleKeyDown(e);
    });

    // Mouse drag-to-scroll.
    var isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isDown = true;
      container.classList.add('grabbing');
      track.style.scrollSnapType = 'none';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    var endDrag = function () {
      if (!isDown) return;
      isDown = false;
      container.classList.remove('grabbing');
      track.style.scrollSnapType = 'x mandatory';
      scrollToIndex(getIndex());
    };

    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }
})();
