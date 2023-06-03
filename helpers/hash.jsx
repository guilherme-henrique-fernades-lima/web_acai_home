import crypto from 'crypto';

const secretKey = "TeStE.KeY" //TO-DO: Adicionar no .env a chave real

// Função para criptografar os dados
export function encryptData(data) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
  
// Função para descriptografar os dados
export function decryptData(encryptedData) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}