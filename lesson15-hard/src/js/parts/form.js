function form() {
  // объект выводимых сообщений
  let message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  },
    form = document.querySelector('.main-form'),
    input = document.getElementsByTagName('input'),
    statusMessage = document.createElement('div'),
    formContact = document.querySelector('#form'),
    argum = [form, formContact];

    statusMessage.classList.add('status');
    //обработчик input tel
    document.body.addEventListener('input', e => {
      let target = e.target;
        if(target.matches(`input[type$='tel']`)) {
          target.value = '+' +target.value.replace(/[^\d]/g, '').slice(0, 11);  
          
          if (target.value.length == 1) {target.value = '';}
        }
    });
  // обработка submit 
  let sendForm = (elemF) => {

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
          
          request.send(json);           

          // текст в классе
          request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
             resolve(); // loading;
            } else if (request.readyState === 4 && request.status == 200) {
              resolve();// success;
            } else {
              reject();// failure;
            }
          })//readystatechange

        });//Promise
      }; //postData
  
          // обнуление input'ов
          let clearInput = () => {
            for (let i = 0; i < input.length; i++) {
              input[i].value = '';
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
    sendForm(argum[k]);
  }   
}

module.exports = form;