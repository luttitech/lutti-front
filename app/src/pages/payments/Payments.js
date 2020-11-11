import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../colors';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex: 1, padding: 30, backgroundColor: colors.whiteColor}}>
        <View>
          <Text>Em desenvolvimento</Text>
        </View>
      </View>
    );
  }
}

export default Payments;
