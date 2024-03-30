// index.js
import { AppRegistry } from 'react-native';
import App from './App'; // Importăm componenta App
import { name as appName } from '../app.json';

// Setăm fundalul negru pentru întreaga aplicație
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const AppWithBackground = () => (
  <View style={styles.container}>
    <App /> {/* Randăm componenta App */}
  </View>
);

AppRegistry.registerComponent(appName, () => AppWithBackground); // Înregistrăm componenta AppWithBackground
