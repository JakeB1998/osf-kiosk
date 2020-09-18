import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";

function Cryptography()
{
    this.encrypt = (data, key) => {return CryptoJS.AES.encrypt(data,key)}
    this.decrypt = (data, key) => {return CryptoJS.AES.decrypt(data,key)}
}