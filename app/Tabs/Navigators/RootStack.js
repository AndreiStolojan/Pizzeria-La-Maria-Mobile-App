import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Comanda from "../Screens/Comanda";
import Rezervari from "../Screens/Rezervari";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/Welcome";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importă componenta Icon
import { Image, TouchableOpacity } from "react-native";
import icons from "../../../constants/icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="LoginStack" component={LoginStack} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Comanda") {
                    iconName = focused ? icons.search : icons.search;
                  } else if (route.name === "Rezervari") {
                    iconName = focused ? icons.heart : icons.heart;
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
                headerTransparent: true,
                headerTitle: " ",
                headerRight: () => {
                  // Butonul din partea dreaptă sus
                  return (
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => navigation.navigate("LoginStack")}
                    >
                      {/* Utilizează componenta Icon */}
                      <Icon name="user" size={24} color="black" />
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
