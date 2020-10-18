function saveInLocalStorage(key,data){
    window.localStorage.setItem(key,data);
}

function getFromLocalStorage(key){
    return window.localStorage.getItem(key);
}

function clearLocalStorage(){
    window.localStorage.clear();
}