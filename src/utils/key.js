import crypto from 'crypto';

const keySize = 2048;
const timestamp = new Date().getTime().toString();
const randomValue = crypto.randomBytes(8).toString('hex');
const uniqueDate = timestamp + randomValue;

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: keySize,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  },
  passphrase: uniqueDate
});


export default{
  publicKey,
  privateKey
}