import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import DishRow from '../../../components/DishRow';

export default function CategorieMeniu() {
    const { params } = useRoute();
    const navigation= useNavigation();
    const category = params;
    console.log('meniu: ', category) 
    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor: '#8B0000'}}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.image} />
                    <TouchableOpacity style={styles.button}
                      onPress={()=> navigation.goBack()}>
                          <Icon.ArrowLeft strokeWidth={3} stroke="white"  />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.categoryName}>
                        {category.name}
                    </Text>
                </View>

                <View>
                 { 
                    category.dishes.map((dish, index)=> <DishRow item={dish} key={index}/>)
                 }
                </View>
            </ScrollView>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
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
    contentContainer: {
      backgroundColor: '#b0a96d', //'#8B0000', 
      paddingTop: 10,
      paddingHorizontal: 10,
      //marginTop: 20, // Adăugat un spațiu de 20 de puncte între imagine și conținut
  },
  categoryName: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 6,
  },

});
