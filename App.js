import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import email from 'react-native-email'

var handleEmail = () => {
        const to = ['tarapi007@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            //cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            //bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Show how to use',
            body: 'Some body right here'
        }).catch(console.error)
    }

const Button = ({children}) => (
  <TouchableOpacity onPress={() => {
    handleEmail();
  }} style={{flex: 1, backgroundColor : '#ccc', justifyContent: 'center', alignItems: 'center'}}>
    <Text>{children}</Text>
  </TouchableOpacity> 
);

const metrics = {
  cntrPaddingTop : 20
};

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    paddingTop : metrics.cntrPaddingTop
  },
  header : {
    flexDirection : 'row',
    alignItems: "center",
    justifyContent : "space-between",
    height: 50,
    backgroundColor: '#ccc',
    paddingHorizontal: 10
  },
  itemChamado : {
    backgroundColor : '#24b723',
    height: 100,
    flexDirection : 'row',
    padding: 5,
    marginBottom: 2
  }
});



class Header extends React.Component{
  render (){
    return (
      <View style={styles.header}>
        <Ionicons name="ios-menu" size={32} color="blue" />
        <Text>Chamados Abertos</Text>
        <Ionicons name="md-checkmark-circle" size={32} color="#ccc" />
      </View>
    )
  }
}

class ItemChamado extends React.Component{
  render(){
    return (
        <View style={styles.itemChamado}>
          <View style={styles.chamadoInfs, {flex: 3}}>
            <Text>{this.props.chamado.cliente}</Text>
            <Text>{this.props.chamado.desc} </Text>
            <Text>aberto em {this.props.chamado.dtAbertura}</Text>
          </View>
          <View style={{flex: 1}}>
            <Button onPress={() => {
    Alert.alert('You tapped the button!');
  }}>
             Fechar
            </Button>
          </View>
        </View>
      )
  }
}

class Corpo extends React.Component{
  state = {
    chamadosAbertos : [{
      cliente : 'quality',
      desc : 'descricap1',
      dtAbertura : '11/11/1111'
    },{
      cliente : 'quality',
      desc : 'descricap2',
      dtAbertura : '11/11/2222'
    },{
      cliente : 'quality',
      desc : 'descricap3',
      dtAbertura : '11/11/3333'
    }],
  }
  render(){
    return (
        <View>
          {
            this.state.chamadosAbertos.map(
              (chamado)=><ItemChamado chamado={chamado} />
            )
          }
        </View>
      )
  }
}

class Footer extends React.Component{
  render(){
    return (
        <View>
          <Text>13 chamados abertos</Text>
        </View>
      )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Corpo />
        <Footer />
      </View>
    );
  }
}




