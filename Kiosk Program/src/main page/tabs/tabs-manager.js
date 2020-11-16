const tabBarID = "tabbar";
var tabBar = document.getElementById(tabBarID);
var tabsUI = isSet(tabBar) ? Array.prototype.slice.call(tabBar.children) : null;
var tabs = isSet(tabsUI) ? new Array(tabsUI.length) : new Array(0);
var buttonsLoaded = false;
const maxTabCount = 5;
const buttonPercentIncrement = 25;
const maxButtonPerRow = 4;
window.addEventListener('load', (event) => {
    tabBar = document.getElementById(tabBarID);
    tabsUI = isSet(tabBar) ? tabBar.children : null;
    tabs = isSet(tabsUI) ? Array.prototype.slice.call(tabBar.children) : new Array(0);
    console.log(tabBar);
    console.log(tabsUI);
    console.log(tabs);
    tabsUI = tabs; //this will change later
    if (tabs != null){
        for (let tab in tabs){
            loadTab(tab);
        }
    }
  });

function loadButtonsToTabs(apps = null){
    buttonsLoaded = true;
    console.log("Loading buttons to tabs");
    let typesPresent = new Array(0);
    tabbedButtons = new Array(0);
    let buttonArr = null;
    
    if (apps != null){
        buttonArr = apps.map(x => x.appButton);
        console.log(buttonArr);
        //buttonArr = Array.prototype.slice.call(buttonArr.children).map(x => x.type === "input");
        //console.log(buttonArr);
        console.log(apps);
        for (let i =0; i < apps.length; i++){
            //console.log(apps[i]);
            let types = apps[i].getAppInfo().getAppCatagoryTypes();
            for (let i = 0; i < types.length; i++){ 
                if (typesPresent.length < maxTabCount && typesPresent.findIndex((e) => e === types[i].catagoryType) === -1){
                    console.log(typesPresent.length);
                    typesPresent.push(types[i].catagoryType);
                    tabbedButtons.push(new Tab(types[i].catagoryType));
                }
            }
            console.log(types);
        }
        console.log(typesPresent);
    }
    for (let i =0; i< tabsUI.length; i++){
        console.log(tabsUI[i]);
        let index = 0;
        if (typesPresent.findIndex((e) => e.toLowerCase() === tabsUI[i].textContent.toLowerCase()) === -1){
            tabsUI[i].remove();
        }
        else{
            index++;
            tabsUI[i].addEventListener("click", (e) => {
                console.log("Clicked");
                console.log(e);
                let z = tabbedButtons.findIndex((x) => e.srcElement.textContent === x.tabName);
                if (z !== -1){
                    loadButtonsDelegate(tabbedButtons[z].tabButtons);
                    
                }
            });
        }

        
        
    }  
    
    console.log(tabbedButtons);
    for (let i =0 ; i < tabbedButtons.length; i++){
        let loadedApps =  apps.filter((e) => e.getAppInfo().getAppCatagoryTypes().findIndex((z) => z.catagoryType === tabbedButtons[i].tabName) !== -1);
        let buttons = new Array(loadedApps.length);
        console.log(loadedApps);
        for (let i = 0; i < buttons.length; i++){
            buttons[i] = loadedApps[i].appButton;
        }
        tabbedButtons[i].tabButtons = buttons;
        console.log(buttons);
    } 
    //loadButtonsDelegate(tabbedButtons[0]);
    loadButtonsDelegate(buttonArr);
}

function loadTab(tab = null){
    if (tab != null){
        console.log(tab);
        
    }
}

function loadButtonsDelegate(buttons = null){
    console.log(buttons);
    if (mainPageButtons !== null){
        for (let i = 0; i < mainPageButtons.length;i++){
            mainPageButtons[i].remove();
        }
    }
    if (buttons !== null){
        for (let i = 0; i < buttons.length; i++){
            buttonParent.appendChild(buttons[i]);
        }
        mainPageButtons = buttons;
        let length = buttons.length;
        length = length >= maxButtonPerRow ? 100 : length * buttonPercentIncrement;
        //deal with second row 
        buttonParent.style.width = length + "%";
    }
}

function displayTab(tab = null){

}

function isSet(obj){
    return obj != undefined && obj != null;
}

function Tab(tabName = null, tabButtons = null){
    this.tabName = tabName;
    this.tabButtons = tabButtons;
}