const store = localStorage.getItem('oneClickItem')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')

console.log(nameInput);
if(nameInput.value === '' && phoneInput.value === '') {
    console.log(111);
    nameInput.value = JSON.parse(store).name
    phoneInput.value = JSON.parse(store).phone
}