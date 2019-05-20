// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', function () {

  "use strict";
  let calc = require('./parts/calc.js'),
      form = require('./parts/form.js'),
      slider = require('./parts/slider.js'),
      scroll = require('./parts/scroll.js'),
      tabs = require('./parts/tabs.js'),
      timer = require('./parts/timer.js'),
      modal = require('./parts/modal.js');

  calc();
  form();
  slider();
  scroll();
  tabs();
  timer();
  modal();
  
});