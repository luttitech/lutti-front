import React, { Component } from 'react';
import {
  Text, 
  Animated,
  Dimensions,
  Image,
  PanResponder } from 'react-native';
import { Button, ButtonPrimary, TextButton, Container, ViewRow, Dot } from '../../styles';
import colors from '../../colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const contentOne = <>
  <Text style={{fontSize: 22, color: colors.primaryColor, textAlign: 'center', fontFamily: 'Oswald Regular', marginRight: 25, marginLeft: 25}}>NO LUTTI, VOCÊ É O PROTAGONISTA DE TODO O PROCESSO DE COMPRA</Text>
  
  <Image source={require('../../imgs/Onboarding.png')} style={{marginTop: 15, marginBottom: 15, alignSelf: 'center'}} />
  
  <Text style={{fontSize: 15, color: colors.primaryColor, fontFamily: 'Sen Regular', marginLeft: 37, marginRight: 37, textAlign: 'center'}}>
    {/* <Text>Lutti é um</Text> */}
    {/* <Text style={{fontWeight: 'bold'}}> mercado totalmente autônomo</Text> */}
    <Text>Diferente dos mercados tradicionais com caixas, no Lutti você escolhe seus produtos e finaliza sua compra pelo aplicativo de maneira rápida e prática.</Text>
  </Text>
  </>

const contentTwo = <>
  <Text style={{fontSize: 22, color: colors.primaryColor, textAlign: 'center', fontFamily: 'Oswald Regular', marginLeft: 25, marginRight: 25}}>
    <Text>APONTE O</Text>
    <Text style={{fontWeight: 'bold'}}> "MEU QR" </Text>
    <Text>NO LEITOR QUE FICA NA PORTA DA UNIDADE LUTTI</Text>
  </Text>

  <Image source={require('../../imgs/OnboardingTwo.png')} style={{marginTop: 20, marginBottom: 20, alignSelf: 'center'}} />
  
  <Text style={{fontSize: 15, color: colors.primaryColor, fontFamily: 'Sen Regular', marginLeft: 37, marginRight: 37, textAlign: 'center'}}>
    <Text>Mas para finalizar uma compra você precisa cadastrar um cartão aqui no aplicativo. </Text>
    {/* <Text style={{fontWeight: 'bold'}}> cadastrar uma forma de pagamento no App.</Text> */}
  </Text>
  </>

const contentThree = <>
  <Text style={{fontSize: 22, color: colors.primaryColor, textAlign: 'center', fontFamily: 'Oswald Regular', marginRight: 25, marginLeft: 25}}>QUEREMOS TE OFERECER A MELHOR EXPERIÊNCIA DE COMPRA!</Text>
  
  <Image source={require('../../imgs/OnboardingThree.png')} style={{marginTop: 10, marginBottom: 15, alignSelf: 'center'}} />
  
  <Text style={{fontSize: 15, color: colors.primaryColor, fontFamily: 'Sen Regular', marginLeft: 37, marginRight: 37, textAlign: 'center'}}>
    Utilize o app para ler o código de barras dos produtos e assim finalizar sua compra.
  </Text>
  <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.primaryColor, fontFamily: 'Sen Regular', marginLeft: 58, marginRight: 58, marginTop: 15, textAlign: 'center'}}>
    Encontre o Lutti mais próximo de você e aproveite!
  </Text>
  </>

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      animatedValue: new Animated.Value(0),
      fadeValue: new Animated.Value(0),
      fadeValueContent: new Animated.Value(0),
      buttonsAnimation: new Animated.Value(0),
      fadeButton: new Animated.Value(1),
      position: 0,
      textButton: 'Próximo'
    };
  }

  componentDidMount(){
    this.startAnimations()
  }

  startAnimations = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.fadeValueContent, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  };

  fadeContentTransition = () => {
    this.state.fadeValueContent = new Animated.Value(0);

    Animated.timing(this.state.fadeValueContent, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();

  }

  animateButtons = () => {
    Animated.timing(this.state.buttonsAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
    Animated.timing(this.state.fadeButton, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  undoButtonsAnimation = () => {
    Animated.timing(this.state.buttonsAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
    Animated.timing(this.state.fadeButton, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  pan = new Animated.ValueXY();

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      var position = this.state.position;
      if(gestureState.dx > 0){
        this.back();
      }else if(gestureState.dx < 0 && position < 2){
        this.next();
      }
    }
  })

  next = () => {
    var position = this.state.position;
    if(position == 2){
      this.props.navigation.navigate('Begin');
    }
    if(position == 1){
      this.animateButtons();
      this.setState({ textButton: 'Entendido!' });
    }
    if(position < 2){
      this.fadeContentTransition();
      position++;
      this.setState({ position })
    }
  }

  back = () => {
    var position = this.state.position;
    if(position == 2){
      this.undoButtonsAnimation();
      this.setState({ textButton: 'Próximo' });
    }
    if(position > 0){
      this.fadeContentTransition();
      position--;
      this.setState({ position })
    }
  }

  skip = () => {
    this.animateButtons();
    this.setState({ position: 2, textButton: 'Entendido!' })
  }

  render() {
    let { animatedValue, fadeValue, fadeValueContent, buttonsAnimation, fadeButton, textButton } = this.state;
    var position = this.state.position;
    
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.pan.x },
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-screenHeight, 0]
                })
              },
            ],
            opacity: fadeValue,
            height: screenHeight-95,
            width: screenWidth,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
            backgroundColor: colors.whiteColor,
            justifyContent: "center"
          }}

          {...this.panResponder.panHandlers}
        >
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-screenHeight, 0]
                })
              },
            ],
            opacity: fadeValueContent
          }}
        >
          { position === 0 ? contentOne : position === 1 ? contentTwo : contentThree }
          
          </Animated.View>
          <ViewRow style={{marginTop: 30, justifyContent: 'center'}}>
            <Dot choiced={position === 0}/>
            <Dot choiced={position === 1}/>
            <Dot choiced={position === 2}/>
          </ViewRow>
          
        </Animated.View>

        <ViewRow style={{marginTop: 10}}>

        <Animated.View
            style={{
              opacity: fadeButton
            }}
          >
            <Button style={{marginRight: 10}} onPress={this.skip}>
                <TextButton textColor={colors.whiteColor}>Pular</TextButton>
            </Button>
          </Animated.View>
          
          <Animated.View
            style={{
              transform: [
                {
                  translateX: buttonsAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60]
                  })
                },
              ]
            }}
          >
            <ButtonPrimary onPress={this.next}>
                <TextButton textColor={colors.primaryColor}>{textButton}</TextButton>
            </ButtonPrimary>
          </Animated.View>
          
        </ViewRow>

        </Container>
    );
  }
}

export default Welcome;
