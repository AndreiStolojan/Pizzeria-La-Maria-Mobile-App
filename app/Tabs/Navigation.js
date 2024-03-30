import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Comanda from './Screens/Comanda';
import Rezervari from './Screens/Rezervari';
import { useState } from 'react'; 
import { Image } from 'react-native';
import icons from './../../constants/icons'; 

const Tab = createBottomTabNavigator();

function Navigation() {
  const [isHeartPressed, setIsHeartPressed] = useState(false); 

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Comanda') {
              iconName = focused ? icons.search : icons.search;
            } else if (route.name === 'Rezervari') {
              iconName = isHeartPressed ? icons.heartRed : icons.heart; 
            }

            return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
          },
          tabBarActiveTintColor: 'red', 
          tabBarInactiveTintColor: 'black', 
          tabBarLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
        })}
        tabBarStyle={{ // Mutăm stilurile de tab în screenOptions
          display: 'flex',
        }}
      >
        <Tab.Screen name="Comanda" component={Comanda} />
        <Tab.Screen
          name="Rezervari"
          component={Rezervari}
          listeners={{
            tabPress: () => {
              setIsHeartPressed(true); 
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
