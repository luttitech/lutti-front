import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Image
} from 'react-native'; 
import Button from '../../generic-components/Button'

import { RNCamera } from 'react-native-camera';
import colors from '../../colors';

var lastId = 0
const primaryColor = '#FFFFFF';

const ip = '192.168.0.185';

class Scan extends Component {

  constructor(props){
    super(props);
    this.state = {
      qrMessage: '🚫',
      welcome: 'Escaneei o código de entrada',
      bgColor: 'white'
    }
  }

  render(){
    return (
      <>
        <View style={{flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: this.state.bgColor}}>
          <RNCamera
            captureAudio={false}
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}

            onGoogleVisionBarcodesDetected={this.barcodeRecognized}
          >
            <View style={styles.containerStyle}>
              <View style={styles.containerWhite}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Image style={{width: 32, height: 32, transform:[ { rotateZ: '134deg' } ] }} source={require('../../imgs/arrowDown.png')} />
                  <Image style={{width: 32, height: 32, transform:[ { rotateZ: '-134deg' } ] }} source={require('../../imgs/arrowDown.png')} />
                </View>
                <View style={{backgroundColor: colors.whiteColor, borderRadius: 10, padding: 20}}>
                  <Text style={{color: colors.primaryColor, textAlign: 'center'}}>Para entrar em uma unidade Lutti, cadastre uma forma de pagamento:</Text>
                  <Button onPress={() => this.props.navigation.navigate('Pagamento')} style={{width: 150, alignSelf: 'center', marginTop: 15}} text="Cadastrar cartão" />
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <Image style={{width: 32, height: 32, transform:[ { rotateZ: '44deg' } ] }} source={require('../../imgs/arrowDown.png')} />
                  <Image style={{width: 32, height: 32, transform:[ { rotateZ: '-44deg' } ] }} source={require('../../imgs/arrowDown.png')} />
                </View>
                <Text style={{color: colors.secondaryColor, marginBottom: 5, marginTop: 10, fontFamily: 'Sen Bold', fontSize: 18, textAlign: 'center'}}>Escaneando...</Text>
              </View>
            </View>
          </RNCamera>
        </View>
      </>
      
    );
  }

  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => this.showMessage(barcode.data))
  };
 
  showMessage(message){
    var data = JSON.parse(message)
    if(data.command == 'OPEN'){
      if(lastId != data.id){
        lastId = data.id
        this.setState({ welcome: 'Entrada liberada', qrMessage: ' - '+data.id })
        var self = this
        this.setState({ bgColor: 'green' })

        fetch('http://'+ip+'/v2/lutti/lights.php?option=entry on')
        .then((response) => {
          return response.text();
        })
        .then((responseJson) => {
          console.warn(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });

        setTimeout(() => {
          fetch('http://'+ip+'/v2/lutti/lights.php?option=entry off')
          .then((response) => {
            return response.text();
          })
          .then((responseJson) => {
            console.warn(responseJson)
          })
          .catch((error) => {
            console.error(error);
          });
        }, 3000);

        setTimeout(() => {
          self.setState({ bgColor: 'white' })
        }, 1000);

        
      }
    }else{

      if(lastId == data.id){
        this.setState({ welcome: 'Escaneei o código de entrada', qrMessage: '🚫' })

        this.setState({ bgColor: 'red' })
        var self = this
        
        fetch('http://'+ip+'/v2/lutti/lights.php?option=exit on')
        .then((response) => {
          return response.text();
        })
        .then((responseJson) => {
          console.warn(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });

        setTimeout(() => {
          fetch('http://'+ip+'/v2/lutti/lights.php?option=exit off')
          .then((response) => {
            return response.text();
          })
          .then((responseJson) => {
            console.warn(responseJson)
          })
          .catch((error) => {
            console.error(error);
          });
        }, 3000);
        
        setTimeout(() => {
          self.setState({ bgColor: 'white' })
        }, 1000);

        lastId = 0
      }
      
    }
    //console.warn(data.id)
  }
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  welcome:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  instructions:{
    fontSize: 16
  },
  containerPadding:{
    paddingLeft: 8,
    paddingRight: 8
  },
  containerStyle: {
    padding: 40,
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    opacity: 1
  },
  containerWhite: {
    flex: 1,
    width: '100%', 
    //backgroundColor: 'white',
    borderRadius: 10
  }
});

export default Scan;