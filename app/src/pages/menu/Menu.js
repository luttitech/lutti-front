import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../colors';
import Home from '../home/Home';
import Payments from '../payments/Payments';
import Scan from '../scan/Scan';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <>
    <View style={{width: '100%', height: 2, backgroundColor: colors.headerColor}} />
    <View style={{ flexDirection: 'row', backgroundColor: colors.whiteColor }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const source = 
        (label === 'Inicio' && isFocused) ? require('../../imgs/main.png') :
        (label === 'Inicio' && !isFocused) ? require('../../imgs/mainGray.png') :
        (label === 'Escanear' && isFocused ) ? require('../../imgs/qr.png') :
        (label === 'Escanear' && !isFocused ) ? require('../../imgs/qrGray.png') :
        (label === 'Pagamento' && isFocused ) ? require('../../imgs/card.png') :
        require('../../imgs/cardGray.png')

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image style={{height: 24, width: 24, margin: 7}} source={source} />
            <Text style={{ textAlign: 'center', fontSize: 11, marginBottom: 5, marginTop: -5, color: isFocused ? colors.secondaryColor : "#c8c8c8" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </>
  );
}

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen key={1} name="Inicio" component={Home} />
        <Tab.Screen key={2} name="Escanear" component={Scan} />
        <Tab.Screen key={3} name="Pagamento" component={Payments} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}