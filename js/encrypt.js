const btnCopy = document.querySelector("#btnCopy");
const inputEncryptUnencrypt = document.querySelector("#inputEncryptUnencrypt");
const inputResult = document.querySelector("#inputResult");
const errorMsg = document.querySelector(".msg");
const resultInfoContainer = document.querySelector(".result__info-container");
const keys = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

// ******************** functions **********************

function checkValidChars(text) {
    // verifico si el texto sólo contiene letras minusculas,
    // sin acentos ni caracteres especiales
    // también acepta espacios en blanco, y ciertos caracteres:
    // signos de exclamación (!¡) comas(,), signos de pregunta (¿?),
    //, puntos (.)
    return text.match(/^[a-z\s\!\,\¿\¡\!\?\.]*$/);
}

// en caso de insgresar texto valido lo encripta/desencripta
// en caso de no ingresar nada aviso de lo ocurrido
// en caso de ingresar texto invalido avisa de lo ocurrido
function processText(order) {
    const text = inputEncryptUnencrypt.value.trim();
    
    if (text === "") {
        inputResult.classList.add("hidden");
        btnCopy.classList.add("hidden");
        errorMsg.innerText = "Ningún mensaje fue encontrado";
        resultInfoContainer.classList.remove("hidden");
        inputEncryptUnencrypt.focus();
    }
    else if (checkValidChars(text) !== null) {
        let newText = "";
        // encriptar
        if (order === "encrypt") {            
            for (let i = 0; i < text.length; i++) {
                let currentChar = text[i];
                newText += keys[currentChar] ? keys[currentChar] : currentChar;
            }
        }
        // desencriptar
        else if (order === "unencrypt") {
            newText = text;
    
            for (let i = 0; i < newText.length; i++) {
                let code = keys[newText[i]];
                
                if (code && (newText.substring(i, code.length + i) === code)) {
                    newText = newText.replace(code, newText[i]);
                }
            }
        }

        resultInfoContainer.classList.add("hidden");
        inputResult.value = newText;
        inputResult.classList.remove("hidden");
        btnCopy.classList.remove("hidden");
        inputEncryptUnencrypt.value = "";
    }
    else {
        inputResult.classList.add("hidden");
        btnCopy.classList.add("hidden");
        resultInfoContainer.classList.remove("hidden");
        errorMsg.classList.add("show");
        errorMsg.innerText = "Solo letras minúsculas y sin acentos";
        inputEncryptUnencrypt.focus();
    }

}

// copiar mensaje encriptado/desencriptado al portapeles
function copyToClipboard() {
    if (inputResult.value !== "") {
        navigator.clipboard.writeText(inputResult.value);
        showSuccessMessage();
    }
}

// crear un modal que le avisa al usuario que se copio el mensaje al portapapeles
function showSuccessMessage() {
    const modal = document.createElement("div");
    const msgContainer = document.createElement("div");
    const paragraph = document.createElement("p");
    const btnClose = document.createElement("button");

    modal.setAttribute("class", "modal");
    msgContainer.setAttribute("class", "modal__msg-container");
    btnClose.setAttribute("class", "modal__btn-close");
    btnClose.setAttribute("id", "modal__BtnClose");
    
    btnClose.innerText = "Cerrar";
    paragraph.innerText = "¡Texto copiado con exito al portapapeles!"
    
    msgContainer.appendChild(paragraph);
    msgContainer.appendChild(btnClose);
    modal.appendChild(msgContainer);
    document.body.appendChild(modal);
}

// ******************** events handlers **********************

document.addEventListener("click", e => {
    if (e.target) {
        if (e.target.id === "btnEncrypt") {
            processText("encrypt");
        }
        else if (e.target.id === "btnUnencrypt") {
            processText("unencrypt");
        }
        else if (e.target.id === "btnCopy") {
            copyToClipboard();
        }
        else if (e.target.id === "modal__BtnClose") {
            document.querySelector(".modal").remove();
        }
    }
});