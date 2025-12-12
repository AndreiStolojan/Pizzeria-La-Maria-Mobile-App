import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Platform, Keyboard } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Comanda from "../Screens/Comanda";
import Rezervari from "../Screens/Rezervari";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Profil from "../Screens/Profil";
import CategorieMeniu from "../Screens/CategorieMeniu";
import Cart from "../Screens/Cart";
import ConfirmareComanda from "../Screens/ConfirmareComanda";
import QRScanner from '../Screens/QRScanner';
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { Image, TouchableOpacity } from "react-native";
import icons from "../../../constants/icons";
import { Colors } from "../../../styles";

import { auth } from "../../../firebase";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { red_logo } = Colors;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RootStack = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

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
      unsubscribe();
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
            paddingLeft: windowWidth * 0.05, 
          },
          headerRightContainerStyle: { paddingRight: windowWidth * 0.05 }, 
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
                onPress={() => navigation.navigate("Main")} 
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
                    iconName = icons.pizza; 
                  } else if (route.name === "Rezervari") {
                    iconName = icons.reservation; 
                  } else if (route.name === "QRScanner") {
                    // Aici poți pune o iconiță diferită, de ex. camera sau qr
                    // Momentan am lăsat reservation ca să nu crape dacă nu ai alta
                    iconName = icons.reservation; 
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
                  backgroundColor: "black", 
                  borderTopWidth: 0,
                  position: "absolute", 
                  elevation: 0, 
                  borderTopLeftRadius: 40, 
                  borderTopRightRadius: 40, 
                  borderBottomLeftRadius: 40, 
                  borderBottomRightRadius: 40,
                  left: 30, 
                  right: 30, 
                  bottom: Platform.OS === "ios" ? windowHeight * 0.05 : 0, 
                  minHeight: 60, 
                  flexDirection: "row", 
                  justifyContent: "space-around", 
                  alignItems: "center", 
                  bottom: windowHeight * 0.05, 
                  display: isKeyboardVisible ? "none" : "flex", 
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
              
              {/* Afișăm Tab-ul de Scanner DOAR dacă userul este logat */}
              {user && (
                <Tab.Screen
                  name="QRScanner"
                  component={QRScanner}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      // Aici ar fi ideal să pui o iconiță de tip QR sau Cameră
                      // Folosesc <Icon> din vector-icons pentru a o distinge de rezervări
                      <Image
                      source={icons.qr}
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
              )}
            </Tab.Navigator>
          )}
        </Stack.Screen>
        
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
        
        {/* AM ȘTERS Stack.Screen name="QRScanner" DE AICI PENTRU A EVITA DUPLICAREA */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
