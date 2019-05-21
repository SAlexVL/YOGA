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

    //Modal window
    let overlay = document.querySelector('.overlay'),
    isActiveBtn;

    let bindModal = (overlayStatus, overflowStatus, classListMethod, el) => {
      if(classListMethod == 'add') {isActiveBtn = el;}
      if(!el) {el = isActiveBtn;}
      overlay.style.display = overlayStatus;
      el.classList[classListMethod]('more-splash');
      document.body.style.overflow = overflowStatus;
    };

    document.body.addEventListener('click', (e) => {
      let target = e.target;

      if (target.classList.contains('more') || target.classList.contains('description-btn')) {
        bindModal('block', 'hidden', 'add', target);
      }

      if (target.classList.contains('popup-close')) {
        bindModal('none', '', 'remove');
      }
    });

  // прокрутка по пунктам меню
  let myScroll = () => {
    const anchors = document.querySelectorAll('.container-menu');

    for (let anchor of anchors) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const blockID = anchor.getAttribute('href');
        
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }
  myScroll();

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
            

            // body.addEventListener('input', e => {
            //   let target = e.target;
            //     if(target.matches(input[type$='tel'])) {
            //       target.value = '+' +target.value.replace(/[^\d]/g, '').slice(0, 11);            
            //     }
            // });


              // request.send(json); 
           

            // текст в классе
            request.addEventListener('readystatechange', () => {
              if (request.readyState < 4) {
               resolve(); // loading;
              } else if (request.readyState === 4 && request.status == 200) {
                resolve();// success;
              } else {
                reject();// failure;
              }
            })

            // валидация номера телефона

            let phoneNumber = (param) => {
              let phonnumb = /^[\+]\d{11}$/;
    
                  if (param.value.match(phonnumb)) {
                    return request.send(json);
                  } else {
                      return (param.value = '');
                    }
    
                  };
            phoneNumber(elemC);
          });
        }; 
    
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

  // slider
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

  // calc
  let persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0;

      document.body.addEventListener('input', (e) => {
        let target = e.target;
        if (target.classList == 'counter-block-input') {
          target.value = target.value.replace(/(^[0]{1})/, "");
        }
        personsSum = +persons.value;
        daysSum = +restDays.value;
        total = personsSum * daysSum * 4000;

        if (personsSum == "" || daysSum == "") {
          totalValue.innerHTML = 0;
        } else {
          totalValue.innerHTML = total * place.options[place.selectedIndex].value;
        }

      });

});