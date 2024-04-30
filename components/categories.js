import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { categories } from '../constants'
import { useNavigation } from '@react-navigation/native';

export default function Categories({item}) {
    const navigation = useNavigation();
  return (
    
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {
            categories.map((category, index) => {
                return (
                <View key={index} style={styles.categoryItem}>
                    <View style={styles.categoryContent}>
                    <Image style={styles.categoryImage} source={category.image} />
                    <TouchableOpacity onPress={()=> navigation.navigate("Meniu",{...category})}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                )
            })
            }
        </ScrollView>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //marginTop: 50,
    backgroundColor: '#8B0000',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  categoryItem: {
    width: '90%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#b0a96d',//'#FFCC33',//'#f0f0f0',
    overflow: 'hidden',
  },
  categoryContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%', 
    height: 200,
  },
  categoryText: {
    fontSize: 24,
    paddingVertical: 10,
    color: 'white',
  },
});