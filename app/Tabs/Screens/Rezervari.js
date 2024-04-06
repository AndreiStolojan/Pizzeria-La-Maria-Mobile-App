import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

function Rezervari() {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Da ma da pagina de rezervari</Text>
        {/* Aici poți adăuga mai mult conținut */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height, // Ocupă întreaga înălțime a ecranului
    width: width, // Ocupă întreaga lățime a ecranului
    padding: 20,
  },
});

export default Rezervari;
