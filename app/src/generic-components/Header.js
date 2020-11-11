import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../colors';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var { navigation } = this.props;
    return (
        navigation != null ?
        <View style={{backgroundColor: colors.headerColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 40}}>
                <Image style={{width: 11.43, height: 20}} source={require('../imgs/arrowBack.png')} />
            </TouchableOpacity>
            <Text style={{flex: 1, textAlign: 'center', marginRight: 40, fontSize: 15, fontFamily: 'Sen Bold', color: colors.primaryColor}}>{this.props.label}</Text>
        </View>
        :
        <View style={{backgroundColor: colors.headerColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18 }}>
            <Text style={{flex: 1, textAlign: 'center', fontSize: 15, fontFamily: 'Sen Bold', color: colors.primaryColor}}>{this.props.label}</Text>
        </View>
    );
  }
}

export default Header;
