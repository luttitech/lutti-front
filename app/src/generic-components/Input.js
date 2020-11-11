import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import colors from '../colors';
import TextInputMask from 'react-native-text-input-mask';
import Eye from './Eye';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        hidePass: true
    };
  }

  onChangeText = (data) => {
    this.setState({ value: data })
    this.props.onChange(data)
}

  render() {
    var value = this.props.value != undefined ? this.props.value : this.state.value
    var opacity = this.props.label != undefined ? 1 : 0
    var primary = this.props.ready ? colors.secondaryColor : colors.primaryColor
    return (
        <View placeholderTextColor='white' style={[this.props.style,{
            marginTop: 25,
                borderRadius: 11,
                borderWidth: 2,
                alignItems: 'center',
                borderColor: primary,
                color: colors.whiteColor,

            }]}>
            <Text placeholderTextColor='white' color="white" style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontFamily: 'Sen Regular',
                color: '#ffffff',
                backgroundColor: colors.whiteColor,
                opacity: opacity
            }}> {this.props.label} </Text>
            {
                this.props.mask ?
                <View placeholderTextColor={`#999999`} style={{flexDirection: 'row', color: '#ffffff'}}>
                    <TextInputMask
                        refInput={ref => { this.input = ref }}
                        autoFocus={this.props.autoFocus} 
                        onFocus={this.props.onFocus}
                        value={value}
                        style={{height: 40, flex: 1, marginLeft: 15, fontSize: 17, fontFamily: 'Sen Bold', color: '#ffffff'}} 
                        placeholder={this.props.placeholder} 
                        placeholderTextColor={`#808080`}
                        keyboardType={this.props.keyboardType}
                        onChangeText={(formatted, extracted) => {
                            this.props.formatted ?
                            this.onChangeText(formatted)
                            :
                            this.onChangeText(extracted)
                        }}
                        mask={this.props.mask}
                    />
                    {this.props.icon}
                </View>
                :
                this.props.password ?
                <View placeholderTextColor={`#808080`} style={{flexDirection: 'row', color: '#ffffff'}}>
                    <TextInput ref={this.props.input} placeholderTextColor={`#808080`} autoFocus={this.props.autoFocus} onFocus={this.props.onFocus} secureTextEntry={this.state.hidePass} value={value} maxLength={this.props.maxLenght} onChangeText={this.onChangeText} style={{height: 40, flex: 1, marginLeft: this.props.marginLeft, fontSize: 17, fontFamily: 'Sen Bold', color: '#ffffff'}} placeholder={this.props.placeholder} keyboardType={this.props.keyboardType}></TextInput>
                    {this.props.icon}
                    <Eye hidePass={() => (this.setState({hidePass: !this.state.hidePass}))} />
                </View>
                :
                <View placeholderTextColor={`#808080`} style={{flexDirection: 'row'}}>
                    <TextInput placeholderTextColor={`#808080`} onTouchEnd={this.props.hasTouched} ref={this.props.input} autoFocus={this.props.autoFocus} onFocus={this.props.onFocus} value={value} maxLength={this.props.maxLenght} onChangeText={this.onChangeText} style={{height: 40, flex: 1, fontSize: 17, marginLeft: this.props.marginLeft, textAlign: this.props.textAlign, fontFamily: 'Sen Bold', color: '#ffffff'}} placeholder={this.props.placeholder} keyboardType={this.props.keyboardType}></TextInput>
                    {this.props.icon}
                </View>
                
            }
            
        </View>
    );
  }
}

export default Input;
