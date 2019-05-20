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