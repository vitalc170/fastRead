document.documentElement.requestFullScreen();
const textArea = document.querySelector('#textShow');

const buttonStart = document.querySelector('#startRead');
const buttonStop = document.querySelector('#stopRead');
const buttonReset = document.querySelector('#resetRead');
const buttonUploadText = document.querySelector('#uploadText');
const buttonForward = document.querySelector('#moveForward');
const buttonBack = document.querySelector('#moveBack');
const buttonSettings = document.querySelector('#optionsButton');
const buttonTextList = document.querySelector('#textList');

const bodyEl = document.querySelector('body');
const textUpload = document.querySelector('#usertext');
const header = document.querySelector('header');
const popup = document.querySelector('.popup');
const containerText = document.querySelector('.text-list');
const closeBtn = document.querySelectorAll('.close-btn');

const inputSpeed = document.querySelector('#readSpeed');
const readTime = document.querySelector('#readTime');


let wordCount = 0;

if (getPosition()) {
    wordCount = parseInt(getPosition());
}
let stopText;

let speed = '0.7';
let textString = 'Негде, в тридевятом царстве,\n' +
    'В тридесятом государстве,\n' +
    'Жил-был славный царь Дадон.\n' +
    'Смолоду был грозен он\n' +
    'И соседям то и дело\n' +
    'Наносил обиды смело;\n' +
    'Но под старость захотел\n' +
    'Отдохнуть от ратных дел\n' +
    'И покой себе устроить.\n' +
    'Тут соседи беспокоить\n' +
    'Стали старого царя,\n' +
    'Страшный вред ему творя.\n' +
    'Чтоб концы своих владений\n' +
    'Охранять от нападений,\n' +
    'Должен был он содержать\n' +
    'Многочисленную рать.\n' +
    'Воеводы не дремали,\n' +
    'Но никак не успевали.';

if (getSpeed()) {
    speed = getSpeed();
    inputSpeed.value = speed;

}

if (getText()) {
    textString = getText();
    // textUpload.value = getText();
    // textUpload.value = textString;
}

countTime();
console.log(getSpeed());

function arrayText(string) {
    // let cleanString = string.trim().replace(/\n|\r/g, " ");
    // let arr =  cleanString.split(" ");
    let cleanString = string.replace(/\n|\r/g, " ");
    let arr = cleanString.split(" ");
    return arr.filter((a) => a);
}

closeBtn.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        item.parentElement.classList.remove('show');
        removeOverlay();
    })

});

function removeOverlay(){
    let overlay = document.querySelector('.overlay');
    overlay.remove();
}
let progressBar = document.querySelector('.progressdot-wrapper input');
let progressFill = document.querySelector('.progressdot-wrapper .fill');

function displayWord() {
    if (wordCount === arrayText(textString).length) {
        textArea.textContent = 'you read all congrats!!!'
    } else {
        textArea.textContent = arrayText(textString)[wordCount];
        wordCount++;
        console.log(wordCount)
    }

    let sliderWidth = (wordCount * 100) / arrayText(textString).length;
    console.log(sliderWidth);
    progressBar.value = sliderWidth;
    progressFill.style.width = sliderWidth + '%'
    savePosition();
}

progressBar.addEventListener('change', function () {
    let val = this.value;
    console.log(val);
    progressFill.style.width = val + "%"
    let wordNum = parseInt((val * arrayText(textString).length) / 100);
    console.log(wordNum)
    wordCount = wordNum;
    savePosition();
})

function saveText() {
    localStorage.setItem('text', textString);
    // console.log(textString)
}

function getText() {
    return localStorage.getItem('text')
}

function saveSpeed() {
    localStorage.setItem('speed', inputSpeed.value);
}

function getSpeed() {
    return localStorage.getItem('speed');
}

function savePosition() {
    localStorage.setItem('position', wordCount)
}

function getPosition() {
    return localStorage.getItem('position');
}

function hideHeader() {
    header.classList.add('hide')
}

function showHeader() {
    header.classList.remove('hide')
}


inputSpeed.addEventListener('change', () => {
    speed = inputSpeed.value;
    saveSpeed();
    countTime();
});

function countTime(){
    let time = (arrayText(textString).length * speed);

    let date = new Date(0);
    date.setSeconds(time); // specify value for SECONDS here
    let timeString = date.toISOString().substr(11, 8);
    console.log(timeString);
    readTime.innerHTML = timeString;
}


