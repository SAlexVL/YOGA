window.addEventListener('DOMContentLoaded', function() {
 
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  let hideTabC = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }   
  }
  hideTabC(1);

  let showTabC = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }   
  }

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

  //timer
  let deadline = '2019-05-16';
  // изменена и эта функция на стрелочную
  let getTimeR = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    zero = 0;

    if (`${t}` > `${zero}`) {
    //функция для добавления 0 в одиночные цифры
      // стрелочная 
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
  }

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
        }

        let timeInterval = setInterval(updateClockF, 1000);    
  }
  setClockF('timer', `${deadline}`);

    //Modal window
    let more = document.querySelector('.more'), 
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    tabs = document.querySelectorAll('.description-btn');

    let windowShow = () => {
      overlay.style.display = 'block';
      overlay.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    }

    //Узнать больше под таймером
    more.addEventListener('click', () => {
      windowShow();
    });
    //Узнать подробнее в табах
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', () => {
          windowShow();
        });
      }    
    //закрыть мод.окно
    close.addEventListener('click', () => {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
  });

  // Form
  // объект выводимых сообщений
  let message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  },    // остальные переменные
      form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      statusMessage = document.createElement('div'),
      formContact = document.querySelector('#form'),
      inputContact = formContact.getElementsByTagName('input'),
      argum = [form, formContact];

      statusMessage.classList.add('status');

  // обработка submit 
  for (let j = 0; j < argum.length; j++) {

    argum[j].addEventListener('submit', (event) => {
      event.preventDefault();
      argum[j].appendChild(statusMessage);
  
      let request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  
      let formData = new FormData(argum[j]);
  
      let obj = {};
      formData.forEach(function(value, key) {
        obj[key] = value;
      });
      let json = JSON.stringify(obj);
      // валидация номера телефона
      let phoneNumber = (param) => {
        let phonnumb = /^[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\s]\d{2}[\s]\d{2}$/;
    
        if (param[j].value.match(phonnumb)) {
              return request.send(json);
        } else {
              return alert("Введите номер телефона правильно! Он должен выглядеть так: +7 (XXX) XXX XX XX");
          }

      }
      phoneNumber(argum[j]);
      // текст в классе
      request.addEventListener('readystatechange', function() {
          if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
          } else if (request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
          } else {
            statusMessage.innerHTML = message.failure;
          }
      });
          // обнуление input'ов
          for (let i = 0; i < input.length; i++) {
            input[i].value = '';
          }
          for (let j = 0; j < inputContact.length; j++) {
            inputContact[j].value = '';
          }  
    });
  }

});