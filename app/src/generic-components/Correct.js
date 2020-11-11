import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class Correct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: require('../imgs/correct.png')
    };
  }

  render() {
    const image = this.state.image;
    return (
        <TouchableOpacity onPress={this.props.handleClick}>
            <Image style={{height: 25, width: 25, margin: 7}} source={image} />
        </TouchableOpacity>
    );
  }
}

export default Correct;
