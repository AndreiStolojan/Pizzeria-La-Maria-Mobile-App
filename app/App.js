import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './Tabs/Navigation';
import { useState } from 'react';
import RootStack from './Tabs/Navigators/RootStack';
import Login from './Tabs/Screens/Login';
import Profile from './Tabs/Screens/Profil';
import { CredentialsContext } from './Tabs/Components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'

export default function App() {
  const [appReady, setAppReady] = useState(false)
  const [storedCredentials,setStoredCredentials] = useState("")
  const checkLoginCredentials = () => {
    AsyncStorage.getItem('AppCredentials').then((result) => {
      if(result !== null){
        setStoredCredentials(JSON.parse(result))
      } else{
        setStoredCredentials(null)
      }
    }).catch(error => console.log(error))
  }
  
  if(!appReady)
  {
    return(
      <AppLoading 
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <RootStack />
  );
}