buttonStart.addEventListener('click', () => {
    let timeoutSpeed = parseFloat(speed);
    // let timeoutSpeed = 0.2;
    stopText = setInterval(displayWord, timeoutSpeed * 1000);
    buttonStart.disabled = true;
    buttonStart.classList.add('hide');
    buttonStop.classList.remove('hide');
    hideHeader();
    console.log(arrayText(textString))

});

buttonStop.addEventListener('click', () => {
    clearInterval(stopText);
    buttonStart.disabled = false;
    buttonStop.classList.add('hide');
    buttonStart.classList.remove('hide');
    showHeader();
});

buttonReset.addEventListener('click', () => {
    clearInterval(stopText);
    buttonStart.disabled = false;
    wordCount = 0;
    buttonStop.classList.add('hide');
    buttonStart.classList.remove('hide')
    displayWord();
    showHeader();
});

buttonBack.addEventListener('click', () => {
    clearInterval(stopText);
    buttonStart.disabled = false;
    wordCount = wordCount - 2;
    buttonStop.classList.add('hide');
    buttonStart.classList.remove('hide')
    displayWord();
    showHeader();
});

buttonForward.addEventListener('click', () => {
    clearInterval(stopText);
    buttonStart.disabled = false;
    buttonStop.classList.add('hide');
    buttonStart.classList.remove('hide')
    displayWord();
    showHeader();
});


textUpload.addEventListener('change', () => {
    textString = textUpload.value;
    console.log(textUpload.value)
    saveText();
    // textUpload.value = textString;
    // textUpload.placeholder = 'text updated'

});

buttonSettings.addEventListener('click', (e) => {
    e.preventDefault();
    makeOverlay();
    popup.classList.toggle('show')

});

function makeOverlay(){
    let overlay = document.createElement('div');
    overlay.classList.add('overlay')
    overlay.style.cssText = " width: 100%;position: fixed; height: 100vh; background: #0004;";
    overlay.onclick = function (){
        let showClass = document.querySelectorAll('.show');
        showClass.forEach(function (item){
            item.classList.remove('show');
            bodyEl.removeChild(overlay);
        })
    }
    bodyEl.appendChild(overlay);
}

// displayWord();


const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    previewFile();


});


function previewFile() {
    const [file] = document.querySelector('#file-selector').files;
    const reader = new FileReader();
    let fileName = file.name;
    let fileNameArray = fileName.split('.');
    let fileType = fileNameArray[fileNameArray.length - 1];
    console.log(fileType)

    reader.addEventListener("load", () => {
        // this will then display a text file
        if (fileType === 'fb2') {
            textString = reader.result.replace(/<[^>]*>/g, '');
            saveText();
            // textUpload.value = textString;
        } else {
            textString = reader.result;
        }


    }, false);

    if (file) {
        reader.readAsText(file);
    }

}

let but;

function makeListOfText(array, position) {
    let multiplier = 50;
    // if(position < 50){
    //     multiplier = 0
    // }
    let newPosition = position - multiplier;

    let availableLength = position + 100;
    let parent = document.createElement('div');
    parent.classList.add('wrap-text-list');

    for (let i = newPosition; i < availableLength; i++) {
        if (i === newPosition + multiplier-1) {
            let curentEl = document.createElement('p');
            curentEl.classList.add('active');
            curentEl.textContent = array[i];
            parent.appendChild(curentEl);
            // listString += '<p id="' + i + '" class="active">' + array[i] + '</p>';
        } else {
            let otherEl = document.createElement('a')
            otherEl.id = i;
            otherEl.href = '#';
            otherEl.textContent = array[i];
            // otherEl.onclick = makeListOfText(array, wordCount);
            // otherEl.addEventListener('click', );
            otherEl.onclick = function (e) {
                e.preventDefault();
                let elemId = parseInt(this.id);
                wordCount = elemId;
                position = elemId;
                containerText.classList.remove('show');
                removeOverlay();
                displayWord();
            }
            parent.appendChild(otherEl);
            // listString += '<a href = "#" id="' + i + '">' + array[i] + '</a>';
        }
    }
    containerText.removeChild(containerText.querySelector('div'));
    containerText.appendChild(parent);
    but = containerText.querySelector('.wrap-text-list a');
}

// let worker = new Worker('worker.js');
buttonTextList.onclick = function (e) {
    containerText.classList.toggle('show');
    makeOverlay();
    makeListOfText(arrayText(getText()), wordCount);
}

// let textList = document.querySelector('.wrap-text-list');
// let nodeList = textList.querySelector('a');
// nodeList.addEventListener('click',function (e){
//     e.preventDefault();
//     // wordCount = parseInt(this.id);
//     // containerText.classList.remove('show')
//     // displayWord();
//     console.log('ssssd')
// })





