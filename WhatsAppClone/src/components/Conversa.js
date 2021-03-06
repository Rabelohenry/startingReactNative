import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {View, Text, TextInput, Image, TouchableHighlight} from 'react-native';
import {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch,
} from '../actions/AppActions';
import ListView from 'deprecated-react-native-listview';

class Conversa extends Component {
  UNSAFE_componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
    this.criaFonteDeDados(this.props.conversa);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.contatoEmail !== nextProps.contatoEmail) {
      this.props.conversaUsuarioFetch(nextProps.contatoEmail);
    }
    this.criaFonteDeDados(nextProps.conversa);
  }

  _enviaMensagem() {
    const {mensagem, contatoNome, contatoEmail} = this.props;

    this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }
  criaFonteDeDados(conversa) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(conversa);
  }

  render() {
    console.log(this.props);

    return (
      <View
        style={{
          flex: 1,
          marginTop: 0,
          backgroundColor: '#eee4dc',
          padding: 10,
        }}>
        <View style={{flex: 1, paddingBottom: 20}}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={data => {
              if (data.tipo === 'e') {
                return (
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 40,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000',
                        padding: 10,
                        backgroundColor: '#dbf5b4',
                        elevation: 1,
                      }}>
                      {data.mensagem}
                    </Text>
                  </View>
                );
              }

              return (
                <View
                  style={{
                    alignItems: 'flex-start',
                    marginTop: 5,
                    marginBottom: 5,
                    marginRight: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      padding: 10,
                      backgroundColor: '#f7f7f7',
                      elevation: 1,
                    }}>
                    {data.mensagem}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={{flexDirection: 'row', height: 60}}>
          <TextInput
            value={this.props.mensagem}
            onChangeText={texto => this.props.modificaMensagem(texto)}
            style={{flex: 4, backgroundColor: '#fff', fontSize: 18}}
          />

          <TouchableHighlight
            onPress={() => this._enviaMensagem()}
            underlayColor="#fff">
            <Image source={require('../imgs/enviar_mensagem.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return {...val, uid};
  });

  return {
    conversa,
    mensagem: state.AppReducer.mensagem,
  };
};

export default connect(
  mapStateToProps,
  {modificaMensagem, enviarMensagem, conversaUsuarioFetch},
)(Conversa);
