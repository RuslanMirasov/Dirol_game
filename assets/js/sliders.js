const sliders = document.querySelectorAll('[data-slider]');

export const initSliders = () => {
  if (sliders.length > 0) {
    sliders.forEach(sliderWrapper => {
      const swiper = sliderWrapper.querySelector('.swiper');
      const arrowPrev = sliderWrapper.querySelector('[data-arrow-prev]');
      const arrowNext = sliderWrapper.querySelector('[data-arrow-next]');

      const options = {
        allowTouchMove: true,
        effect: 'slide',
        speed: '600',
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      };

      if (arrowPrev && arrowNext) {
        options.navigation = {
          prevEl: arrowPrev,
          nextEl: arrowNext,
        };
      }

      new Swiper(swiper, options);
    });
  }
};
