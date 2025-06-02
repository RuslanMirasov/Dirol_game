import { popup } from './popup.js';
import { initSelectFields } from './select.js';
import { soundToggle, startMillisecondTimer, hidePreloader } from './helpers.js';

document.addEventListener('gesturestart', function (e) {
  if (!e.target.closest('iframe')) {
    e.preventDefault();
  }
});

window.addEventListener('load', () => {
  popup.init();
  window.popup = popup;
  soundToggle();
  startMillisecondTimer();
  initSelectFields();
  setTimeout(() => {
    hidePreloader();
  }, 400);
});
