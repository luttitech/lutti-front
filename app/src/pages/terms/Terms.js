import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../../colors';

const primaryColor = "#2C2C2C";
const secondaryColor = "#FFBC00";

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var { navigation } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.whiteColor}}>
          <View style={{backgroundColor: colors.headerColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 40}}>
                <Image style={{width: 11.43, height: 20}} source={require('../../imgs/arrowBack.png')} />
            </TouchableOpacity>
            <Text style={{flex: 1, textAlign: 'center', marginRight: 40, fontSize: 15, fontFamily: 'Sen Bold', color: colors.primaryColor}} >Termos de Uso</Text>
          </View>

          <ScrollView style={{paddingLeft: 30, paddingRight: 30}}>
              <Text style={{color: colors.secondaryColor, textAlign: 'center', marginTop: 25, fontSize: 22, fontFamily: 'Oswald Regular'}}>TERMOS E CONDIÇÕES</Text>
              <Text style={{fontFamily: 'Sen Bold', textAlign: 'center', marginTop: 10, color: primaryColor, fontSize: 15}}>Leia com atenção os nossos termos de uso. Ao se cadastrar no LuttiApp você ESTÁ DE ACORDO COM AS CONDIÇÕES E TERMOS do aplicativo e do funcionamento das nossas unidades. Note que a recusa destes Termos impedirá que você faça uso do nosso app, e consequentemente, das nossas unidades.</Text>
              
              <Text style={{marginTop: 15, fontFamily: 'Sen Regular', fontSize: 13}}>Lutti é uma loja express no formato de varejo de vizinhança instalada em unidades compactas totalmente autônomas, funcionando 24 horas e oferecendo sempre itens de primeira necessidade e de alta rotatividade. O Lutti não tem vendedores, nem caixas, você acessa e finaliza a compra na eclusa de saída através da forma de pagamento cadastrada previamente no aplicativo.</Text>
              <Text style={{marginTop: 15, fontFamily: 'Sen Regular', fontSize: 13}}>Reforçamos que sua compra só pode ser finalizada na eclusa de saída da unidade Lutti. Esse aplicativo funciona como integração virtual para que você possa entrar na unidade, efetuar o pagamento através do cartão cadastrado no aplicativo e sair, além de conferir os produtos disponíveis nas unidades, realizar lista de compras, acompanhar seu histórico e receber ofertas personalizadas.</Text>
              <Text style={{marginTop: 15, fontFamily: 'Sen Regular', fontSize: 13}}>1. Modificações dos Termos de Uso O presente TERMO DE USO poderá, a qualquer momento, ter seu conteúdo, ou parte dele, modificados para adequações e inserções sem notificação prévia, tudo com vistas ao aprimoramento das operações. Uma vez atualizado, as novas condições precisarão ter o seu aceite novamente, sendo possível você manifestar oposição a quaisquer dos termos modificados. Não aceitando os novos termos no app resultará no cancelamento do seu cadastro.</Text>
              <Text style={{marginTop: 15, fontFamily: 'Sen Regular', fontSize: 13}}>2. Cadastro Para utilizar o aplicativo você deverá prestar as informações exigidas no CADASTRO, assumindo integralmente a responsabilidade (inclusive cível e criminal) pela exatidão e veracidade das informações fornecidas, que estará sujeito a análise a qualquer momento pelo Lutti. Em caso de informações incorretas, inverídicas ou não confirmadas, o Lutti se reserva no direito de não concluir o cadastramento em curso ou, ainda, de bloquear o cadastro já existente, o impedindo de utilizar o aplicativo até que, a critério do Lutti, a situação de anomalia esteja regularizada.</Text>
              <Text style={{marginTop: 15, fontFamily: 'Sen Regular', fontSize: 13, marginBottom: 30}}>Ao efetuar, com sucesso o seu cadastro, você terá acesso a vitrine virtual das unidades Lutti por meio de login e senha, dados esses que você se compromete a não divulgar a terceiros, ficando sob sua exclusiva responsabilidade qualquer solicitação que seja feita com o uso de login e senha de sua titularidade. Caso nosso sistema verifique risco de segurança na sua conta, ela poderá ser suspensa.</Text>
          </ScrollView>
      </View>
    );
  }
}

export default Terms;
