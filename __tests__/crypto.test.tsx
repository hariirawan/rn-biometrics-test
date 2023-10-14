import {encryptText, decryptText} from '../src/utils/crypto';
import {it, describe, expect} from '@jest/globals';

describe('Crypto Functions', () => {
  const secretKey = 'secretKey123';
  const plaintext = 'Hello, World!';

  it('should encrypt and decrypt text correctly', () => {
    const encryptedText = encryptText(plaintext, secretKey);
    const decryptedText = decryptText(encryptedText, secretKey);

    expect(decryptedText).toBe(plaintext);
  });

  it('should handle incorrect secret key', () => {
    const incorrectSecretKey = 'wrong_key';
    const encryptedText = encryptText(plaintext, secretKey);
    const decryptedText = decryptText(encryptedText, incorrectSecretKey);

    expect(decryptedText).toBe('');
  });
});
