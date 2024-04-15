import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../../../styles';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Welcome from '../Screens/Welcome';


const Stack = createStackNavigator();
const {primary, tertiary, rems_color} = Colors;

const RootStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerStyled: {backgroundColor: 'transparent'
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
          <Stack.Screen name="Welcome" component={Welcome} options={{
              headerTransparent: true,
              headerTitleStyle: {
                color: "transparent", // Face titlul transparent
              },
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default RootStack;