

/**
 * Called when the window is fully loaded
 */
window.addEventListener('load', (event) =>
{
    initButtons();

    require(['crypto-js'], function (CryptoJS) {
    console.log("window fully loaded");
    console.log(CryptoJS);
    defaultCipherSettings = {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
    }
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    
    let secureData = new SecureData(CryptoJS, 'jmbotka', "adom");
    console.log('decrypted data: ' + secureData.getData().toString()
                + '\nHashed data: ' + secureData.getHashDigest());

    let serverRequest = server.createServerRequest("GET","./index.html", true, callback);
    server.sendServerRequest(serverRequest);
    console.log(serverRequest.toString());
    return CryptoJS;
    });
});

/**
 * Test callback for http request completed state change
 */
  function callback(){
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
       }
  }



