function calc() {
  let persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0,
      koef = place.options[place.selectedIndex].value,
      mistake = [/^\d{1}$/ , /^\d{2}$/, /^\d{3}$/];

      totalValue.innerHTML = 0;
      // количество людей
  persons.addEventListener('input', function() {

    if (mistake[0].test(this.value) || mistake[1].test(this.value) || mistake[2].test(this.value)) {          
      this.value = this.value;
    } else {
        this.value = this.value.slice(0, -1);
      }

    personsSum = +this.value;

    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      total = 0;
    } else {
        total = koef*daysSum*personsSum*4000;
      }        

    if (restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
        totalValue.innerHTML = total;
      }

  });
  // количество дней
  restDays.addEventListener('input', function() {

    if (mistake[0].test(this.value) || mistake[1].test(this.value)) {          
      this.value = this.value;
    } else {
        this.value = this.value.slice(0, -1);
      }

    daysSum = +this.value;

    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      total = 0;
    } else {
        total = koef*daysSum*personsSum*4000;
      }  

    if (persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
      }

  });
  // переключение мест
  place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '' || restDays.value == "0" || persons.value == "0") {
      totalValue.innerHTML = 0;
    } else {
        koef = this.options[this.selectedIndex].value;
        totalValue.innerHTML = koef*daysSum*personsSum*4000;
      }
  });
}

module.exports = calc;