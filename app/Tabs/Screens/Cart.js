import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Modal, TextInput } from 'react-native';
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from '../../../slices/restaurantSlice';
import { emptyCart, removeFromCart, selectCartItems, selectCartTotal } from '../../../slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
    const products = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardExpiry, setNewCardExpiry] = useState('');
    const [newCardCVC, setNewCardCVC] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item);
            } else {
                group[item.id] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
    }, [cartItems]);

    useEffect(() => {
        const loadCards = async () => {
            const storedCards = await AsyncStorage.getItem('savedCards');
            if (storedCards) {
                setSavedCards(JSON.parse(storedCards));
            }
        };
        loadCards();
    }, []);

    const handlePayment = () => {
        if (selectedCard === null) {
            Alert.alert('Eroare', 'Te rog selectează un card pentru plată.');
            return;
        }
    
        const selectedCardDetails = savedCards[selectedCard];
        if (selectedCardDetails.balance < cartTotal) {
            Alert.alert('Fonduri insuficiente', 'Fondurile disponibile pe acest card nu sunt suficiente pentru a finaliza plata.');
            return;
        }
    
        
        const updatedCards = [...savedCards];
        updatedCards[selectedCard].balance -= cartTotal;
        setSavedCards(updatedCards);
        AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));

        
        Alert.alert(
            "Plata reușită",
            `Plata de ${cartTotal} lei a fost efectuată cu succes cu cardul **** **** **** ${selectedCardDetails.number.slice(-4)}!`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(emptyCart());
                        navigation.navigate('ConfirmareComanda');
                    }
                }
            ]
        );
    };
    
    const handleAddCard = async () => {
        if (!newCardNumber || !newCardExpiry || !newCardCVC || !initialBalance) {
            Alert.alert('Eroare', 'Te rog completează toate câmpurile pentru a adăuga un card nou.');
            return;
        }

        const newCard = {
            number: newCardNumber,
            expiry: newCardExpiry,
            cvc: newCardCVC,
            balance: parseFloat(initialBalance),
        };
        const updatedCards = [...savedCards, newCard];
        setSavedCards(updatedCards);
        await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
        setIsModalVisible(false);
        setNewCardNumber('');
        setNewCardExpiry('');
        setNewCardCVC('');
        setInitialBalance('');
    };

    const handleDeleteCard = async (index) => {
        const updatedCards = [...savedCards];
        updatedCards.splice(index, 1);
        setSavedCards(updatedCards);
        await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text style={{ color: 'white', alignSelf: 'center', padding: 60, fontSize: 26 }}>
                        Comanda ta
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                {Object.entries(groupedItems).map(([key, items]) => {
                    let dish = items[0];
                    return (
                        <View key={key} style={styles.itemContainer}>
                            <Text style={styles.itemCount}>{items.length} x</Text>
                            <Image style={styles.itemImage} source={dish.image} />
                            <Text style={styles.itemName}>{dish.name}</Text>
                            <Text style={styles.itemPrice}>{dish.price}lei</Text>
                            <TouchableOpacity
                                onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                                style={styles.removeItemButton}>
                                <Icon.Minus strokeWidth={2} height={10} width={10} stroke={'white'} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>{cartTotal}lei</Text>
                </View>
                <View style={styles.cardSelectionContainer}>
                
                    <Text style={styles.cardSelectionText}>Selectează un card:</Text>
                    {savedCards.map((card, index) => (
                        <View key={index}>
                        <TouchableOpacity
                            style={[
                                styles.cardOption,
                                selectedCard === index && styles.selectedCardOption,
                                    ]}
                            onPress={() => setSelectedCard(index)}>
                            <Text style={styles.cardText}>**** **** **** {card.number.slice(-4)}</Text>
                            <Text style={styles.cardBalance}>Sold: {card.balance} lei</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteCard(index)} style={styles.deleteCardButton}>
                            <Text style={styles.deleteCardButtonText}>Șterge cardul</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.addCardButtonText}>Adaugă un card nou</Text>
                    </TouchableOpacity>
                </View>
                

                <View style={styles.paymentButtonContainer}>
                    <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
                        <Text style={styles.paymentButtonText}>Finalizeză comanda</Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adaugă un card nou</Text>
            <TextInput
                style={styles.input}
                placeholder="Număr card"
                value={newCardNumber}
                onChangeText={setNewCardNumber}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Data expirării (MM/YY)"
                value={newCardExpiry}
                onChangeText={setNewCardExpiry}
            />
            <TextInput
                style={styles.input}
                placeholder="CVC"
                value={newCardCVC}
                onChangeText={setNewCardCVC}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Sumă inițială"
                value={initialBalance}
                onChangeText={setInitialBalance}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleAddCard} style={styles.addCardButtonModal}>
                <Text style={styles.addCardButtonText}>Adaugă cardul</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Anulează</Text>
            </TouchableOpacity>
        </View>
        </Modal>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        marginVertical: 5,
    },
    itemCount: {
        fontWeight: 'bold',
        color: '#b0a96d',
        padding: 5,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemName: {
        flex: 1,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 10,
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    removeItemButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: '#b0a96d',
        borderRadius: 30,
    },
    totalContainer: {
        padding: 6,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#b0a96d',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        marginHorizontal: 30,
    },
    totalText: {
        color: 'white',
        fontSize: 18,
    },
    cardSelectionContainer: {
        marginHorizontal: 30,
        marginTop: 15,
    },
    cardSelectionText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    cardOption: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    selectedCardOption: {
        borderWidth: 2,
        borderColor: '#8B0000',///'#b0a96d',
    },
    cardText: {
        color: '#000',
    },
    addCardButton: {
        backgroundColor: '#b0a96d',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    addCardButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paymentButtonContainer: {
        marginHorizontal: 30,
        marginTop: 15,
    },
    paymentButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
    },
    paymentButtonText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    addCardButtonModal: {
        backgroundColor: '#b0a96d',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: '#8B0000',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardBalance: {
        color: '#888',
        fontSize: 14,
    },
    deleteCardButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    deleteCardButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    
    
});
