const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const radios = document.getElementsByName('query');
const textarea = document.getElementById('message');
const agreementCheckbox = document.getElementById('agreement');
const submitBtn = document.getElementById('submit');
const errorElements = document.getElementsByClassName('err');
const popup = document.getElementById('popup');

let valid = true;
const errorMessages = {
	'required': 'This field is required',
	'email': 'Please enter a valid email address',
	'query' : 'Please select a query type',
	'agreement' : 'To submit this form, please consent to being contacted',
}

form.addEventListener('submit', formValidation)

function showErrorMsg(element, message) {
	element.textContent = message;
	element.classList.add('active');
}

function formValidation(e) {

	e.preventDefault();

	valid = true;


	for (let i = 0; i < errorElements.length; i++) {
		errorElements[i].classList.remove('active')
	}

	if (fname.value === '') {
		showErrorMsg(fname.nextElementSibling, errorMessages.required);
		valid = false;
	}

	if (lname.value === '') {
		showErrorMsg(lname.nextElementSibling, errorMessages.required);
		valid = false;
	}

	const regex = /.*@.*/;

	if (email.value === '') {
		showErrorMsg(email.nextElementSibling, errorMessages.required);
		valid = false;
	} else if (!regex.test(email.value)) {
		showErrorMsg(email.nextElementSibling, errorMessages.email);
		valid = false;
	}
	
	let checked = false;
	radios.forEach(radio => {
		if (radio.checked) {
			checked = true;
		}
	})
	if (!checked) {
		showErrorMsg(radios[radios.length - 1].parentElement.parentElement.nextElementSibling, errorMessages.query)
		valid = false;
	}

	if (textarea.value === '') {
		showErrorMsg(textarea.nextElementSibling, errorMessages.required)
		valid = false;
	}

	if (!agreementCheckbox.checked) {
		showErrorMsg(agreementCheckbox.parentElement.nextElementSibling, errorMessages.agreement)
		valid = false;
	}
}

submitBtn.addEventListener('click', () => {
	if (valid) {
		popup.classList.add('active');
	}
})




