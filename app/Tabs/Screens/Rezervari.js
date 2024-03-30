// Rezervari.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

function Rezervari() {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Sunteți pe pagina de facut rezervări</Text>
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
    padding: 20,
  },
});

export default Rezervari;
