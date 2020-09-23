


window.addEventListener('load', (event) =>
{
    initButtons();

    require(["crypto-js"], function (CryptoJS) {
    console.log("window fully loaded");
    defaultCipherSettings = {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
    }
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    
    let secureData = new SecureData(CryptoJS, 'jmbotka', "adom");
    console.log('decrypted data: ' + secureData.getData().toString()
                + '\nHashed data: ' + secureData.getHashDigest());
    createServerConncection(null,null,server);
    return CryptoJS;
    });
});



