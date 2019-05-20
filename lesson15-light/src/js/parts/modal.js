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