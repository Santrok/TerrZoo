const store = localStorage.getItem('oneClickItem')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')

if(nameInput.value === '' && phoneInput.value === '') {
    nameInput.value = JSON.parse(store).name
    phoneInput.value = JSON.parse(store).phone
}