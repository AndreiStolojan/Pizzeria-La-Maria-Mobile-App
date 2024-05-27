/*<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const existingReservations = await AsyncStorage.getItem('reservations');
                setReservations(existingReservations ? JSON.parse(existingReservations) : []);
            } catch (error) {
                console.error('Eroare la preluarea rezervărilor:', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rezervările Tale</Text>
            <FlatList
                data={reservations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.persons} persoane</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      marginTop:150,
  },
  title: {
      fontSize: 24,
      marginBottom: 20,
  },
  item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
});

export default ReservationList;*/
//=======*/
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
>>>>>>> comanda_feature



/*<<<<<<< HEAD
export default ReservationList;
=======
export default Comanda;
*/


import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Categories from '../../../components/categories';

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
    
    <ScrollView>
      <Categories>
        
      </Categories>
    </ScrollView>
    /*aici<View style={styles.container}>
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
    </View>aici*/

  );
};

export default MenuBauturi;
