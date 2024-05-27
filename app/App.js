import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './Tabs/Navigators/RootStack';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
        <RootStack />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
