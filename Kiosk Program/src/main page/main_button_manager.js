var allApplicationButtons = new Array(0);
var mainPageButtons = null;
var tabbedButtons = null;
const mainButtonTag = "Main-Buttons";
const buttonDivTag = "button-div";
var buttonParent = null;

function initButtons(){
    buttonParent =document.getElementById("main-buttons");
    
}

function createButton(arr = null){
    let button = document.createElement('input');
    button.setAttribute('type', 'image');
    button.setAttribute('src', '/osf project/kiosk program/src/res/default-image.png');
    let div = document.createElement("div");
    div.setAttribute("tag", buttonDivTag);
    div.setAttribute("class", "flex-child img-with-text")
    let title = document.createElement('p');
    title.textContent = "Default Title";
    div.appendChild(button);
    div.appendChild(title);
    arr.push(div);
    buttonParent.appendChild(div);
}
function createButtons(arr = null, size = null){
    
    if (size !== null && arr !== null){
        for (let i = 0; i < size; i++){
            createButton(arr);
        }
    }
    console.log(arr);
    
}


function getButtonsOnMainPage(){
    return mainPageButtons;
}