import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ComandaScreen from "./Screens/Comanda";
import RezervariScreen from "./Screens/Rezervari";
import { Image, View } from "react-native";
import icons from "./../../constants/icons";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
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
          headerTitle: ' '
        })}
        tabBarStyle={{
          display: "flex",
        }}
      >
        <Tab.Screen name="Comanda" component={ComandaScreen} />
        <Tab.Screen name="Rezervari" component={RezervariScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
