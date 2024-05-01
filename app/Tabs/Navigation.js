import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Comanda from "./Screens/Comanda";
import Rezervari from "./Screens/Rezervari";
import Login from './Screens/Login'
import { useState } from "react";
import { Image } from "react-native";
import icons from "./../../constants/icons";
import CategorieMeniu from "./Screens/CategorieMeniu";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

/*
function Navigation() {
  const [isHeartPressed, setIsHeartPressed] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Comanda") {
              iconName = focused ? icons.search : icons.search;
            } else if (route.name === "Rezervari") {
              iconName = isHeartPressed ? icons.heart : icons.heart;
            }else if(route.name === "Profil"){
              iconName = focused? icons.menu : icons.menu;
            }

            return (
              <Image
                source={iconName}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        })}
        tabBarStyle={{
          // Mutăm stilurile de tab în screenOptions
          display: "flex",
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
        <Tab.Screen name="Profil" component={Login} />
        
      </Tab.Navigator>
    
    </NavigationContainer>
  );
}
*/

function Navigation() {
  const [isHeartPressed, setIsHeartPressed] = useState(false);

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Comanda") {
              iconName = focused ? icons.search : icons.search;
            } else if (route.name === "Rezervari") {
              iconName = isHeartPressed ? icons.heart : icons.heart;
            }else if(route.name === "Profil"){
              iconName = focused? icons.menu : icons.menu;
            }

            return (
              <Image
                source={iconName}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 17,
            fontWeight: "bold",
          },
        })}
        tabBarStyle={{
          // Mutăm stilurile de tab în screenOptions
          display: "flex",
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
        <Tab.Screen name="Profil" component={Login} />
        
      </Tab.Navigator>
    
    
  );
}

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen          
            name="BottomNavigator"
            component={Navigation}
            //options={{ headerShown: false }}
            />
        <Stack.Screen name="Meniu" component={CategorieMeniu} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
