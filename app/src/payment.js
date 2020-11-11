import React, { Component } from 'react';
import { View, Text } from 'react-native';
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import { doPayment } from './api.js';
import Input from './generic-components/Input'
import CellPhoneInput from './generic-components/CellPhoneInput'
import Button from './generic-components/Button';
import colors from './colors';

stripe.setOptions({
  publishableKey: 'pk_test_p7IfDTomfhVl0bsHUipaeeDI008ewj5xdV',
});

export default class Payment extends Component {

    state = {
        isPaymentPending: true
    }

  requestPayment = async () => {

    const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 27,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
    }
      
    const token = await stripe.createTokenWithCard(params)
    console.log('possivel token ',token.tokenId)
    doPayment(100, token.tokenId);

    /*this.setState({ isPaymentPending: true });
    return stripe
      .paymentRequestWithCardForm()
      .then(data => {
          console.log('token Info', data);
        return data//doPayment(100, stripeTokenInfo.id);
      })
      .then((data) => {
        console.warn('Payment succeeded!', data);
      })
      .catch(error => {
        console.warn('Payment failed', { error });
      })
      .finally(() => {
        this.setState({ isPaymentPending: false });
      });*/
  };

  onPressMakePayment = async () => {
    const params = {
        // mandatory
        number: this.state.number,
        expMonth: this.state.expMonth,
        expYear: this.state.expYear,
        cvc: this.state.cvc,
        // optional
        name: 'User',
        currency: 'brl',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
    }
      
    const token = await stripe.createTokenWithCard(params)
    console.log('possivel token ',token.tokenId)
    doPayment(2500, token.tokenId);
  }

  handleFieldParamsChange = (valid, params) => {
    console.log(`
      Valid: ${valid}
      Number: ${params.number || '-'}
      Month: ${params.expMonth || '-'}
      Year: ${params.expYear || '-'}
      CVC: ${params.cvc || '-'}
    `)
    this.setState({ isPaymentPending: !valid, valid, number: params.number, expMonth: params.expMonth, expYear: params.expYear, cvc: params.cvc });
  }

    isPaymentCardTextFieldFocused = () => this.paymentCardInput.isFocused()
    focusPaymentCardTextField = () => this.paymentCardInput.focus()
    blurPaymentCardTextField = () => this.paymentCardInput.blur()
    resetPaymentCardTextField = () => this.paymentCardInput.setParams({})

    render() {
        return (
        <View style={styles.container}>    
            <View style={{backgroundColor: colors.whiteColor}}>
                <Text style={{fontSize: 17, color: colors.primaryColor, fontFamily: 'Sen Bold', textAlign: 'center'}}>Cadastrar cartão de crédito</Text>
                <View style={{
                  marginTop: 25,
                      borderRadius: 11,
                      borderWidth: 2,
                      alignItems: 'center',
                      borderColor: colors.primaryColor
                  }}>
                  <Text style={{
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      fontFamily: 'Sen Regular',
                      color: colors.primaryColor,
                      backgroundColor: colors.whiteColor,
                  }}> NUM VAL CVC </Text>
                  <PaymentCardTextField
                    ref={ (ref) => {
                        this.paymentCardInput = ref;
                    }}
                    style={{width: '100%', fontSize: 17}}
                    disabled={true}
                    onParamsChange={this.handleFieldParamsChange}
                  />
                </View>
                <Button disabled={this.state.isPaymentPending} style={{width: '100%', marginTop: 20}} text="Cadastrar" onPress={this.onPressMakePayment}/>
            </View>
        </View>
        );
    }
}

const styles = {
  container: {
    backgroundColor: 'white',
    height: '100%', color: '#000',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
  }
};