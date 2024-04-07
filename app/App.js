import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './Tabs/Navigation';
import Login from './Tabs/Screens/Login';
import SignUp from './Tabs/Screens/SignUp';
import Welcome from './Tabs/Screens/Welcome'

export default function App() {
  return (
    <SignUp />
  );
}

