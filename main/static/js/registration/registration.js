const inputPasswrod = document.getElementById('password_register_field')
const inputDiv = inputPasswrod.parentElement

const div = document.createElement('div')
div.classList.add('checking__difficultly')
div.innerHTML = `<p class="checking__difficultly-text">Сложность пароля:</p><p></p>`
inputDiv.prepend(div)
inputPasswrod.oninput = () => checkPasswords(inputPasswrod)

function checkPasswords(form) {
    const password = form.value; // Берем пароль из формы
    const s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
    const b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
    const digits = "0123456789"; // Цифры
    const specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
    let is_s = false; // Есть ли в пароле буквы в нижнем регистре
    let is_b = false; // Есть ли в пароле буквы в верхнем регистре
    let is_d = false; // Есть ли в пароле цифры
    let is_sp = false; // Есть ли в пароле спецсимволы
    for (var i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
      if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
      else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
      else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
      else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
    }
    let rating = 0;
    let text = "";
    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
    if (password.length < 6 && rating < 3) {
        text = "Простой";
        inputDiv.children[0].children[1].setAttribute('class', 'easy')
    }
    else if (password.length < 6 && rating >= 3){
         text = "Средний";
         inputDiv.children[0].children[1].setAttribute('class', 'normal')
        }
    else if (password.length >= 8 && rating < 3) {
        text = "Средний";
        inputDiv.children[0].children[1].setAttribute('class', 'normal')
       }
    else if (password.length >= 8 && rating >= 3){ 
        text = "Сложный";
        inputDiv.children[0].children[1].setAttribute('class', 'hard')
    }
    else if (password.length >= 6 && rating == 1) {
        text = "Простой";
        inputDiv.children[0].children[1].setAttribute('class', 'easy')
    }
    else if (password.length >= 6 && rating > 1 && rating < 4) {
        text = "Средний";
        inputDiv.children[0].children[1].setAttribute('class', 'normal')
       }
    else if (password.length >= 6 && rating == 4) { 
        text = "Сложный";
        inputDiv.children[0].children[1].setAttribute('class', 'hard')
    }
    inputDiv.children[0].children[1].textContent = text
    
    return false; // Форму не отправляем
  }
