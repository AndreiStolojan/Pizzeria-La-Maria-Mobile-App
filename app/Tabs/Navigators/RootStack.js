import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Comanda from "../Screens/Comanda";
import Rezervari from "../Screens/Rezervari";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/Welcome";
import Profil from "../Screens/Profil";
import Icon from 'react-native-vector-icons/MaterialIcons';; // Importă componenta Icon
import { Image, TouchableOpacity } from "react-native";
import icons from "../../../constants/icons";
import { Colors } from '../../../styles';
// import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { red_logo } = Colors;

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyled: { backgroundColor: "transparent" },
          headerTintColor: "transparent",
          headerTransparent: true,
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: { paddingRight: 20 }, // Aliniază butonul în partea dreaptă
        }}
        initialRouteName="Main"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Comanda") {
                    iconName = focused ? icons.pizza : icons.pizza; // Iconita pentru Comanda
                  } else if (route.name === "Rezervari") {
                    iconName = focused ? icons.reservation : icons.reservation; // Iconita pentru Rezervari
                  }

                  
                  return (
                    <Image
                      source={iconName}
                      style={{ width: 33, height: 33, tintColor: color }}
                    />
                  );
                },
                tabBarActiveTintColor: red_logo,
                tabBarInactiveTintColor: "black",
                tabBarLabelStyle: {
                  display: "none",
                },
                
                tabBarStyle: {
                  backgroundColor: "#ffffff", // Setează culoarea fundalului barei de navigare a tabului
                  borderTopWidth: 0, // Elimină linia de sus a barei de navigare a tabului
                  position: "absolute", // Poziționează bara de navigare deasupra conținutului
                  left: 0,
                  right: 0,
                  bottom: 0,
                  elevation: 0, // Elimină umbra Android
                },
                headerTransparent: true,
                headerTitle: " ",
                headerRight: () => {
                  // Butonul din partea dreaptă sus
                  return (
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      {/* Utilizează componenta Icon */}
                      <Icon name="person" size={33} color="black" style={{marginTop: 15}} />

                    </TouchableOpacity>
                  );
                },
              })}
              tabBarStyle={{
                display: "flex",
              }}
            >
              <Tab.Screen name="Comanda" component={Comanda} />
              <Tab.Screen name="Rezervari" component={Rezervari} />
              <Tab.Screen name="Profil" component={Profil} />
              
              
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RootStack;
