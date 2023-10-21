import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

//console.log(publicKey);
//console.log(privateKey);

const dadosCriptografados = publicEncrypt(
  publicKey,
  Buffer.from("Mengasem mais do que secreta")
);

console.log(dadosCriptografados.toString("hex"));

const dadosDesCriptografados = privateDecrypt(privateKey, dadosCriptografados);

console.log(dadosDesCriptografados.toString("utf-8"));
