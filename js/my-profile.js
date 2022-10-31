const forms = document.querySelectorAll('.needs-validation');
const firstNameInput = document.getElementById('first-name');
const secondNameInput = document.getElementById('second-name');
const firstLastNameInput = document.getElementById('first-lastname');
const secondLastNameInput = document.getElementById('second-lastname');
const imageInput = document.getElementById('img-profile');
const emailInput = document.getElementById('email-input');
const numberInput = document.getElementById('telephone-number');

document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('userID');
    const profileInfo = JSON.parse(localStorage.getItem('profileInfo'));

    emailInput.value = user

    if(!profileInfo) return console.log('No hay nadie');

    const { firstName, secondName , firstLastName , secondLastName, imgProfile, telephoneNumber} = profileInfo

    firstNameInput.value= firstName
    secondNameInput.value= secondName
    firstLastNameInput.value= firstLastName
    secondLastNameInput.value= secondLastName
    numberInput.value= telephoneNumber
})

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    'submit',
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      if(form.checkValidity()){
          saveInformation()
      }
      event.preventDefault();
      form.classList.add('was-validated');
    },
    false
  );
});

function saveInformation() {
    const profileInfo ={
        firstName: firstNameInput.value,
        secondName: secondNameInput.value,
        firstLastName: firstLastNameInput.value,
        secondLastName: secondLastNameInput.value,
        imgProfile: imageInput.value,
        email: emailInput.value,
        telephoneNumber: numberInput.value
    }

    localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
}
