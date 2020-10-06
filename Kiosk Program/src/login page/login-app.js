
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
   
    let password = document.getElementById('fpwd');
    let hashedPwd =  sha256(password.value, cryptojs);
    console.log(hashedPwd);
    password.value = hashedPwd;
    if (hashedPwd !== null){
        return true;
    }
    return false;
   
}





