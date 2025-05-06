let rangeSlider = document.querySelector('.range-slider');
let lengthNumber = document.querySelector('[data-length-number]');    
let allcb = document.querySelectorAll('.cb');
let uppercase = document.querySelector('#cb1');
let lowercase = document.querySelector('#cb2');
let number = document.querySelector('#cb3');
let symbol = document.querySelector('#cb4');
let copyBtn = document.querySelector('.fa-copy');
let passwordDisplay = document.querySelector('.passwordDisplay');
let copyText = document.querySelector('.copy-text');
let strengthCircle = document.querySelector('.circle');
let symbolString = '!@#$%^&*()_+-={}[]:"|;\,.<>/?\'\\';

let passwordLength = rangeSlider.value;
let checkCount = 0;
let password = '';

lengthDisplay(); //for initial state
countCheckBoxes();

rangeSlider.addEventListener('input', lengthDisplay);
function lengthDisplay() {
    passwordLength = rangeSlider.value;
    lengthNumber.innerText = passwordLength;
}


for(let i=0; i<4; i++) {
    allcb[i].addEventListener('change', countCheckBoxes);
}
function countCheckBoxes() {
    checkCount = 0;
    for(let j = 0; j <= 3; j++) {
        if(allcb[j].checked) {
            checkCount++;
        }
    }
    setMinRangeSlider();
    lengthDisplay();
}
function setMinRangeSlider() {
    if(checkCount == 0) {
        rangeSlider.min = 1;
    } else{
        rangeSlider.min = checkCount;
    }
}

copyBtn.addEventListener('click', copyFunction)
async function copyFunction() {
    let text = passwordDisplay.value;
    if(text.length != 0){
        try{
            await navigator.clipboard.writeText(text);
            copyText.innerText = 'copied';
        } catch(e){
            copyText.innerText = 'failed';
        }
        copyText.classList.add('active');
        setTimeout(() => {
            copyText.classList.remove('active');
        }, 1000);
    }
}


//handle this while writing CSS
function strengthCalculator() {
    if(checkCount >= 3) {
        strengthCircle.style.backgroundColor = 'green';
        strengthCircle.style.boxShadow = '0px 0px 2px 2px green';
    } else if(checkCount == 2){
        strengthCircle.style.backgroundColor = '#FFA500';
        strengthCircle.style.boxShadow = '0px 0px 2px 2px #FFA500';
    } else if(checkCount <= 1) {
        strengthCircle.style.backgroundColor = 'red';
        strengthCircle.style.boxShadow = '0px 0px 2px 2px red';
    }

}

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function generateRandomUppercase() {
    return String.fromCharCode(generateRandomInteger(65, 90));
}
function generateRandomLowercase() {
    return String.fromCharCode(generateRandomInteger(97, 123));
}
function generateRandomNumber() {
    return generateRandomInteger(0, 9);
}
function generateRandomSymbol() {
    return symbolString.charAt(generateRandomInteger(0, symbolString.length));
}



function generatePassword() {
    password = '';

    let fnArr = [];
    if(uppercase.checked) {
        fnArr.push(generateRandomUppercase);
        password += generateRandomUppercase();
    }
    if(lowercase.checked) {
        fnArr.push(generateRandomLowercase);
        password += generateRandomLowercase();
    }
    if(number.checked) {
        fnArr.push(generateRandomNumber);
        password += generateRandomNumber();
    }
    if(symbol.checked) {
        fnArr.push(generateRandomSymbol);
        password += generateRandomSymbol();
    }

    for(let i = checkCount; i <= passwordLength - 1; i++) {
        let index = generateRandomInteger(0, checkCount-1);
        password += fnArr[index]();
    }

    //shuffling = you can also create a separate fn
    let arr = Array.from(password);
    for(let i = arr.length-1; i >= 0; i--) {
        let index = generateRandomInteger(0, i);
        let temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
    password = arr.join("");

    passwordDisplay.value = password;

    //handle it properly while working with css
    strengthCalculator();
}