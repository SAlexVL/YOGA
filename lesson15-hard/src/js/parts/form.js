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