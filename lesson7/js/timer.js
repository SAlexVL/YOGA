window.addEventListener('DOMContentLoaded', function() {
 
  'use strict';

  let times = document.querySelector('.time');

function formatDate(date) {

  // форматировать дату, с учетом того, что месяцы начинаются с 0
  var d = date;
  d = [
    '0' + d.getHours(),
    '0' + d.getMinutes(),
    '0' + d.getSeconds()
  ];

  for (let i = 0; i < d.length; i++) {
    d[i] = d[i].slice(-2);
  }

  return d.slice(0, 3).join(':');
}

//  текущее время в формате "чч:мм:сек"
var time = setInterval(function() {
  times.textContent = formatDate(new Date());
}, 1000);


//  // анимация простая
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());


(function() {

// берем кнопки
let startBtn = document.getElementById('startBtn'),
    stopBtn = document.getElementById('stopBtn'),
    resetBtn = document.getElementById('resetBtn');

// requestID.
let requestID;

// Canvas
let canvas = document.getElementById('stage');

// 2d формат
let ctx = canvas.getContext('2d');

// цвет
ctx.fillStyle = '#212121';

// позиция объекта
var posX = 0;
var boxWidth = 50;
var pixelsPerFrame = 5; // шаг

// рисуем на канве
ctx.fillRect(posX, 0, boxWidth, canvas.height);

// анимация
function animate() {
  requestID = requestAnimationFrame(animate);

  // остановка анимации
  if (posX <= (canvas.width - boxWidth)) {
    ctx.clearRect((posX - pixelsPerFrame), 0, boxWidth, canvas.height);
    ctx.fillRect(posX, 0, boxWidth, canvas.height);
    posX += pixelsPerFrame;
  } else {
    cancelAnimationFrame(requestID);
  }
}

// начало
startBtn.addEventListener('click', function(e) {
  e.preventDefault();

  // старт
  requestID = requestAnimationFrame(animate);
});

// событие
stopBtn.addEventListener('click', function(e) {
  e.preventDefault();

  // стоп
  cancelAnimationFrame(requestID);
});

// сохранить позицию
resetBtn.addEventListener('click', function(e) {
  e.preventDefault();

  // сьрасываем на 0
  posX = 0;

  // очищаем канву
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // вызов
  ctx.fillRect(posX, 0, boxWidth, canvas.height);
});

}());

});