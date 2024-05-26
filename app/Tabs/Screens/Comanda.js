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

export default ReservationList;
