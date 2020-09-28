


window.addEventListener('load', (event) =>
{
    initButtons();

    require(['crypto-js'], function (CryptoJS) {
    console.log("window fully loaded");
    console.log(CryptoJS);
   
    //console.log(Ajax);
    loadDoc();
    
    defaultCipherSettings = {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
    }
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    
    let secureData = new SecureData(CryptoJS, 'jmbotka', "adom");
    console.log('decrypted data: ' + secureData.getData().toString()
                + '\nHashed data: ' + secureData.getHashDigest());
    createServerConncection(server);
    return CryptoJS;
    });
});

function loadDoc() {
    var xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
      }
    };
    xhttp.open("GET", "./index.html", true);
    xhttp.send();
  }



