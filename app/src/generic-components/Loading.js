import React, { Component } from 'react';
import { View, Dimensions, Animated, Image } from 'react-native';
import colors from '../colors';

var time = 0;
var intervalId = 0;
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
        animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount(){
    this.startAnimations()
  }

  componentWillUnmount(){
    clearInterval(intervalId);
  }

  countTime = (active) => {
    var context = this;
    console.log('atualizou aqui')
    clearInterval(intervalId);
    if(active){
      intervalId = setInterval(() => {
        console.log('interval ',intervalId)
        time++;
        console.log('Time ',time)
        if(time >= 30){
          clearInterval(intervalId);
          context.props.expired();
          time = 0;
        }
      }, 1000)
    }
    
  }

  startAnimations = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start(() => this.startAnimations());
  };

  render() {
    let { animatedValue } = this.state;
    this.countTime(this.props.active)
    return (
      <View style={{flex: 1, backgroundColor: colors.primaryColor}}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: 
                animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0 deg', '360 deg']
                  })
              },
            ],
            justifyContent: "center",
            alignContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
        <Image source={require('../imgs/loading.png')} style={{alignSelf: 'center'}} />
        </Animated.View>
        
      </View>
    );
  }
}

export default Loading;
