// import React, { Component} from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// import auth from '@react-native-firebase/auth';
// import { login } from '../../api.js';
// import { storeData, getData } from '../../storage.js'

// import Header from '../../generic-components/Header'
// import Button from '../../generic-components/Button'
// import Input from '../../generic-components/Input'
// import Loading from '../../generic-components/Loading'
// import Alert from '../../generic-components/Alert'
// import colors from '../../colors';

// import { AuthContext } from '../../Routes'
// var makeSignIn;

// class ConfirmCellphone extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       confirm: null,
//       buttonDisabled: true,
//       phoneNumber: '',
//       codeOne: '',
//       codeTwo: '',
//       codeThree: '',
//       codeFour: '',
//       codeFive: '',
//       codeSix: '',
//       focused: 0,
//       showLoading: false,
//       textWrongCode: "",
//       hasTouched: false,
//       showAlert: false,
//       messageAlert: ''
//     };
    
//     var { signIn } = AuthContext._currentValue;
//     makeSignIn = signIn;
//   }

//   onChangeCellPhone = (data) => {
//     if(data.length == 11){
//       console.log('number ',data);
//       this.setState({ buttonDisabled: false, phoneNumber: data });
//     }else{
//       this.setState({ buttonDisabled: true });
//     }
//   }

//   componentDidMount(){
//     this.setState({buttonDisabled: true})
//     this.unSubscribe = auth().onAuthStateChanged(this.onAuthStateChanged);
//   }

//   componentWillUnmount() {
//     this.unSubscribe();
//   }

//   authEmail(){
//     auth()
//     .createUserWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!')
//     .then(() => {
//       console.log('User account created & signed in!');
//     })
//     .catch(error => {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }

//       console.error(error);
//     });
//   }

//    onAuthStateChanged = async (user) => {
//     console.log('user ',user)
//     if (user){
//       this.setState({user})
//       var res = await makeSignIn(this.state.phoneNumber)
//       console.log("Make sign response ",res)
//       if(res === null){
//         this.props.navigation.navigate('Register', { number: this.state.phoneNumber });
//       }
//     }
//   };

//   async signInWithPhoneNumber() {
//     this.setState({ showLoading: true });
//     const confirmation = await auth().signInWithPhoneNumber("+55"+this.state.phoneNumber);
//     console.log('confirmation ',confirmation)
//     this.setState({ confirm: confirmation, focused: 0 });
//     var ctx = this;
//     setTimeout(() => {
//       console.log('esperando')
//       ctx.setState({showLoading: false});
//     }, 20000)
//     //
//   }

//   async confirmCode(code) {
//     this.setState({ showLoading: true });
//     var { confirm } = this.state;
//     try {
//       var confirmResponse = await confirm.confirm(code)
//       .then(user => {
//         console.log('user ',user)
//       })
//       console.log('Confirm code response ', confirmResponse)
      
//     } catch (error) {
//       this.setState({textWrongCode: 'Código incorreto!'})
//       console.log('Invalid code response ', error);
//     }
//     this.setState({ showLoading: false });
//   }

//   setCode(text){
//     this.setState({ code: text })
//   }

//   onFocus(id){
//     console.log('focus ',id);
//     this.setState({focused: id});

//     switch(id){
//       case 1:
//         this.setState({codeOne: ''});
//       break;
//       case 2:
//         this.setState({codeTwo: ''});
//       break;
//       case 3:
//         this.setState({codeThree: ''});
//       break;
//       case 4:
//         this.setState({codeFour: ''});
//       break;
//       case 5:
//         this.setState({codeFive: ''});
//       break;
//       case 6:
//         this.setState({codeSix: ''});
//       break;
//     }
//   }

//   onChangeCode(v, id){
//     var {codeOne, codeTwo, codeThree, codeFour, codeFive, codeSix, hasTouched} = this.state;
//     switch(id){
//       case 1:
//         this.setState({codeOne: v});
//         codeOne = v;
//         if(!hasTouched){
//           this.inputTwo.focus();
//         }
//       break;
//       case 2:
//         this.setState({codeTwo: v});
//         codeTwo = v;
        
//         if(!hasTouched){
//           this.inputThree.focus();
//         }
//       break;
//       case 3:
//         this.setState({codeThree: v});
//         codeThree = v;
        
//         if(!hasTouched){
//           this.inputFour.focus();
//         }
//       break;
//       case 4:
//         this.setState({codeFour: v});
//         codeFour = v;
        
//         if(!hasTouched){
//           this.inputFive.focus();
//         }
//       break;
//       case 5:
//         this.setState({codeFive: v});
//         codeFive = v;
        
