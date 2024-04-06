import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';


const { height, width } = Dimensions.get('window');

function Comanda() {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <ImageBackground source={require('../../../assets/images/360_F_563062991_F2AEcsJ0dwAkIx07k2su58MAQTXi3rDU.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text>Da ma da pagina de comenzi</Text>
          {/* Aici poți adăuga mai mult conținut */}
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
});

export default Comanda;
