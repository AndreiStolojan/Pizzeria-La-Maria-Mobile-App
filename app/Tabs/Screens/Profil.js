import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { height, width } = Dimensions.get('window');

function Comanda() {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <ImageBackground style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.text}>Da, mă duc la pagina de comenzi</Text>
        </View>
      </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Pentru a acoperi întreaga suprafață a ecranului
    justifyContent: 'center',
    width: width,
    height: height,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Culoare textului
  },
});

export default Comanda;
