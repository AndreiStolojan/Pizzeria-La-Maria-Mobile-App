import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './Tabs/Navigation';
import { Provider } from 'react-redux'
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
        <NavigationTab />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
  },
});