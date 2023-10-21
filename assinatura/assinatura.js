import { generateKeyPairSync, createSign, createVerify } from "crypto";

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

let dados = "Essa estring será assinada!";

//Assinatura

const assinador = createSign("rsa-sha256");

assinador.update(dados);

const assinatura = assinador.sign(privateKey, "hex");

console.log(`Assinatura: ${assinatura}`);

//Envio do documento ------> Documento, Assinatura e chave pública

const verificador = createVerify("rsa-sha256");

verificador.update(dados);

const verificado = verificador.verify(publicKey, assinatura, "hex");

console.log(verificado);
