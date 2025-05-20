import { soundToggle, startMillisecondTimer } from './helpers.js';

document.addEventListener('gesturestart', function (e) {
  if (!e.target.closest('iframe')) {
    e.preventDefault();
  }
});

window.addEventListener('load', () => {
  soundToggle();
  startMillisecondTimer();
});
