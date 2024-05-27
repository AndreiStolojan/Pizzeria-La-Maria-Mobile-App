import { View, Text, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useNavigation} from "@react-navigation/native";

export default function ConfirmareComanda() {
    const navigation = useNavigation();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Comanda');
        }, 2500);

        // Cleanup function to clear the timer if the component unmounts before 3 seconds
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../assets/images/comanda.gif')} />
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Comandă finalizată</Text>
        </View>
    );
}
