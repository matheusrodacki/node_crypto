import { createHash } from "crypto";

function criaHash(senha) {
  return createHash("sha256").update(senha).digest("hex");
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = criaHash(senha);
  }

  autentica(nome, senha) {
    if (this.nome === nome && this.hash === criaHash(senha)) {
      return true;
    } else {
      return false;
    }
  }
}

const novoUsuario = new Usuario("matheus", "balalaico");

console.log(novoUsuario.autentica("matheus", "borboleto"));

console.log(novoUsuario.autentica("matheus", "balalaico"));
