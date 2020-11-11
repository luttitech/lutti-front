import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { login, register } from './api.js';
import { storeData, getData } from './storage.js';

import Welcome from './pages/welcome/Welcome';
import Begin from './pages/begin/Begin';
import Terms from './pages/terms/Terms';
import Register from './pages/register/Register';
import ConfirmCellphone from './pages/confirm-cellphone/ConfirmCellphone';
import Menu from './pages/menu/Menu';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

import colors from './colors';
import Loading from './generic-components/Loading';

function SplashScreen() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primaryColor}}>
        <Loading/>
      </View>
    );
  }

function Routes({ navigation }) {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
    
      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await getData('user');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);
    
      const authContext = React.useMemo(
        () => ({
          signIn: async data => {
            var user = await login(data);
            if(Object.keys(user.data).length > 0){
                var key = Object.keys(user.data);
                console.log("data ",user.data)
                console.log("key ",key)
                var userData = user.data[key];
                await storeData("user",userData);
                dispatch({ type: 'SIGN_IN', token: userData });
                return true
            }else{
                return null
            }
          },
          signOut: async () => { 
                await storeData("user",null);
              dispatch({ type: 'SIGN_OUT' }) 
            },
          signUp: async data => {
            var result = await register(data);
            if(result != null){
                console.log("data ",data)
                await storeData("user",data);
                dispatch({ type: 'SIGN_IN', token: data });
                return true
            }else{
                return null
            }
          },
        }),
        []
      );

    return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <Stack.Navigator>
            {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen 
                    name="WaitingBlack" 
                    component={SplashScreen} 
                    options={{
                        headerShown: false
                    }}
                />
            ) :
            state.userToken == null ? (
                <>
                <Stack.Screen 
                    name="Home" 
                    component={Welcome} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Begin" 
                    component={Begin} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Terms" 
                    component={Terms} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="ConfirmCellphone" 
                    component={ConfirmCellphone} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={{
                        headerShown: false
                    }}
                />
                </>
            ) : (
                <>
                <Stack.Screen 
                    name="Menu" 
                    component={Menu} 
                    options={{
                        headerShown: false
                    }} />
                </>
            )}
            
            </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>
    );
}

export default Routes;