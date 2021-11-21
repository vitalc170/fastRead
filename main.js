const textArea = document.querySelector('#textShow');

const buttonStart = document.querySelector('#startRead');
const buttonStop = document.querySelector('#stopRead');
const buttonReset = document.querySelector('#resetRead');
const buttonUploadText = document.querySelector('#uploadText');
const buttonForward = document.querySelector('#moveForward');
const buttonBack = document.querySelector('#moveBack');
const buttonSettings = document.querySelector('#optionsButton');

const textUpload = document.querySelector('#usertext');
const header = document.querySelector('header');
const popup = document.querySelector('.popup');

const inputSpeed = document.querySelector('#readSpeed');



let wordCount = 0;

if(getPosition()){
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

if(getSpeed()){
    speed = getSpeed();
    inputSpeed.value = speed;
}

if (getText()){
    textString = getText();
    // textUpload.value = getText();
    // textUpload.value = textString;
}


console.log(getSpeed());
function arrayText(string){
    // let cleanString = string.trim().replace(/\n|\r/g, " ");
    // let arr =  cleanString.split(" ");
    let cleanString = string.replace(/\n|\r/g, " ");
    let arr =  cleanString.split(" ");
    return arr.filter((a) => a);
}


function displayWord() {
    if(wordCount === arrayText(textString).length){
      textArea.textContent = 'you read all congrats!!!'
    }
    else{
        textArea.textContent = arrayText(textString)[wordCount];
        wordCount++;
        console.log(wordCount)
    }
    savePosition();

}

function saveText(){
    localStorage.setItem('text', textString);
    // console.log(textString)
}

function getText(){
    return localStorage.getItem('text')
}

function saveSpeed(){
    localStorage.setItem('speed', inputSpeed.value);
}

function getSpeed(){
    return localStorage.getItem('speed');
}

function savePosition(){
    localStorage.setItem('position', wordCount)
}
function getPosition(){
    return localStorage.getItem('position');
}

function hideHeader(){
    header.classList.add('hide')
}

function showHeader(){
    header.classList.remove('hide')
}



inputSpeed.addEventListener('change', ()=>{
    speed = inputSpeed.value;
    saveSpeed();
});

buttonStart.addEventListener('click', () => {
    let timeoutSpeed = parseFloat(speed);
    // let timeoutSpeed = 0.2;
    stopText = setInterval(displayWord, timeoutSpeed*1000);
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


textUpload.addEventListener('change', ()=>{
    textString = textUpload.value;
    console.log(textUpload.value)
    saveText();
    // textUpload.value = textString;
    // textUpload.placeholder = 'text updated'

});

buttonSettings.addEventListener('click', (e)=>{
    e.preventDefault();
    popup.classList.toggle('show')
});

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
    let fileType = fileNameArray[fileNameArray.length-1];
    console.log(fileType)

    reader.addEventListener("load", () => {
        // this will then display a text file
        if(fileType ==='fb2'){
            textString = reader.result.replace(/<[^>]*>/g, '');
            saveText();
            // textUpload.value = textString;
        }
        else{
            textString = reader.result;
        }


    }, false);

    if (file) {
        reader.readAsText(file);
    }


}