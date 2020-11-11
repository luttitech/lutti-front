import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class Eye extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: require('../imgs/eye.png')
    };
  }

  handleClickEye = () => {
    if(this.state.image == require('../imgs/closedEye.png')){
        this.setState({image: require('../imgs/eye.png')})
        this.props.hidePass(true)
    }else{
        this.setState({image: require('../imgs/closedEye.png')})
        this.props.hidePass(false)
    }
  }

  render() {
    const image = this.state.image;
    return (
        <TouchableOpacity onPress={this.handleClickEye}>
            <Image style={{height: 20, width: 25, margin: 10}} source={image} />
        </TouchableOpacity>
        
    );
  }
}

export default Eye;
