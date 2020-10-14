var mainPageButtons = null;
var createTemplate = () => {
    let button = document.createElement('input');
    button.setAttribute('type', 'image');
    button.setAttribute('id', 'main-button');
    return button;

};
const buttonTemplate = createTemplate();
const mainButtonTag = "main-button";
var creating = false;
function initButtons(){
     //let parent = document.getElementById("main-buttons");
     //mainPageButtons = parent.children;
    //mainPageButtons = Array.prototype.slice.call(mainPageButtons).filter(e => e.id === 'Main-Buttons');
    
    
}

function refresh(){
    let parent = document.getElementById("main-buttons");
    mainPageButtons = parent.children;
   mainPageButtons = Array.prototype.slice.call(mainPageButtons);
   console.log(mainPageButtons);
}

function getButtonsOnMainPage(){
    return mainPageButtons;
}

function createButton(index = -1){
    let button = createTemplate();
    let parent = document.getElementById('main-buttons');
    if (!creating){
        creating = true;
       
       parent.appendChild(button);
        refresh();
        console.log('button created');
        creating = false;
    }
    else{
        while(creating){

        }
        createButton(button);
    }
    return button;
}

function getButtonAt(index = -1){
    if (index >= 0){
        return mainPageButtons[index];
    }
}