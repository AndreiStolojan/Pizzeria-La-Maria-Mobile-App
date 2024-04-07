import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './Tabs/Navigation';

import RootStack from './Tabs/Navigators/RootStack';


export default function App() {
  return (
    <RootStack />
  );
}

