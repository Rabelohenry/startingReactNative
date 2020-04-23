const INITIAL_STATE = {
  nome: '',
  email: '',
  senha: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'modifica_email':
      return {...state, email: action.payload};
    case 'modifica_email':
      return {...state, senha: action.payload};
  }

  return state;
};