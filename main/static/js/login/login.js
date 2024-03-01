if (document.querySelector('.login_error').textContent.length > 0) {
    const authInput = document.querySelectorAll('.auth_input')
    for (let i of authInput) {
        i.style.border = "2px solid rgb(230, 30, 30)";
        i.style.borderRadius = "4px";
        i.oninput = () => {
            document.querySelector('.login_error').style.display = 'none';
            i.style.border = '2px solid rgb(0, 160, 172)';
            i.style.borderRadius = "4px";
        }
    }

}
