import React, { Component } from 'react';
import Input from './Input';

class CellPhoneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    };
  }

  onChangeCellPhone = (data) => {
      if(data.length >= this.state.value.length){
        if(data.length == 1){
            data = "("+data;
        }else if(data.length == 3){
            data = data+")";
        }else if(data.length == 4){
            if(data[3] != ')'){
                data = data.substring(0,3)+')'
            }
        }else if(data.length == 5){
            var n = data.substring(4,5)
            data = data.substring(0,4)+" "+n
        }else if(data.length == 7){
            var n = data.substring(6,7)
            data = data.substring(0,6)+" "+n
        }else if(data.length == 12){
            var n = data.substring(11,12)
            data = data.substring(0,11)+"-"+n
        }
      }
      this.setState({ value: data })
      this.props.onChange(data)
  }

  render() {
    return (
        <Input ready={this.props.ready} value={this.state.value} onChange={this.onChangeCellPhone} label="Celular" maxLenght={16} keyboardType="numeric" placeholder="(00) 0 0000-0000"/>      
    );
  }
}

export default CellPhoneInput;
