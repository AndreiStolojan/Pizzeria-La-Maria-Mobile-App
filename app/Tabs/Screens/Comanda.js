// Comanda.js

/*import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

function Comanda() {
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Da ma da pagina de comenzi</Text>
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

export default Comanda;
*/

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const MenuBauturi = () => {
  // Funcție pentru a gestiona selectarea unei băuturi
  const selecteazaInCos = (bautura) => {
    // Implementează logica ta pentru adăugarea în coș
    console.log(`Băutura "${bautura.nume}" a fost adăugată în coș.`);
  };

  // Lista de băuturi (poți folosi și un array de obiecte pentru a gestiona informații suplimentare despre fiecare băutură)
  const bauturi = [
    { nume: 'Cafea', pret: '5 Lei' },
    { nume: 'Ceai', pret: '4 Lei' },
    // Adaugă aici alte băuturi
  ];

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <ScrollView style={styles.scrollView}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#006400', // Verde închis
    zIndex: -1, // asigură-te că fundalul este în spatele conținutului
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',//'rgba(255, 255, 255, 0.5)', // Un background semi-transparent pentru fiecare element
    padding: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
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
    backgroundColor: 'green',//'#4287f5', // Culoarea butonului de adăugare în coș
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  selecteazaInCosButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuBauturi;
