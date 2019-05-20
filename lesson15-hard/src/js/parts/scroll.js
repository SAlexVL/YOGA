function scroll() {
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
}

module.exports = scroll;