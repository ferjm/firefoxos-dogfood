function showSIMDetails(selectObj) {
  var carrier = document.getElementById('carrier');
  var phoneNumber = document.getElementById('phone_number');
  if (selectObj.options[selectObj.selectedIndex].value == 1) {
    carrier.style.display = phoneNumber.style.display = 'block';
  } else {
    carrier.style.display = phoneNumber.style.display = 'none';
  }
}
