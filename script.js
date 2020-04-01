const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordtwo = document.getElementById('passwordtwo');

function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = `${getFieldName(input)} ${message}`;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, 'is required');
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `must be at least ${min} characters.`)
    } else if (input.value.length > max) {
        showError(input, `must be less than ${max} characters.`)
    } else {
        showSuccess(input);
    }
}


function checkEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid.');
    }
}

function checkPasswordMatch(input1, input2) {
    if(input1 !== input2) {
        showError(input2, 'do not match');
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e)  {
    e.preventDefault();

    checkRequired([username, email, password, passwordtwo]);
    checkLength(username, 3, 10);
    checkLength(password, 4, 15);
    checkEmail(email);
    checkPasswordMatch(password, passwordtwo);
    
});