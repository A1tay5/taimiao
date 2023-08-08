import CryptoJS from 'crypto-js'
 
/**
 * AES 加密
 * @param word: 需要加密的文本
 * KEY: // 需要前后端保持一致
 * mode: ECB // 需要前后端保持一致
 * pad: Pkcs7 //前端 Pkcs7 对应 后端 Pkcs5
 */
var key = "hangzhoutiangeke";
var iv = "0392039203920300";
var keyValue = "hangzhoutiangekejiwillcrashsoon.";
 
export const AES_Encrypt = (plaintext) => {
    var key1  = CryptoJS.enc.Latin1.parse(keyValue);
    var iv1   = CryptoJS.enc.Latin1.parse(iv);
    return CryptoJS.AES.encrypt(plaintext, key1,{
        // iv : iv1,
        mode : CryptoJS.mode.ECB,
        padding : CryptoJS.pad.Pkcs7
    }).toString();
}

/**
 * AES 解密
 * @param jsonStr
 */
export const AES_Decrypt = (jsonStr) => {
    var key1  = CryptoJS.enc.Latin1.parse(key);
    var iv1   = CryptoJS.enc.Latin1.parse(iv);
    var decrypted=CryptoJS.AES.decrypt(jsonStr,key1,{
        iv : iv1,
        mode : CryptoJS.mode.CBC,
        padding : CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

}