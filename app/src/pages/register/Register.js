import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from '../../generic-components/Header'
import Button from '../../generic-components/Button'
import Input from '../../generic-components/Input'
import Loading from '../../generic-components/Loading'
import Alert from '../../generic-components/Alert'
import Correct from '../../generic-components/Correct'
import Wrong from '../../generic-components/Wrong'

import colors from '../../colors';

import { AuthContext } from '../../Routes'
var makeSignUp;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buttonDisabled: true,
        showAlert: false,
        messageAlert: '',

        nameValid: false,
        nameIcon: null,
        name: '',

        cpfValid: false,
        cpfIcon: null,
        cpf: '',

        emailValid: false,
        emailIcon: null,
        email: '',

        birthValid: false,
        birthIcon: null,
        birth: '',

        passValid: false,
        passIcon: null,
        pass: '',

        confirmPassValid: false,
        confirmPassIcon: null,
        confirmPass: '',
    };

    var { signUp } = AuthContext._currentValue;
    makeSignUp = signUp;
  }

  onChangeName = (name) => {
    var nameValid = name.split(' ').length >= 2;

    if(name.length > 0 && !nameValid){
      this.setState({
        nameIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Preencha seu nome completo!'})}/>, 
        nameValid })
    }else if(nameValid){
      this.setState({nameIcon: <Correct />, nameValid, name })
    }else{
      this.setState({nameIcon: null, nameValid })
    }

    this.verifyInputs();
  }

  onChangeCPF = (cpf) => {
    var cpfValid = cpf.length == 11;

    if(cpf.length > 0 && !cpfValid){
      this.setState({
        cpfIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Preencha seu cpf completo!'})}/>,
      })
    }else if(cpfValid){
      this.setState({cpfIcon: <Correct />, cpfValid, cpf })
    }else{
      this.setState({cpfIcon: null, cpfValid })
    }

    this.verifyInputs();
  }

  onChangeEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailValid = re.test(String(email).toLowerCase());

    if(email.length > 0 && !emailValid){
      this.setState({
        emailIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Preencha seu email corretamente!'})}/>,
      })
    }else if(emailValid){
      this.setState({emailIcon: <Correct />, emailValid, email })
    }else{
      this.setState({emailIcon: null, emailValid })
    }

    this.verifyInputs();
  }

  onChangeBirth = (birth) => {
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    var d = new Date();
    var year = d.getFullYear();
    var birthValid = false;
    if(birth.split('/').length == 3){
      var datevalues = birth.split('/')
      birthValid = re.test(birth) && parseInt(datevalues[2]) < parseInt(year);
    }

    if(birth.length > 0 && !birthValid){
      this.setState({
        birthIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Preencha sua data de nascimento corretamente!'})}/>,
      })
    }else if(birthValid){
      this.setState({birthIcon: <Correct />, birthValid, birth })
    }else{
      this.setState({birthIcon: null, birthValid })
    }

    this.verifyInputs();
  }

  onChangePass = (pass) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    var passValid = re.test(pass);

    if(pass.length > 0 && !passValid){
      this.setState({
        passIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Sua senha deve conter pelo menos 6 caracteres, uma letra maiúscula, uma minúscula e um número!'})}/>,
      })
    }else if(passValid){
      this.setState({passIcon: <Correct />, passValid, pass })
    }else{
      this.setState({passIcon: null, passValid })
    }

    this.verifyInputs();
  }

  onChangePassConfirm = (confirmPass) => {
    var confirmPassValid = confirmPass == this.state.pass;

    if(confirmPass.length > 0 && !confirmPassValid){
      this.setState({
        confirmPassIcon: <Wrong handleClick={() => this.setState({showAlert: true, messageAlert: 'Confirme corretamente a senha!'})}/>,
      })
    }else if(confirmPassValid){
      this.setState({confirmPassIcon: <Correct />, confirmPassValid, confirmPass })
    }else{
      this.setState({confirmPassIcon: null, confirmPassValid })
    }

    this.verifyInputs();
  }

  verifyInputs = () => {
    var self = this;
    setTimeout(() => {
      if(self.state.nameValid && self.state.cpfValid && self.state.emailValid && self.state.birthValid && self.state.passValid && self.state.confirmPassValid){
        self.setState({buttonDisabled: false})
      }else{
        self.setState({buttonDisabled: true})
      }
    },100)
    
  }

  async registerUser(){
    this.setState({isLoading: true});
    var user = {
      name: this.state.name,
      cpf: this.state.cpf,
      email: this.state.email,
      number: this.props.route.params.number,
      birth: this.state.birth,
      password: this.state.pass
    }
    await makeSignUp(user);
  }

  expired = () => {
    this.setState({
      isLoading: false, 
      showAlert: true, 
      messageAlert: 'Erro ao prosseguir, verfique sua conexão ou tente novamente mais tarde.',
      buttonDisabled: true,
      nameIcon: null,
      cpfIcon: null,
      emailIcon: null,
      birthIcon: null,
      passIcon: null,
      confirmPassIcon: null,
      nameValid: false,
      cpfValid: false,
      emailValid: false,
      birthValid: false,
      passValid: false,
      confirmPassValid: false
    })
  }

  render() {
    var { navigation } = this.props;
    return (
      this.state.isLoading ?
      <Loading expired={this.expired} active={this.state.isLoading}/>
      :
      <View style={{ flex: 1, backgroundColor: colors.primaryColor }}>
        {/* <Header navigation={this.props.navigation}/> */}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{flex: 1}}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={styles.inner}>
              <Image source={require('../../imgs/Neg-Símbolo.png')} style={{ marginLeft: '35%', marginRight: '35%', width: 100, height: 100, resizeMode: 'stretch'}}/>
              <Text onPress={() => navigation.push('Begin')} style={{ marginLeft: 40, marginRight: 40, marginTop: 35, fontFamily: 'Sen Regular', textAlign: 'center' }} >
                  <Text style={{ color: colors.whiteColor }} >Já tem cadastro? </Text>
                  <Text style={{ color: colors.secondaryColor }} >Faça login</Text>
              </Text>
                {/* <ScrollView> */}
                {/* <Text style={{fontSize: 18, fontFamily: 'Sen Bold', color: colors.primaryColor}}>Finalize seu cadastro para continuar</Text> */}
                  {/* <Input icon={this.state.nameIcon} keyboardType="default" marginLeft={15} style={{marginBottom: -14, backgroundColor: '#191919'}} onChange={this.onChangeName} placeholder="Nome completo"/>  */}
                  <Input color="white" textShadowColor="white" icon={this.state.nameIcon} keyboardType="default" marginLeft={15} style={{marginBottom: -14, backgroundColor: '#191919'}} onChange={this.onChangeName} placeholder="Nome de usuário"/> 
                  <Input color="white" textShadowColor="white" icon={this.state.emailIcon} marginLeft={15} style={{marginBottom: -14, backgroundColor: '#191919'}} onChange={this.onChangeEmail} placeholder="Email"/> 
                  <Input color="white" textShadowColor="white" icon={this.state.cpfIcon} keyboardType="numeric" mask="[000].[000].[000]-[00]" marginLeft={15} style={{marginBottom: -14, backgroundColor: '#191919'}} onChange={this.onChangeCPF} placeholder="CPF"/>
                  <Input color="white" textShadowColor="white" icon={this.state.birthIcon} keyboardType="numeric" mask="[00]/[00]/[0000]" style={{marginBottom: -14, backgroundColor: '#191919'}} formatted onChange={this.onChangeBirth} placeholder="Data de nascimento"/> 
                  <Input color="white" textShadowColor="white" icon={this.state.passIcon} marginLeft={15} maxLenght={20} password style={{marginBottom: -14, backgroundColor: '#191919'}} onChange={this.onChangePass} placeholder="Criar uma senha"/> 
                  <Input color="white" textShadowColor="white" icon={this.state.confirmPassIcon} marginLeft={15} maxLenght={20} style={{backgroundColor: '#191919'}} password onChange={this.onChangePassConfirm} placeholder="Repita a senha"/> 
                  <Button style={{width: '100%', marginTop: 20}} text="Cadastrar" onPress={() => this.registerUser()} disabled={this.state.buttonDisabled}/>
                  <Text onPress={() => navigation.push('Terms')} style={{ marginLeft: 40, marginRight: 40, marginTop: 12, fontFamily: 'Sen Regular', textAlign: 'center' }} >
                      <Text style={{ color: colors.whiteColor }} >Ao cadastrar-se você concorda com os </Text>
                      <Text style={{ color: colors.secondaryColor }} >Termos de Uso</Text>
                  </Text>
                {/* </ScrollView> */}
              </SafeAreaView>
              
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <Alert message={this.state.messageAlert}
          hideAlert={() => this.setState({showAlert: false})} 
          showAlert={this.state.showAlert}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  }
});

export default Register;
