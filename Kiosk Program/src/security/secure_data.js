function SecureData(cryptojs,data,key)
{
    let sData = data;
    let sKey = key;
    let encrypter = new Cryptography(cryptojs);
    this.hashedData = sha256(sData,cryptojs);
    this.encryptedData = encrypter.encrypt(sData,sKey);
    this.getKey = () => sData;
    this.getData = () => { return encrypter.decrypt(this.encryptedData,sKey);}
    this.getHashDigest = () => {return this.hashedData};
}