import CryptoJS from 'react-native-crypto-js';

export const encryptText = (text: string, secretKey: string) => {
  let ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();

  return ciphertext;
};

export const decryptText = (text: string, secretKey: string) => {
  let bytes = CryptoJS.AES.decrypt(text, secretKey);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
