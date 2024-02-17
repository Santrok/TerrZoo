document.querySelector("#pay_online").oninput = (ev) => {
    if (ev.target.checked){
        document.querySelector("#num_paycard_1_4").disabled = false;
        document.querySelector("#num_paycard_5_8").disabled = false;
        document.querySelector("#num_paycard_9_12").disabled = false;
        document.querySelector("#num_paycard_13_16").disabled = false;
        document.querySelector("#date").disabled = false;
        document.querySelector("#CVV").disabled = false;
    }
}