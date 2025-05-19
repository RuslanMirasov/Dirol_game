import { popup } from './popup.js';
import { initSliders } from './sliders.js';
import { passwordToggle } from './helpers.js';

popup.init();
window.popup = popup;
initSliders();
passwordToggle();
