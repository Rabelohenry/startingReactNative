import Firebase from '../firebase';

export const modificaEmail = texto => {
  return {
    type: 'modifica_email',
    payload: texto,
  };
};

export const modificaSenha = texto => {
  return {
    type: 'modifica_senha',
    payload: texto,
  };
};

export const modificaNome = texto => {
  return {
    type: 'modifica_nome',
    payload: texto,
  };
};

export const cadastraUsuario = ({nome, email, senha}) => {
  Firebase.auth()
    .createUserWithEmailAndPassword(email, senha)
    .then(user => cadastroUsuarioSucesso())
    .catch(erro => cadastroUsuarioErro(erro));
};

const cadastroUsuarioSucesso = () => {
  return {
    type: 'sucesso',
  };
};

const cadastroUsuarioErro = erro => {
  return {
    type: 'erro',
  };
};
