function SecureData(cryptojs,data,key)
{
    this.data = data;
    this.encrypter = new Cryptography(cryptojs);
    this.key = key;
    this.hashedData = sha256(data,cryptojs);
    this.encryptedData = this.encrypter.encrypt(this.data,this.key);
    this.getData = () => { return this.encrypter.decrypt(this.encryptedData,this.key);}
    this.getHashDigest = () => {return this.hashedData};
}