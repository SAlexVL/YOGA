function timer() {
  let deadline = '2019-05-19';

  let getTimeR = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
    zero = 0;

    if (`${t}` > `${zero}`) {
    //функция для добавления 0 в одиночные цифры
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
}

module.exports = timer;