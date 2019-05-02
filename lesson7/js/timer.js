window.addEventListener('DOMContentLoaded', function() {
 
  'use strict';

  let times = document.querySelector('.time');

function formatDate(date) {
  let diff = new Date() - date; // разница в миллисекундах
  let sec = Math.floor(diff / 1000); // округлить diff до секунд
  let min = Math.floor(diff / 60000); // округлить diff до минут

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

 // текущее время в формате "чч:мм:сек"
var time = setInterval(function() {
  times.textContent = formatDate(new Date(new Date));
}, 1000);

});