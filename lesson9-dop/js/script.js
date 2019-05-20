window.addEventListener('DOMContentLoaded', function() {
 
  'use strict';

  let tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }    

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
        for (let i = 0; i < tab.length; i++) {
          if (target == tab[i]) {
            hideTabContent(0);
            showTabContent(i);
            break;
          }
        }
    }
  });

  //timer
  let deadline = '2019-05-05';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());

    if (t > 0) {
  //функция для добавления 0 в одиночные цифры
      function zeroAdd(a) {
        if (a.toString().length <= 1) {
          a = '0' + a;
        }
        return a;
      }

      let seconds = Math.floor((t/1000) % 60);
      seconds = zeroAdd(seconds);
      
      let minutes = Math.floor((t/1000/60) % 60);
      minutes = zeroAdd(minutes);
  
      let hours = Math.floor((t/(1000*60*60)));
      hours = zeroAdd(hours);
        return {
          'total' : t,
          'hours' : hours,
          'minutes' : minutes,
          'seconds' : seconds
          };
    } else {

        return {
          'total' : t,
          'hours' : '00',
          'minutes' : '00',
          'seconds' : '00'
        };

      }

  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
          let t = getTimeRemaining(endtime);
          hours.textContent = t.hours;
          minutes.textContent = t.minutes;
          seconds.textContent = t.seconds;

          if (t.total <= 0) {
            clearInterval(timeInterval);
          }
        }
  }

  setClock('timer', deadline);

  //Modal window
  let more = document.querySelector('.more'), 
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      tabs = document.querySelectorAll('.description-btn');

      function windowShow() {
        overlay.style.display = 'block';
        document.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
      }

      function windowShowJS() {
        overlay.style.display = 'block';
        // document.classList.add('more-splash');
        document.body.style.overflow = 'hidden';        
      }
  
     
  //закрыть мод.окно
  close.addEventListener('click', function() {
      overlay.style.display = 'none';
      more.classList.remove('more-splash');
      document.body.style.overflow = '';
  });

// прокрутка по пунктам меню
function myScroll () {
  const anchors = document.querySelectorAll('.container-menu')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href')
      
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
}
myScroll();


function opr() {
  var sBrowser, sUsrAg = navigator.userAgent;

  if (sUsrAg.indexOf("Firefox") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShowJS);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShowJS);
                }
  } else if (sUsrAg.indexOf("Opera") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShowJS);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShowJS);
                }
  } else if (sUsrAg.indexOf("Trident") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShow);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShow);
                }
  } else if (sUsrAg.indexOf("Edge") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShow);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShow);
                }
  } else if (sUsrAg.indexOf("Chrome") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShowJS);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShowJS);
              }
  } else if (sUsrAg.indexOf("Safari") > -1) {
             //Узнать больше под таймером
             more.addEventListener('click', windowShowJS);
            //Узнать подробнее в табах
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', windowShowJS);
                }
  } else {
      sBrowser = "unknown";
  }
  
  alert("Анимация на: " + sBrowser);
}
opr();


});