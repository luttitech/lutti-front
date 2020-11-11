import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonPrimary, ButtonDisabled, TextButton } from '../styles'
import colors from '../colors';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const button = this.props.disabled ? 
    <ButtonDisabled style={this.props.style}>
      <TextButton textColor={colors.disabledTextColor}>{this.props.text}</TextButton>
    </ButtonDisabled> :
    <ButtonPrimary onPress={this.props.onPress} style={this.props.style}>
      <TextButton textColor={colors.primaryColor}>{this.props.text}</TextButton>
    </ButtonPrimary>
    return (
      button
    );
  }
}

export default Button;
