var mainPageButtons = null;
const mainButtonTag = "Main-Buttons"
var buttonParent = null;

function initButtons(){
    buttonParent =document.getElementById("main-buttons");
    mainPageButtons = buttonParent.children;
    console.log(mainPageButtons);
    for (item of mainPageButtons){
        if (item.id === mainButtonTag){
            console.log(item.toString());
        }
    }
}

function createButton(){
    let button = document.createElement('input');
    button.setAttribute('type', 'image');
    button.setAttribute('src', '/osf project/kiosk program/src/res/default-image.png');
    buttonParent.appendChild(button);
    mainPageButtons = buttonParent.children;
}
function createButtons(size = null){
    if (size !== null){
        for (let i = 0; i < size; i++){
            createButton();
        }
    }
    console.log(mainPageButtons);
}

function getButtonsOnMainPage(){
    return mainPageButtons;
}