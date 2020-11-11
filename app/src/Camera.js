import React, { Component } from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
 
class ScanScreen extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };
 
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        containerStyle={{backgroundColor: 'blue', flex: 1}}
        flashMode={RNCamera.Constants.FlashMode.torch}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}
 
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
 
export default ScanScreen;