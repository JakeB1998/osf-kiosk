


//let cryto_data = new Cryptography();


function validateLogin(){
    var cryptoObject = null;
    require(['crypto-js'], function (CryptoJS) {
        crytoObject = new Cryptography(CryptoJS);
        let auth = document.getElementById('fauthcode');
        auth.value = CryptoJS.lib.WordArray.random(128/8);
        console.log(auth.value);
        let input = document.getElementById('fpwd');
        input.value = CryptoJS.SHA256(input.value);
        window.localStorage.setItem('loggedinuser-email' +  auth.value, document.getElementById('femail').value);
        window.localStorage.setItem('loggedinuser-pwd' +  auth.value, document.getElementById('femail').value);
        
    });
}



