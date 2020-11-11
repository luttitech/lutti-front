import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../colors.js';

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('showAlert ',this.props.showAlert)
    const showAlert = this.props.showAlert
    return (
        <AwesomeAlert
            show={showAlert}
            title={this.props.title}
            message={this.props.message}
            messageStyle={{fontFamily: 'Sen Regular', color: colors.primaryColor}}
            showConfirmButton={true}
            confirmText="Entendido"
            confirmButtonTextStyle={{fontFamily: 'Sen Regular', color: colors.primaryColor}}
            confirmButtonColor={colors.secondaryColor}
            onConfirmPressed={() =>
                this.props.hideAlert()
            }
      />
    );
  }
}

export default Alert;
