const form = document.querySelector('#form')
const email = document.querySelector('#email')
const country = document.querySelector('#country')
const zip = document.querySelector('#zip')
const pass = document.querySelector('#pass')
const repass = document.querySelector('#repass')
const error = document.querySelector('.error')

email.addEventListener('input', e => {
    if (email.validity.valid) {
        error.textContent = ''
        error.className = 'error'
    } else {
        error.className = 'error active'
        showError().checkEmail()
    }
})

const zippattern = /[0-9]{5}/
zip.addEventListener('input',e => {
    if (!zippattern.test(zip.value)) {
        error.className = 'error active'
        showError().checkZIP()       
    }
    else if (zip.validity.valid) {
        error.textContent = ''
        error.className = 'error'
    } else if (!zippattern.test(zip.value)){
        error.className = 'error active'
        showError().checkZIP()
    }
})

pass.addEventListener('input', e => {
    if (pass.validity.valid && pass.value === repass.value) {
        error.textContent = ''
        error.className = 'error'
    } else {
        error.className = 'error active'
        showError().checkPass()
    }
})

repass.addEventListener('input', e => {
    if (pass.value === repass.value) {
        error.textContent = ''
        error.className = 'error'
    } else {
        error.className = 'error active'
        showError().checkPass()
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()
    if (!email.validity.valid) {
        showError().checkEmail()
    }
    else if (country.value === '0') {
        showError().checkCountry()    
    }
    else if (!zip.validity.valid) {
        showError().checkZIP() 
    }
    else if (pass.value !== repass.value) {
        showError().checkPass()  
    } else {
        console.log('All submitted, High Five ✋')
        console.log(Object.fromEntries(new FormData(form).entries()))
        email.value = ''
        country.value = '0'
        zip.value = ''
        pass.value = ''
        repass.value = ''
    }
})


function showError() {
    const checkEmail = () => {
        if (email.validity.valueMissing) error.textContent = 'Email value missing!'
        else if (email.validity.typeMismatch) error.textContent = 'Value needs to be an email address.'
        else if (email.validity.tooShort) error.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`
    }
    const checkCountry = () => {
        if (country.value === "0") error.textContent = 'Please select a country'
    }
    const checkZIP = () => {
        if (zip.validity.valueMissing) error.textContent = 'ZIP required'
        else if (zip.validity.typeMismatch) error.textContent = 'Wrong format'
        else if (zip.validity.rangeUnderflow) error.textContent = `ZIP code needs to be at least ${zip.minLength} long; you enetered ${zip.value.length}.`
        else error.textContent = 'Zip code too short'
    }
    const checkPass = () => {
        if (pass.value !== repass.value) error.textContent = 'Passwords do not match!'
    }
    return {
        checkEmail,
        checkCountry,
        checkZIP,
        checkPass,
    }
}