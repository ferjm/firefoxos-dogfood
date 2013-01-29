function showSIMDetails(selectObj) {
  var phoneNumber = document.getElementById('phone_number');
  if (selectObj.options[selectObj.selectedIndex].value == 1) {
    phoneNumber.style.display = 'block';
  } else {
    phoneNumber.style.display = 'none';
  }
}
