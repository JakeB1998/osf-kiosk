


window.history.replaceState( null, null, window.location.href );


var Cryptojs= null;


window.addEventListener('load', (event) =>
{
    require(['crypto-js'], function (CryptoJS) {
        Cryptojs = CryptoJS;
    });
});

/**
 * Validates form data for posting to a login validation external php script.
 */
function validateLogin(){

        crytoObject = new Cryptography(Cryptojs);
        let auth = document.getElementById('fauthcode');
        auth.value = Cryptojs.lib.WordArray.random(128/8);
        console.log(auth.value);
        let input = document.getElementById('fpwd');
        input.value = Cryptojs.SHA256(input.value);
        window.localStorage.setItem('loggedinuser-email' +  auth.value, document.getElementById('femail').value);
        window.localStorage.setItem('loggedinuser-pwd' +  auth.value, document.getElementById('femail').value);
        /*
        var http = new XMLHttpRequest();
        var params = new FormData(document.querySelector('form'));
        console.log(params);
        var url = '../../../kiosk server/php scripts/login_validator.php';
        //http.open('POST', url, true);

    //Send the proper header information along with the request
    //http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    //http.send(params);
    */
        return true;
   

}



