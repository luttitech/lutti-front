import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import colors from '../../colors';
import { getData } from '../../storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: ''
    };
  }

  async componentDidMount(){
    var user = await getData('user');
    var d = new Date();
    var n = d.getHours();
    var names = user.name.split(' ');
    var message = '';
    if(n <= 12 && n > 0){
      message = 'Bom dia, '+names[0]+"!"
    }else if(n <= 18 && n > 0){
      message = 'Boa tarde, '+names[0]+"!"
    }else{
      message = 'Boa noite, '+names[0]+"!"
    }
    message = message.toUpperCase();
    this.setState({welcomeMessage: message})
  }

  render() {
    return (
      <View style={{flex: 1, padding: 32, backgroundColor: colors.whiteColor}}>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image style={{width: 25, height: 25}} source={require('../../imgs/pickLocation.png')} />
            <Text style={{ flex: 1, marginLeft: 15, color: colors.primaryColor, fontSize: 15, fontFamily: 'Sen Bold'}}>Lutti Jardim das Américas</Text>
            <Image style={{width: 15, height: 15, marginTop: 5}} source={require('../../imgs/arrowDown.png')} />
        </View>
        <View style={{width: '100%', height: 2, backgroundColor: "#00000029", marginTop: 7}} />
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Image source={require('../../imgs/Home.png')} />
            <Text style={{textAlign: 'center', fontFamily: 'Oswald Regular', color: colors.primaryColor, fontSize: 22, marginTop: 15}} >{this.state.welcomeMessage}</Text>
            <Text style={{textAlign: 'center', fontFamily: 'Sen Bold', color: colors.primaryColor, fontSize: 15, marginTop: 5}}>Vai entrar em uma unidade Lutti? É só escanear o QR Code que fica na porta e aproveitar!</Text>
            <Text style={{textAlign: 'center', fontFamily: 'Sen Bold', color: colors.primaryColor, fontSize: 15, marginTop: 25}}>Cadastre uma forma de pagamento primeiro!</Text>
        </View>
      </View>
    );
  }
}

export default Home;
