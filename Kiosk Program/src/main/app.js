


window.addEventListener('load', (event) =>
{
    require.config({
        paths: {
            'crypto-js': '../lib/bower_components/crypto-js/crypto-js'
        }
    });
    require(["crypto-js"], function (CryptoJS) {
        
        console.log("window fully loaded");
    var q = new Cryptography(CryptoJS);
    q.test("I like apples", "dhfubfskjdbkbk");
    });
    
   
});

