/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  let persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0,
      koef = place.options[place.selectedIndex].value,
      mistake = [/^\d{1}$/ , /^\d{2}$/, /^\d{3}$/];

      totalValue.innerHTML = 0;
      // количество людей
  persons.addEventListener('input', function() {

    if (mistake[0].test(this.value) || mistake[1].test(this.value) || mistake[2].test(this.value)) {          
      this.value = this.value;
    } else {
        this.value = this.value.slice(0, -1);
      }

    personsSum = +this.value;

    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      total = 0;
    } else {
        total = koef*daysSum*personsSum*4000;
      }        

    if (restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
        totalValue.innerHTML = total;
      }

  });
  // количество дней
  restDays.addEventListener('input', function() {

    if (mistake[0].test(this.value) || mistake[1].test(this.value)) {          
      this.value = this.value;
    } else {
        this.value = this.value.slice(0, -1);
      }

    daysSum = +this.value;

    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      total = 0;
    } else {
        total = koef*daysSum*personsSum*4000;
      }  

    if (persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
      }

  });
  // переключение мест
  place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      totalValue.innerHTML = 0;
    } else {
        koef = this.options[this.selectedIndex].value;
        totalValue.innerHTML = koef*daysSum*personsSum*4000;
      }
  });
}

module.exports = calc;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
  // объект выводимых сообщений
  let message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  },
    form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div'),
    formContact = document.querySelector('#form'),
    inputContact = formContact.getElementsByTagName('input'),
    argum = [form, formContact],
    argumC = [input[0], inputContact[1]];

    statusMessage.classList.add('status');

  // обработка submit 
  let sendForm = (elemF, elemC) => {
    elemF.addEventListener('submit', (event) => {
      event.preventDefault();
      elemF.appendChild(statusMessage);
      let formData = new FormData(elemF);

      let postData = (data) => {
        return new Promise(function(resolve,reject) {
          let request = new XMLHttpRequest();
              request.open('POST', 'server.php');
              request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          let formData = new FormData(elemF);  
          let obj = {};

          formData.forEach(function(value, key) {
            obj[key] = value;
          });

          let json = JSON.stringify(obj);
          // валидация номера телефона
          let phoneNumber = (param) => {
            let phonnumb = /^[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\s]\d{2}[\s]\d{2}$/;  
              if (param.value.match(phonnumb)) {
                return request.send(json);
              } else {
                  return alert("Введите номер телефона правильно! Он должен выглядеть так: +7 (XXX) XXX XX XX");
                }  
          };
          phoneNumber(elemC);

          // текст в классе
          request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
             resolve(); // statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                resolve();// statusMessage.innerHTML = message.success;
              } else {
                  reject();// statusMessage.innerHTML = message.failure;
                }
          });

        }); // primise
      }; // postData
  
      // обнуление input'ов
      let clearInput = () => {
        for (let i = 0; i < elemC.length; i++) {
            elemC[i].value = '';
        }
      };

      postData(formData)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(clearInput);

    }); //sumbit
  };//sendForm

  for (let k = 0; k < argum.length; k++) {
    sendForm(argum[k], argumC[k]);
  }  
}

module.exports = form;

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  let more = document.querySelector('.more'), 
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      tabs = document.querySelectorAll('.description-btn');

  let windowShow = () => {
      overlay.style.display = 'block';
      overlay.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
  };

  //Узнать больше под таймером
  more.addEventListener('click', windowShow);
  
  //Узнать подробнее в табах
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', windowShow);
  }    
  
  //закрыть мод.окно
  close.addEventListener('click', () => {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
}

module.exports = modal;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  let slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');      

  let showSlides = (n) => {

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  };

  let plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  let currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', (event) => {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

  showSlides(slideIndex);
}

module.exports = slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  let hideTabC = (a) => {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    }   
  };
  hideTabC(1);

  let showTabC = (b) => {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }   
  };

  info.addEventListener('click', (event) => {
    let target = event.target;
      if (target && target.classList.contains('info-header-tab')) {
          for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabC(0);
                showTabC(i);
                break;
            }
          }
      }
  });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  let deadline = '2019-05-16';

  let getTimeR = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    zero = 0;

    if (`${t}` > `${zero}`) {
    //функция для добавления 0 в одиночные цифры
      let zeroStr = (a) => {
        if (a.toString().length <= 1) {
            a = `${zero}${a}`;
        }
        return a;        
      };

      let seconds = Math.floor((t/1000) % 60);
      seconds = zeroStr(seconds);
      
      let minutes = Math.floor((t/1000/60) % 60);
      minutes = zeroStr(minutes);

      let hours = Math.floor((t/(1000*60*60)));
      hours = zeroStr(hours);

      return {
        'total' : `${t}`,
        'hours' : `${hours}`,
        'minutes' : `${minutes}`,
        'seconds' : `${seconds}`
      };
    } else {

        return {
          'total' : `${t}`,
          'hours' : '00',
          'minutes' : '00',
          'seconds' : '00'
        };

      }   
  };

  let setClockF = (id, endtime) => {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');       

    let updateClockF = () => {
      let t = getTimeR(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
          clearInterval(timeInterval);
      }          
    };

    let timeInterval = setInterval(updateClockF, 1000);    
  };
  setClockF('timer', `${deadline}`);
}

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {

  "use strict";
  let calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
      form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
      slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
      tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
      timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js"),
      modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js");

  calc();
  form();
  slider();
  tabs();
  timer();
  modal();
  
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map