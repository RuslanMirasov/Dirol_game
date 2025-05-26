import { popup } from './popup.js';
import { soundToggle, startMillisecondTimer } from './helpers.js';

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
});
