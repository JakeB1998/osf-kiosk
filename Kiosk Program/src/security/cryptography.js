


var love = 2;



//var CryptoJS = require('crypto-js');
 
function Cryptography(cryptojs)
{
    this.cryptojs = cryptojs;
    this.encrypt = (data, key) => {
    
        if (data !== undefined && key !== undefined){
            var d = data;
            d = this.cryptojs.AES.encrypt(data,key);
            console.log(d);
             
            return d;
            
        }
        else{
            return null;
        }
        
    }

    this.decrypt = (data, key) => {
        if (data !== undefined && key !== undefined){
            require(["crypto-js"], function (CryptoJS) {
                return CryptoJS.AES.decrypt(data,key);
            
            });
         }
      
    }
    this.test = (data,key) => {
        
        console.log(this.cryptojs);
        let d = data;
        let k = key;
        let e = this.encrypt(d,k);
        console.log(e);
        let un_e = this.decrypt(e,k);
        if (un_e != undefined)
        {
            require(["crypto-js"], function (CryptoJS) {
            console.log(un_e.toString(CryptoJS.enc.utf8));
        
                });
            }
    }
}