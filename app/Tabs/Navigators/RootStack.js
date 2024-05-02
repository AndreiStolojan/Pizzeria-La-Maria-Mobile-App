import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Comanda from "../Screens/Comanda";
import Rezervari from "../Screens/Rezervari";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/Welcome";
import Profil from "../Screens/Profil";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importă componenta Icon
import { Image, TouchableOpacity } from "react-native";
import icons from "../../../constants/icons";
import { Colors } from "../../../styles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { red_logo } = Colors;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RootStack = () => {
  const headerLeftPadding = windowWidth * 0.05;
  const headerRightPadding = windowWidth * 0.05;
  const tabBarIconSize = windowWidth * 0.1;
  const tabBarIconMarginTop = windowWidth * 0.07;
  const tabBarStyleLeftRightPadding = windowWidth * 0.1;
  const tabBarStyleBottomPadding = windowWidth * 0.08;
  const tabBarStyleMinHeight = windowHeight * 0.08;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyled: { backgroundColor: "transparent" },
          headerTintColor: "transparent",
          headerTransparent: true,
          headerLeftContainerStyle: {
            paddingLeft: windowWidth * 0.05, // Folosește o dimensiune relativă
          },
          headerRightContainerStyle: { paddingRight: windowWidth * 0.05 }, // Folosește o dimensiune relativă
        }}
        initialRouteName="Main"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={33} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={33} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Profil"
          component={Profil}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={33} color="white" />
              </TouchableOpacity>
            ),
          })}
        />

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
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: color,
                        marginTop: 25,
                      }}
                    />
                  );
                },
                tabBarActiveTintColor: red_logo,
                tabBarInactiveTintColor: "white",
                tabBarLabelStyle: {
                  display: "none",
                },

                tabBarStyle: {
                  backgroundColor: "black", // Setează culoarea fundalului barei de navigare a tabului
                  borderTopWidth: 0,
                  position: "absolute", // Poziționează bara de navigare deasupra conținutului
                  elevation: 0, // Elimină umbra Android
                  borderTopLeftRadius: 40, // Rotunjirea colțurilor stânga-sus
                  borderTopRightRadius: 40, // Rotunjirea colțurilor dreapta-sus
                  borderBottomLeftRadius: 40, // Rotunjirea colțurilor din partea de jos
                  borderBottomRightRadius: 40,
                  left: 30, // Spațiu la stânga
                  right: 30, // Spațiu la dreapta
                  bottom: 27, // Spațiu jos
                  minHeight: 80, // Înălțimea minimă a tabbarului
                  flexDirection: "row", // Așezarea elementelor într-o singură linie
                  justifyContent: "space-around", // Distribuie spațiul liber între elementele tabbarului
                  alignItems: "center", // Alinierea elementelor pe axa verticală
                },

                headerTransparent: true,
                headerTitle: " ",
                headerRight: () => {
                  // Butonul din partea dreaptă sus
                  return (
                   
                      <TouchableOpacity
                        style={{ marginRight: 20 }}
                        onPress={() => navigation.navigate("Profil")}
                      >
                        {/* Utilizează componenta Icon */}
                        <Icon
                          name="person"
                          size={33}
                          color="black"
                          style={{ marginTop: 15 }}
                        />
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
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
