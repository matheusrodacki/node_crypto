import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function criaHashComSal(senha) {
  const sal = randomBytes(16).toString("hex");

  const senhaHasheada = scryptSync(senha, sal, 64).toString("hex");

  return `${sal}:${senhaHasheada}`;
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    [this.sal, this.hash] = criaHashComSal(senha).split(":");
  }

  autentica(nome, senha) {
    if (this.nome === nome) {
      const testeHash = scryptSync(senha, this.sal, 64);
      const hashReal = Buffer.from(this.hash, "hex");
      const hashsCorrespondem = timingSafeEqual(testeHash, hashReal);
      if (hashsCorrespondem) {
        return true;
      }
    }
    return false;
  }
}

const novoUsuario = new Usuario("matheus", "balalaico");

console.log(novoUsuario);

console.log(novoUsuario.autentica("matheus", "balalaico"));

console.log(novoUsuario.autentica("matheus", "borboleto"));

console.log(novoUsuario.autentica("lucas", "balalaico"));
