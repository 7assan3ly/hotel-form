(function () {
  "use strict";
  // AUTO COMPELETE FOR DESTINATION LIST
  let destinationInput = document.getElementById('destination');
  let destinationList = document.getElementById('destinationList');
  destinationInput.addEventListener('input', destinationAutoComplete);
  destinationList.addEventListener('click', desSelectItem);

  function destinationAutoComplete({ target }) {
    let data = target.value;
    destinationList.innerHTML = ``;
    if (data.length) {
      let autoCompleteValues = desAutoComplete(data);
      autoCompleteValues.forEach(value => { desAddItem(value); });
    }
  }

  function desAutoComplete(inputValue) {
    let destination = ["Cairo"];
    if(inputValue.length >= 3) {
      return destination.filter(
        (value) => value.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  }

  function desAddItem(value) {
    destinationList.innerHTML = destinationList.innerHTML + `<li>${value}</li>`;
  }

  function desSelectItem({ target }) {
    if (target.tagName === 'LI') {
      destinationInput.value = target.textContent;
      destinationList.innerHTML = ``;
      let checkIn = document.getElementById("checkIn");
      checkIn.focus();
      checkIn.showPicker();
    }
  }
  
  // focus on check out date after select check in date
  checkIn.setAttribute("min", new Date().toISOString().split("T")[0]);
  let checkOut = document.getElementById("checkOut");
  checkIn.addEventListener('change', function () {
    checkOut.setAttribute("min", checkIn.value);
    checkOut.focus();
    checkOut.showPicker();
  })
  // calculate number of nights after select check in and check out dates
  let nights = document.getElementById("nights");
  checkOut.addEventListener("change", function() {
    let oldDate = new Date(checkIn.value);
    let newDate = new Date(this.value);
    var timeDifference = Math.abs(newDate.getTime() - oldDate.getTime());
    var days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    nights.value = days
  })

  // change check out date based on number of nights entered
  nights.addEventListener("change", function() {
    let checkInDate = new Date(checkIn.value)
    let numOfDays = parseInt(nights.value)
    checkInDate.setDate(checkInDate.getDate() + numOfDays)
    let checkOutDate = checkInDate.toISOString().slice(0, 10)
    checkOut.value = checkOutDate
  })

  // nationality auto compelete list
  let nationalityInput = document.getElementById('nationality');
  let nationalityList = document.getElementById('nationalityList');
  nationalityInput.addEventListener('input', nationAutoComplete);
  nationalityList.addEventListener('click', natSelectItem);

  function nationAutoComplete({ target }) {
    let data = target.value;
    nationalityList.innerHTML = ``;
    if (data.length) {
      let autoCompleteValues = natAutoComplete(data);
      autoCompleteValues.forEach(value => { natAddItem(value); });
    }
  }

  function natAutoComplete(inputValue) {
    let egyptIdx = {
      img: 'img/egypt.png',
      value: "Egyptian"
    }
    let nationality = [egyptIdx];
      return nationality.filter(
        (value) => value.value.toLowerCase().includes(inputValue.toLowerCase())
      );
  }

  function natAddItem(value) {
    nationalityList.innerHTML = nationalityList.innerHTML + `<li> <img src=${value.img} /> <span>${value.value}</span> </li>`;
  }

  function natSelectItem({ target }) {
    if (target.tagName === 'LI' || target.tagName === 'SPAN') {
      nationalityInput.value = target.textContent;
      nationalityList.innerHTML = ``;
    }
  }

})();

