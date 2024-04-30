import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native";

export default function CategorieMeniu() {
    const {params} = useRoute();
    let category = params;
    console.log('meniu: ',category) 
  return (
    <View>
      <Text>CategorieMeniu</Text>
    </View>
  )
}