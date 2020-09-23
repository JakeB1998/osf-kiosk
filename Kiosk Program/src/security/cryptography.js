
var defaultCipherSettings = null;
//var CryptoJS = require('crypto-js');
 
function Cryptography(cryptojs)
{
    console.log(defaultCipherSettings);
    let cipherSetting = new CipherSettings(defaultCipherSettings);
    this.cryptojs = cryptojs;
    this.algorithm = "AES";
    this.encrypt = (data, key) => {
        if (data !== undefined && key !== undefined){
            var d = data;
            d = this.cryptojs.AES.encrypt(data,key,cipherSetting.getCipherSettings());
            console.log(d);
            return d; 
        }
        else{
            return null;
        }
        
    }

    this.decrypt = (data, key) => {
        if (data !== undefined && key !== undefined){
                return hexToString(this.cryptojs.AES.decrypt(data,key,cipherSetting.getCipherSettings()).toString());
         }
    }
    this.test = (data,key) => {
        console.log(this.cryptojs);
        let d = data;
        let k = key;
        let e = this.encrypt(d,k);
        console.log(e);
        let un_e = this.decrypt(e,k);
        
    }
}

function CipherSettings(cipherSetting){
    let cipherSettings = cipherSetting != null ? cipherSetting : defaultCipherSettings;
    this.getCipherSettings = () => {
        return cipherSettings;
    }
}

function sha256(message, cryptojs){
    if (cryptojs !== undefined && cryptojs !== null){
        return cryptojs.SHA256(message);
    }
    console.log("crypto js is null or undefined");
    return null;
}

function hexToString(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
