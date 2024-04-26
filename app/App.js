import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './Tabs/Navigation';
import { useState } from 'react';
import RootStack from './Tabs/Navigators/RootStack';
import Login from './Tabs/Screens/Login';
import Profile from './Tabs/Screens/Profil';
import { CredentialsContext } from './Tabs/Components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  return (
    <RootStack />
  );
}

