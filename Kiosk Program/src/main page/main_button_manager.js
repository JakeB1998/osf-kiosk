var mainPageButtons = null;
const mainButtonTag = "Main-Buttons"

function initButtons(){
    mainPageButtons = document.getElementById("main-buttons").children;
    console.log(mainPageButtons);
    for (item of mainPageButtons){
        if (item.id === mainButtonTag){
            console.log(item.toString());
        }
    }
    
}

function getButtonsOnMainPage(){
    return mainPageButtons;
}