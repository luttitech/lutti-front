import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { Button, ButtonPrimary, TextButton, Container, ViewRow, Dot } from '../../styles';
import Input from '../../generic-components/Input'
import colors from '../../colors';

class Begin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var { navigation } = this.props;
    return (
      <Container>
        <Image source={require('../../imgs/Neg-Símbolo.png')} style={{ width: 100, height: 100, resizeMode: 'stretch' }} />
        <Text onPress={() => navigation.push('Register')} style={{ marginLeft: 40, marginRight: 40, marginTop: 35, marginBottom:-15, fontFamily: 'Sen Regular', textAlign: 'center' }} >
            <Text style={{ color: colors.whiteColor }} >Não tem uma conta? </Text>
            <Text style={{ color: colors.secondaryColor }} >Cadastre-se</Text>
        </Text>
        {/* <View style="borderRadius: 11, borderWidth: 2, alignItems: 'center', borderColor: white"> */}
          <Input style={{width: '80%', alignItems: 'center', color:'white', marginBottom:-15, backgroundColor: '#191919', paddingLeft: 15}} maxLenght={16} placeholder="E-mail ou nome de usuário" placeholderTextColor="gray"/>
          <Input style={{width: '80%', alignItems: 'center', color:'white', backgroundColor: '#191919', paddingLeft: 15}} icon={this.state.passIcon} maxLenght={16} placeholder="Senha" placeholderTextColor="gray"/>
        {/* </View> */}
        <Text onPress={() => navigation.push('Terms')} style={{ marginLeft: 40, left: 70, marginRight: 40, marginTop: 13, fontFamily: 'Sen Regular', textAlign: 'center' }} >
            <Text style={{ color: colors.whiteColor }} >Esqueci minha senha </Text>
        </Text>
        <ButtonPrimary onPress={() => navigation.push('Menu')} style={{ width:280, marginTop: 15 }}>
            <TextButton textColor={colors.primaryColor}>Entrar</TextButton>
        </ButtonPrimary>
        {/*<Button style={{ width:280, marginTop: 10, borderColor: colors.linkColor }}>
            <TextButton textColor={colors.whiteColor}>Continuar com o Google</TextButton>
          </Button>*/}
        <Text onPress={() => navigation.push('Terms')} style={{ marginLeft: 90, marginRight: 90, marginTop: 12, fontFamily: 'Sen Regular', textAlign: 'center' }} >
            <Text style={{ color: colors.whiteColor }} >Ao entrar você concorda com os </Text>
            <Text style={{ color: colors.secondaryColor }} >Termos de Uso</Text>
        </Text>
      </Container>
    );
  }
}

export default Begin;