//         if(!hasTouched){
//           this.inputSix.focus();
//         }
//       break;
//       case 6:
//         this.setState({codeSix: v});
//         codeSix = v;
//       break;
//     }

//     var code = codeOne+codeTwo+codeThree+codeFour+codeFive+codeSix;+
//     console.log('code ',code);
//     if(code.length === 6){
//       this.confirmCode(code);
//     }
    
//   }

//   expired = () => {
//     this.setState({
//       showLoading: false, 
//       showAlert: true, 
//       messageAlert: 'Erro ao prosseguir, verfique sua conexão ou tente novamente mais tarde.',
//       buttonDisabled: true
//     })
//   }

//   render() {
//     var { confirm } = this.state;
//     return (
//       this.state.showLoading ? 
//       <Loading expired={this.expired} active={this.state.showLoading}/>
//       :
//       <View style={{ backgroundColor: colors.whiteColor, flex: 1 }}>
//         <Header navigation={this.props.navigation}/>
//         <View style={{height: '100%', color: '#000', marginRight: 30, marginLeft: 30}}>
//           {!confirm ? 
//             <>
//             <View style={{backgroundColor: colors.whiteColor}}>
//                 <Text style={{fontSize: 17, color: colors.primaryColor, fontFamily: 'Sen Bold', textAlign: 'left', marginTop: 10}}>Qual o número do seu celular?</Text>
//                 <Input autoFocus={this.state.focused === 1} onFocus={() => this.setState({focused: 1})} mask="([00]) [0] [0000]-[0000]" ready={this.state.focused === 1} value={this.state.value} onChange={this.onChangeCellPhone} label="Celular" maxLenght={16} keyboardType="numeric" placeholder="(00) 0 0000-0000"/> 
//                 <Button style={{width: '100%', marginTop: 20}} text="Receber código" onPress={() => this.signInWithPhoneNumber()} disabled={this.state.buttonDisabled}/>
//             </View>
//             </>
//             :
//             <>
//             <Text style={{textAlign: 'center', fontSize: 18, fontFamily: 'Sen Bold', color: colors.primaryColor, marginTop: 10}}>Digite o código de 6 dígitos que enviamos por SMS para {this.state.phoneNumber}</Text>
//             <View style={{flexDirection: 'row'}}>
//               <View style={{marginRight: 5, flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' value={this.state.codeOne} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 1} onFocus={() => this.onFocus(1)} ready={this.state.focused === 1} onChange={(value) => this.onChangeCode(value, 1)}/>
//               </View>
//               <View style={{marginRight: 5, flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' input={(input) => { this.inputTwo = input }} value={this.state.codeTwo} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 2} onFocus={() => this.onFocus(2)} ready={this.state.focused === 2} onChange={(value) => this.onChangeCode(value, 2)}/>
//               </View>
//               <View style={{marginRight: 5, flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' input={(input) => { this.inputThree = input }} value={this.state.codeThree} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 3} onFocus={() => this.onFocus(3)} ready={this.state.focused === 3} onChange={(value) => this.onChangeCode(value, 3)}/>
//               </View>
//               <View style={{marginRight: 5, flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' input={(input) => { this.inputFour = input }} value={this.state.codeFour} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 4} onFocus={() => this.onFocus(4)} ready={this.state.focused === 4} onChange={(value) => this.onChangeCode(value, 4)}/>
//               </View>
//               <View style={{marginRight: 5, flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' input={(input) => { this.inputFive = input }} value={this.state.codeFive} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 5} onFocus={() => this.onFocus(5)} ready={this.state.focused === 5} onChange={(value) => this.onChangeCode(value, 5)}/>
//               </View>
//               <View style={{flex: 1}}>
//                 <Input hasTouched={() => this.setState({hasTouched: true})} textAlign='center' input={(input) => { this.inputSix = input }} value={this.state.codeSix} maxLenght={1} keyboardType='numeric' autoFocus={this.state.focused === 6} onFocus={() => this.onFocus(6)} ready={this.state.focused === 6} onChange={(value) => this.onChangeCode(value, 6)}/>
//               </View>
//             </View>
//             <Text style={{textAlign: 'center', fontSize: 11, fontFamily: 'Oswald', color: 'red', marginTop: 10}}>{this.state.textWrongCode}</Text>
//             </>
//           }
//           </View>
//           <Alert message={this.state.messageAlert}
//             hideAlert={() => this.setState({showAlert: false})} 
//             showAlert={this.state.showAlert}/>
//       </View>
//     );
//   }
// }

// export default ConfirmCellphone;