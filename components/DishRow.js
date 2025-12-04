import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemById } from '../slices/cartSlice';

export default function DishRow(props) {
    const { item } = props;
    const cartItem = useSelector(state => selectCartItemById(state, item.id));
    const dispatch = useDispatch();
    const handleIncrease = () => {
      dispatch(addToCart({...item}));
    }
    const handleDecrease = () => {
      dispatch(removeFromCart({id: item.id}));
    }
  return (
    
    <View style={styles.dish}
    >
        <Image
        source={item.image}
        style={styles.itemImage}
        />
        <View style={styles.itemDetails}
        >
            <Text style={styles.itemName}
            >{item.name}</Text>
            <Text style={styles.itemPrice}
            >{item.price}lei</Text>
        </View>
        <TouchableOpacity 
          onPress={handleDecrease}
          disabled={!cartItem}
          style={styles.selecteazaInCosButton}>
          <Icon.Minus strokeWidth={2} height={15} width={15} stroke={'white'}/>
        </TouchableOpacity>

        <Text style={{marginHorizontal: 6,fontSize: 16}}>
          {cartItem?.quantity || 0}
        </Text>

        <TouchableOpacity 
          onPress={handleIncrease}
          style={styles.selecteazaInCosButton}>
          <Icon.Plus strokeWidth={2} height={15} width={15} stroke={'white'}/>
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
      paddingVertical: 6,
      paddingHorizontal: 6,
      borderRadius: 20,
    },
    selecteazaInCosButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
