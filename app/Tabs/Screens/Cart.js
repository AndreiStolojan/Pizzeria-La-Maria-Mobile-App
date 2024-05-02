import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { categories } from '../../../constants'
import { useNavigation} from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../../../slices/restaurantSlice';
import { emptyCart, removeFromCart, selectCartItems, selectCartTotal } from '../../../slices/cartSlice';

export default function Cart() {
    //const products = categories[0];
    const products = useSelector(selectRestaurant);
    const navigation= useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({})
    const dispatch = useDispatch();
    const cancelOrder = ()=>{
        navigation.navigate('ConfirmareComanda')
        dispatch(emptyCart());
    } 
    useEffect(()=>{
        const items = cartItems.reduce((group, item)=> {
            if(group[item.id]){
                group[item.id].push(item);
            }
            else{
                group[item.id] = [item];
            }
            return group;
        },{})
        setGroupedItems(items);
    },[cartItems])
  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}
                    onPress={()=> navigation.goBack()}>
                <Icon.ArrowLeft strokeWidth={3} stroke="white"  />
            </TouchableOpacity>
            <View>
                <Text style={{color: 'white', alignSelf: 'center', padding: 60, fontSize: 26}}>
                    Comanda ta
                </Text>
            </View>
        </View>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {//categories.map(category => (
            Object.entries(groupedItems).map(([key, items]) => {
                let dish = items[0];
                return (
                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 30, marginVertical: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#b0a96d', padding: 5 }}>
                      {items.length} x
                    </Text>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={dish.image} />
                    <Text style={{ flex: 1, fontWeight: 'bold', color: 'black', marginHorizontal: 10 }}>
                      {dish.name}
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {dish.price}lei
                    </Text>
                    <TouchableOpacity
                        onPress={()=> dispatch(removeFromCart({id: dish.id}))}
                        style={{ marginLeft: 10, padding: 8, backgroundColor: '#b0a96d', borderRadius: 30 }}>
                        <Icon.Minus strokeWidth={2} height={10} width={10} stroke={'white'} />
                    </TouchableOpacity>
                  </View>
                )
    
            })
        }
    </ScrollView>

        <View style={{padding: 6, paddingHorizontal: 8, paddingVertical: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#b0a96d'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, marginHorizontal: 30}}>
                <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                <Text style={{color: 'white', fontSize: 18}}>{cartTotal}lei</Text>
            </View>

            <View style={{marginHorizontal: 30, marginTop: 15}}>
                <TouchableOpacity
                    onPress={cancelOrder} 
                    style={{backgroundColor: 'white', padding: 15, borderRadius:20}}>
                    <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 15}}>Finalizeză comanda</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //position: 'relative',
        backgroundColor: '#8B0000',
    },
    buttonContainer: {
      position: 'relative',
      
    },
    button: {
      position: 'absolute',
      top: 30,
      left: 6,
      backgroundColor: '#b0a96d',
      padding: 8,
      borderRadius: 999, // A value larger than half of the button's width or height to make it fully rounded
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
});