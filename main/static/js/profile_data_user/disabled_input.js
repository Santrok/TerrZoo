const changeLoginButton = document.querySelector('.change__login-button')
const saveLoginButton = document.querySelector('.save__login-button')
const inputLogin = document.querySelector('.auth_input')

const changePasswordButton = document.querySelector('.change__password-button')
const savePasswordButton = document.querySelector('.save__password-button')
const inputPassword = document.querySelector('.password_person_reset_field')
const inputResetPassword = document.querySelector('.password_register_field')
const inputResetRepeatPassword = document.querySelector('.repeat_password_register_field')


changeLoginButton.addEventListener("click", () => {
    changeLoginButton.style.display = 'none';
    saveLoginButton.style.display = 'flex';
    inputLogin.removeAttribute('disabled');
})

changePasswordButton.addEventListener("click", () => {
    changePasswordButton.style.display = 'none';
    savePasswordButton.style.display = 'flex';
    inputPassword.removeAttribute('disabled');
    inputResetPassword.removeAttribute('disabled');
    inputResetRepeatPassword.removeAttribute('disabled');
})

