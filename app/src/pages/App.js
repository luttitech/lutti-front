import React, { Component } from 'react';
import { 
  View, 
  StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    //this.animation.play(30, 120);
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        source={require('../anmts/logo_new_three.json')}
      />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#1d1e1b',
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
