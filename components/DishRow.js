import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function DishRow(props) {
    const { item } = props;
  return (
    
    <View style={styles.dish}
    >
        <Image
        source={item.image} // Schimbă imaginea în funcție de băutura curentă
        style={styles.itemImage}
        />
        <View style={styles.itemDetails}
        >
            <Text style={styles.itemName}
            >{item.name}</Text>
            <Text style={styles.itemPrice}
            >{item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => selecteazaInCos(bautura)} style={styles.selecteazaInCosButton}
        >
                <Text style={styles.selecteazaInCosButtonText}
                >Comanda</Text>
        </TouchableOpacity>
    </View>
    
  )
}


const styles = StyleSheet.create({
    dish: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10, 
      marginHorizontal: 10, 
      backgroundColor: 'white',//'#8B0000',//'rgba(255, 255, 255, 0.5)', // Un background semi-transparent pentru fiecare element
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
      backgroundColor: '#b0a96d',//'#4287f5', // Culoarea butonului de adăugare în coș
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    selecteazaInCosButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
