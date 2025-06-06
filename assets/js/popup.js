export const popup = {
  _backdrop: null,
  _popup: null,
  _scrollY: 0,
  _isOpening: false,
  _isAnimating: false,

  init() {
    this._backdrop = document.querySelector('[data-backdrop]');
    this._popup = this._backdrop?.querySelector('[data-popup]');

    if (!this._backdrop || !this._popup) {
      console.warn('Контейнеры для попапа не найдены');
      return;
    }

    this._bindCloseEvents();
  },

  async open(id) {
    if (this._isOpening || this._isAnimating) return;
    this._isOpening = true;

    const newContent = this._popup.querySelector(`#${id}`);
    if (!newContent) {
      console.warn(`Попап с id="${id}" не найден`);
      this._isOpening = false;
      return;
    }

    const currentContent = this._popup.querySelector('.popup-content[style*="display: block"]');

    if (currentContent && currentContent !== newContent) {
      await this.close();
    }

    const alreadyVisible = this._popup.classList.contains('visible');

    if (alreadyVisible) {
      await this._switchContent(newContent);
    } else {
      this._scrollY = window.scrollY;
      await this._showContent(newContent);
    }

    this._isOpening = false;
  },

  async close() {
    if (this._isOpening || this._isAnimating) return;
    this._isOpening = true;

    this._popup.classList.remove('visible');
    this._backdrop.classList.remove('active');

    await this._waitForTransition(this._backdrop);
    this._unlockScroll();
    this._hideAllContent();

    this._isOpening = false;
  },

  _bindCloseEvents() {
    document.addEventListener('click', e => {
      if (this._isOpening || this._isAnimating) return;

      const shereButton = e.target.closest('[data-shere-link]');
      if (shereButton) {
        const link = shereButton.dataset.shereLink;

        const span = shereButton.querySelector('.ellipsis');

        if (link && span) {
          navigator.clipboard
            .writeText(link)
            .then(() => {
              const originalText = span.textContent;
              span.textContent = 'Скопировано';

              setTimeout(() => {
                span.textContent = originalText;
              }, 1000);
            })
            .catch(err => {
              console.warn('Ошибка при копировании: ', err);
            });
        }
      }

      const openBtn = e.target.closest('[data-popup-open]');
      if (openBtn) {
        e.preventDefault();
        this.open(openBtn.dataset.popupOpen);
        return;
      }

      const isCloseTarget = e.target === this._backdrop || e.target.hasAttribute('data-popup-close');
      if (isCloseTarget) {
        this.close();
      }
    });

    document.addEventListener('keydown', e => {
      if ((this._isOpening || this._isAnimating) && e.key === 'Escape') {
        return;
      }
      if (e.key === 'Escape') {
        this.close();
      }
    });
  },

  async _switchContent(newContent) {
    this._popup.classList.remove('visible');
    await this._waitForTransition(this._backdrop);
    this._hideAllContent();
    newContent.style.display = 'block';
    this._popup.classList.add('visible');
    await this._waitForTransition(this._backdrop);
  },

  async _showContent(newContent) {
    this._hideAllContent();
    newContent.style.display = 'block';

    const popupHeight = newContent.offsetHeight;
    const shouldLockScroll = popupHeight <= window.innerHeight - 100;

    this._lockScroll(shouldLockScroll);

    this._backdrop.classList.add('active');
    this._popup.classList.add('visible');

    await this._waitForTransition(this._backdrop);
  },

  _hideAllContent() {
    this._popup.querySelectorAll('.popup-content').forEach(el => {
      el.style.display = 'none';
    });
  },

  async _waitForTransition(element, propertyName = 'opacity') {
    this._isAnimating = true;

    return new Promise(resolve => {
      const duration = parseFloat(getComputedStyle(element).transitionDuration) * 1000;

      if (duration === 0) {
        this._isAnimating = false;
        resolve();
        return;
      }

      const handler = e => {
        if (e.propertyName === propertyName) {
          element.removeEventListener('transitionend', handler);
          this._isAnimating = false;
          resolve();
        }
      };

      element.addEventListener('transitionend', handler, { once: true });

      setTimeout(() => {
        element.removeEventListener('transitionend', handler);
        this._isAnimating = false;
        resolve();
      }, duration + 50);
    });
  },

  _lockScroll() {
    const header = document.querySelector('.header');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.width = `calc(100% - ${scrollbarWidth}px)`;

    if (header) {
      header.style.width = `calc(100% - ${scrollbarWidth}px)`;
    }
  },

  _unlockScroll() {
    const header = document.querySelector('.header');

    if (header) {
      header.style.width = '100%';
    }

    document.body.style.overflow = '';
    document.body.style.width = '100%';
  },
};
