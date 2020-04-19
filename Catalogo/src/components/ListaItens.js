import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import axios from 'axios';
import Itens from './Itens';

export class ListaItens extends Component {
  constructor(props) {
    super(props);

    this.state = {listaItens: []};
  }

  componentWillMount() {
    axios
      .get('http://faus.com.br/recursos/c/dmairr/api/itens.html')
      .then(response => {
        this.setState({listaItens: response.data});
      })
      .catch(() => {
        console.log('Erro ao consultar request');
      });
  }

  render() {
    return (
      <ScrollView>
        {this.state.listaItens.map(item => (
          <Itens key={item.titulo} item={item} />
        ))}
      </ScrollView>
    );
  }
}

export default ListaItens;