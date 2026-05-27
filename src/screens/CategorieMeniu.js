import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../store/slices/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategorieMeniu() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const category = params;
    const dispatch = useDispatch();

    useEffect(() => {
        if (category && category.id) {
            dispatch(setRestaurant({ ...category }));
        }
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={category.image} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.categoryName}>
                        {category.name}
                    </Text>
                </View>

                <View>
                    {category.dishes.map((dish, index) => (
                        <DishRow item={dish} key={index} />
                    ))}
                </View>
            </ScrollView>
            <CartIcon />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#8B0000',
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#8B0000',
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
        borderRadius: 999,
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
        backgroundColor: '#b0a96d',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    categoryName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 6,
    },
});

