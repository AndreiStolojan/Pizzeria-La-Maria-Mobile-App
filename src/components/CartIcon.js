import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation} from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/slices/cartSlice';

export default function CartIcon() {
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTottal = useSelector(selectCartTotal);
    if(!cartItems.length) return;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={()=> navigation.navigate("Cos")}
        style={styles.button}>
        <View style={styles.iconContainer}>
          <Text style={styles.text}>
            {cartItems.length}
          </Text>
        </View>
        <Text style={styles.text}>
          Vezi comanda
        </Text>
        <Text style={styles.text}>
          {cartTottal}lei
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '90%',
    //alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    marginHorizontal: 20,
    bottom: 20,

    
  },
  button: {
    backgroundColor: '#b0a96d',
    borderRadius: 20,
    flexDirection: 'row', // Așezarea elementelor într-un singur rând
    alignItems: 'center', // Alinierea elementelor pe axa verticală
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 99,
    marginRight: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
