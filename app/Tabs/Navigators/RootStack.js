import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform, Keyboard } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Comanda from "../Screens/Comanda";
import Rezervari from "../Screens/Rezervari";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Profil from "../Screens/Profil";
import CategorieMeniu from "../Screens/CategorieMeniu";
import Cart from "../Screens/Cart";
import ConfirmareComanda from "../Screens/ConfirmareComanda";
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
                onPress={() => navigation.navigate("Main")} 
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
                onPress={() => navigation.navigate("Main")} // Modifică aici
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
                        width: windowWidth * 0.08,
                        height: windowWidth * 0.08,
                        tintColor: color,
                      }}
                    />
                  );
                },
                tabBarActiveTintColor: red_logo,
                tabBarInactiveTintColor: "#D2B48C",
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
                  bottom: Platform.OS === "ios" ? windowHeight * 0.05 : 0, // Spațiu jos
                  minHeight: 60, // Înălțimea minimă a tabbarului
                  flexDirection: "row", // Așezarea elementelor într-o singură linie
                  justifyContent: "space-around", // Distribuie spațiul liber între elementele tabbarului
                  alignItems: "center", // Alinierea elementelor pe axa verticală
                  bottom: windowHeight * 0.05, // Setăm bottom pentru iOS la o anumită valoare pentru a fi deasupra liniei
                  display: isKeyboardVisible ? "none" : "flex", // Ascunde tab bar-ul când tastatura este vizibilă
                },
                headerTransparent: true,
                headerTitle: " ",
                headerRight: () => {
                  return (
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => navigation.navigate("Profil")}
                    >
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
            >
              <Tab.Screen
                name="Comanda"
                component={Comanda}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={icons.pizza}
                      style={{
                        width: windowWidth * 0.08,
                        height: windowWidth * 0.08,
                        tintColor: color,
                        ...(Platform.OS === "ios" && {
                          marginTop: windowHeight * 0.03,
                        }),
                      }}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Rezervari"
                component={Rezervari}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={icons.reservation}
                      style={{
                        width: windowWidth * 0.08,
                        height: windowWidth * 0.08,
                        tintColor: color,
                        ...(Platform.OS === "ios" && {
                          marginTop: windowHeight * 0.03,
                        }),
                      }}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;


/*
        <Stack.Screen name="Meniu" component={CategorieMeniu} />
        <Stack.Screen
          name="Cos"
          options={{ presentation: "modal" }}
          component={Cart}
        />
        <Stack.Screen
          name="ConfirmareComanda"
          options={{ presentation: "fullScreenModal" }}
          component={ConfirmareComanda}
        />
*/