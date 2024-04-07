import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../../../styles';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Welcome from '../Screens/Welcome';
import { ImageBackground } from 'react-native';

const Stack = createStackNavigator();
const {primary, tertiary, rems_color} = Colors;

const RootStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerStyled: {backgrounfColor: 'transparent'
                },
                headerTintColor: 'transparent',
                headerTransparent: true,
                headerLeftContainerStyle: {
                    paddingLeft: 20
                }
            }}
            initialRouteName='Login'
        >
          <Stack.Screen
            name="Login"
            component={Login}
            // options={{
            //   headerTransparent: true,
            //   headerTitleStyle: {
            //     color: "transparent", // Face titlul transparent
            //   },
            // }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default RootStack;