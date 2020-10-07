
var cryto_data = null;
var cryptojs = null;

/**
 * Called when the window is fully loaded
 */
window.addEventListener('load', (event) =>
{
    require(['crypto-js'], function (CryptoJS) {
        console.log("window fully loaded");
        console.log(CryptoJS);
        defaultCipherSettings = {
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.AnsiX923
        }
        cryptojs = CryptoJS;
    });
});

function validateLogin(){
    console.log("on click");
   clearLocalStorage();
   let authocode = '274737';
    let email = document.getElementById('femail');
    let username = document.getElementById('fname');
    let password = document.getElementById('fpwd');
    let hashedPwd =  sha256(password.value, cryptojs);
    let authElement = document.getElementById('fauthcode');
    authElement.value = authocode;
    console.log(hashedPwd);
    password.value = hashedPwd;
    let key1 = 'loggedinuser-email'.concat(authocode);
    let key2 = 'loggedinuser-pwd'.concat(authocode);
    if (getFromLocalStorage(key1) === null){
        saveInLocalStorage(key1, email.value);
    }
    if (getFromLocalStorage(key2) === null){
        saveInLocalStorage(key2, password.value);
    }
    if (hashedPwd !== null){
        return true;
    }
    return false;
   
}





