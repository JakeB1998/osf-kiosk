


window.addEventListener('load', (event) =>
{
    
    require(["crypto-js"], function (CryptoJS) {
    console.log("window fully loaded");
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    
    let secureData = new SecureData(CryptoJS, 'jmbotka', "adom");
    console.log('decrypted data: ' + secureData.getData().toString()
                + '\nHashed data: ' + secureData.getHashDigest());
    return CryptoJS;
    });
});



