import React, {Component} from 'react';
import {Picker, StyleSheet} from 'react-native';

export default class Operacao extends Component {
  render() {
    return (
      <Picker
        style={styles.operacao}
        selectedValue={this.props.operacao}
        onValueChange={op => {
          this.props.atualizaOperacao(op);
        }}>
        <Picker.Item label="Soma" value="soma" />
        <Picker.Item label="Subtração" value="subtração" />
      </Picker>
    );
  }
}

const styles = StyleSheet.create({
  operacao: {
    marginBottom: 15,
    marginTop: 15,
  },
});
