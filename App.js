import React, { Component } from 'react';
import { StyleSheet, StatusBar, Keyboard } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples, Button, Text, DropDownMenu, Icon, TextInput } from '@shoutem/ui';
  
import PouchDB from 'pouchdb-core'
PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default)
const db = new PouchDB('mydb', {adapter: 'asyncstorage'})





const clientes = [
  { title: 'AMontenegro', value: 'amontenegro' },
  { title: 'Capi', value: 'capi' },
  { title: 'GlobalCafe', value: 'globalcafe' },
  { title: 'PetShop', value: 'petshop' }
];

const usuarios = [
  { title: 'aaa', value: 'amontenegro' },
  { title: 'bbb', value: 'capi' },
  { title: 'ccc', value: 'globalcafe' },
  { title: 'ddd', value: 'petshop' }
];

Manager = {
  abreChamado : ()=>{
    // Manager.persisteChamado();
    // Manager.enviaEmail();
    // use PouchDB
    db.put({"_id": "mittens2", "name": "Mittens2"});
    db.get('mittens')
      .then(doc => {alert(doc._id);alert(doc.name);})
  },
  persisteChamado : ()=>{
  },
  enviaEmail : ()=>{
    // var nodemailer = require('nodemailer');

    // var transporte = nodemailer.createTransport({
    //   service: 'Gmail', // Como mencionei, vamos usar o Gmail
    //   auth: {
    //     user: 'tarapi007@gmail.com',
    //     pass: 'generalize'
    //   } 
    // });

    // var email = {
    //   from: 'usuario@gmail.com', // Quem enviou este e-mail
    //   to: 'diegopereiracalcada@gmail.com', // Quem receberá
    //   subject: 'Node.js ♥ unicode',  // Um assunto bacana :-) 
    //   html: 'E-mail foi enviado do <strong>Node.js</strong>' // O conteúdo do e-mail
    // };

    // // Pronto, tudo em mãos, basta informar para o transporte
    // // que desejamos enviar este e-mail
    // transporte.sendMail(email, function(err, info){
    //   if(err)
    //     throw err; // Oops, algo de errado aconteceu.

    //   console.log('Email enviado! Leia as informações adicionais: ', info);
    // });
    
  },
};

class FiltersBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {showBtnCloseKeyboard : false}
    showBtnCloseKeyboard = showBtnCloseKeyboard.bind(this);
  }

  render(){
    if(this.state.showBtnCloseKeyboard){ //btnFecharTeclado.props.isActive
      return (
        <View style={{flex : 2}}>
          <Button style={{flex : 1, backgroundColor: '#000'}} onPress={()=>{Keyboard.dismiss(); this.setState({showBtnCloseKeyboard : false})}} >
            <Text style={{color: '#fff', fontSize: 30}}>Fechar Teclado</Text>
          </Button>
        </View>  
      );
    }
    
    return (
      <View style={{flex : 2}}>
          <Text>Cliente:</Text>
          <DropDownMenu
            styleName="horizontal"
            options={clientes}
            selectedOption={clientes[0]}
            //onOptionSelected={(example) => this.setState({ selectedCliente: example })}
            titleProperty="title"
            valueProperty="value"
          />
        
          <Text>Solicitante:</Text>
          <DropDownMenu
            styleName="horizontal"
            options={usuarios}
            selectedOption={usuarios[0]}
            //onOptionSelected={(example) => {this.setState({ selectedUsuario: example }); Keyboard.dismiss();}}
            titleProperty="title"
            valueProperty="value"
          />
        </View>
    );
  }
}

function showBtnCloseKeyboard (){
  this.setState({showBtnCloseKeyboard : true})
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //selectedCliente: clientes[0],
      //selectedUsuario: usuarios[0]
    };
  }

  state = {
    fontsAreLoaded: false
  };
  
  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });
    
    this.setState({ fontsAreLoaded: true });
  }
  
  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    
    const { selectedExample } = this.state;
    
    return (
      <View styleName="flexible" style={{paddingTop: 20}}>

        <FiltersBar />
      
        <View style={{flex: 7, marginTop: 30}}>
          <TextInput
            style={{flex : 1}}
            multiline={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Digite a descrição..."
            onFocus = {()=>{showBtnCloseKeyboard()}}
          />
        </View>

        <View style={{flex:1}} >
          <Button styleName="dark" onPress={()=>{Manager.abreChamado();}}>
            <Icon name="plus-button" />
            <Text>ABRIR CHAMADO</Text>
          </Button>
        </View>  
      </View>
    );
  }
}

  


  