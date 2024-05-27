import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Categories from '../../../components/categories';

const MenuBauturi = () => {
  const selecteazaInCos = (bautura) => {
    console.log(`Băutura "${bautura.nume}" a fost adăugată în coș.`);
  };

  const bauturi = [
    { nume: 'Cafea', pret: '5 Lei' },
    { nume: 'Ceai', pret: '4 Lei' },
    // Adaugă aici alte băuturi
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Categories>
            {bauturi.map((bautura, index) => (
              <View style={styles.item} key={index}>
                <Image
                  source={require('../../../assets/images/cafea.jpg')} // Schimbă imaginea în funcție de băutura curentă
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{bautura.nume}</Text>
                  <Text style={styles.itemPrice}>{bautura.pret}</Text>
                </View>
                <TouchableOpacity onPress={() => selecteazaInCos(bautura)} style={styles.selecteazaInCosButton}>
                  <Text style={styles.selecteazaInCosButtonText}>Comanda</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Categories>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000', // Setează fundalul roșu pentru întregul ecran
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#8B0000', // Setează fundalul roșu pentru ScrollView
    paddingBottom: 80, // Adăugăm padding în partea de jos pentru a permite scroll suplimentar
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9', // Setează o culoare de fundal pentru fiecare item
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  selecteazaInCosButton: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
  },
  selecteazaInCosButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuBauturi;
