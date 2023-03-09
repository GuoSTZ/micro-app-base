import JSEncrypt from 'jsencrypt'

export function encrypt(data, publicKey) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  
  // 使用公钥加密数据
  const encryptedData = encryptor.encrypt(data);
  return encryptedData
}