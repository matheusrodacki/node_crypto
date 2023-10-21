import { createHash } from "crypto";

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = this.criaHash(senha);
  }

  criaHash(senha) {
    return createHash("sha512").update(senha).digest("hex");
  }

  autentica(nome, senha) {
    if (this.nome === nome && this.hash === this.criaHash(senha)) {
      return true;
    } else {
      return false;
    }
  }
}

const novoUsuario = new Usuario("matheus", "1337");

for (let senhaTest = 0; senhaTest < 10000; senhaTest++) {
  if (novoUsuario.autentica("matheus", senhaTest.toString())) {
    console.log(`Senha encontrada: ${senhaTest}`);
    break;
  } else {
    console.log(`Não é a senha: ${senhaTest}`);
  }
}
