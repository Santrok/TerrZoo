const input = document.getElementById("id_phone_number");
const orderInput = document.getElementById('phone')
  function phoneInputFunc(input) {
    input.value = input.value.replace(/[^0-9()+\s-]/g, "");
    input.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key !== "Backspace" && key !== "Delete") {
        if (input.value.length === 4) {
          input.value += " (";
        }
        if (input.value.length === 8) {
          input.value += ") ";
        }
        if (input.value.length === 13) {
          input.value += "-";
        }
        if (input.value.length === 16) {
          input.value += "-";
        }
      }
    });
  };

  if(input) input.oninput = () => phoneInputFunc(input)   
if(orderInput) orderInput.oninput = () => phoneInputFunc(orderInput)


