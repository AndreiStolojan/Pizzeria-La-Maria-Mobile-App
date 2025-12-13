import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Modal, TextInput } from 'react-native';
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from '../../../slices/restaurantSlice';
import { emptyCart, removeFromCart, selectCartItems, selectCartTotal } from '../../../slices/cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as Location from 'expo-location';

const RESTAURANT_COORDS = {
    latitude: 45.74703495007546,
    longitude: 21.214969523426273
};

export default function Cart() {
    const products = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardExpiry, setNewCardExpiry] = useState('');
    const [newCardCVC, setNewCardCVC] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountedTotal, setDiscountedTotal] = useState(null);
    const [address, setAddress] = useState('');
    const [deliveryTime, setDeliveryTime] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCards = async () => {
            const storedCards = await AsyncStorage.getItem('savedCards');
            if (storedCards) {
                setSavedCards(JSON.parse(storedCards));
            }
        };
        loadCards();
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        setIsCalculating(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permisiune refuzată", "Introdu adresa manual.");
            setIsCalculating(false);
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({});
            let addressResponse = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (addressResponse.length > 0) {
                const addr = addressResponse[0];
                const fullAddress = `${addr.street || ''} ${addr.streetNumber || ''}, ${addr.city || ''}`;
                setAddress(fullAddress);
            }
            calculateEstimatedTime(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            Alert.alert("Eroare", "Nu te-am putut localiza automat.");
        } finally {
            setIsCalculating(false);
        }
    };

    const handleManualAddressConfirm = async () => {
        if (!address.trim()) {
            Alert.alert("Atenție", "Te rog introdu o adresă.");
            return;
        }
        
        Keyboard.dismiss();
        setIsCalculating(true);

        try {
            let geocodedLocation = await Location.geocodeAsync(address);

            if (geocodedLocation.length > 0) {
                const result = geocodedLocation[0];
                calculateEstimatedTime(result.latitude, result.longitude);
            } else {
                Alert.alert("Adresă necunoscută", "Nu am putut calcula distanța pentru această adresă. Verifică textul.");
                setDeliveryTime(null);
            }
        } catch (error) {
            Alert.alert("Eroare", "A apărut o problemă la căutarea adresei.");
        } finally {
            setIsCalculating(false);
        }
    };

    const calculateEstimatedTime = (userLat, userLon) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; 

        const dLat = toRad(userLat - RESTAURANT_COORDS.latitude);
        const dLon = toRad(userLon - RESTAURANT_COORDS.longitude);
        
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(RESTAURANT_COORDS.latitude)) * Math.cos(toRad(userLat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distanceKm = R * c;

        const travelTime = (distanceKm / 30) * 60; 
        const prepTime = 20;
        const totalMinutes = Math.round(travelTime + prepTime);

        setDeliveryTime(totalMinutes);
    };

    const handleApplyDiscount = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Eroare', 'Trebuie să fii autentificat pentru a aplica o reducere.');
        return;
      }

      const firestore = firebase.firestore();
      const userRef = firestore.collection('users').doc(user.uid);
      const userDoc = await userRef.get();
  
      if (userDoc.exists && userDoc.data().loyaltyPoints >= 100) {
        const newPoints = userDoc.data().loyaltyPoints - 100;
        const discount = cartTotal * 0.1; // 10% discount
        setDiscountedTotal(cartTotal - discount);
        setDiscountApplied(true);
        await userRef.update({ loyaltyPoints: newPoints });
        Alert.alert('Reducere aplicată!', 'Ai folosit 100 de puncte pentru o reducere de 10%.');
      } else {
        Alert.alert('Puncte insuficiente', 'Nu ai suficiente puncte de loialitate pentru a aplica reducerea.');
      }
    };

    const handlePayment = () => {
        if (selectedCard === null) {
            Alert.alert('Eroare', 'Te rog selectează un card pentru plată.');
            return;
        }
    
        const totalToPay = discountApplied ? discountedTotal : cartTotal;
        const selectedCardDetails = savedCards[selectedCard];
        if (selectedCardDetails.balance < totalToPay) {
            Alert.alert('Fonduri insuficiente', 'Fondurile disponibile pe acest card nu sunt suficiente pentru a finaliza plata.');
            return;
        }
    
        
        const updatedCards = [...savedCards];
        updatedCards[selectedCard].balance -= totalToPay;
        setSavedCards(updatedCards);
        AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));

        
        Alert.alert(
            "Plata reușită",
            `Plata de ${totalToPay.toFixed(2)} lei a fost efectuată cu succes cu cardul **** **** **** ${selectedCardDetails.number.slice(-4)}!`,
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
                {cartItems.map((item) => {
                    return (
                        <View key={item.id} style={styles.itemContainer}>
                            <Text style={styles.itemCount}>{item.quantity} x</Text>
                            <Image style={styles.itemImage} source={item.image} />
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}lei</Text>
                            <TouchableOpacity
                                onPress={() => dispatch(removeFromCart({ id: item.id }))}
                                style={styles.removeItemButton}>
                                <Icon.Minus strokeWidth={2} height={10} width={10} stroke={'white'} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.totalContainer}>
                <View style={styles.deliveryContainer}>
                    <Text style={styles.sectionTitle}>Adresa de livrare:</Text>
    
                    <View style={styles.addressInputRow}>
                        <TextInput 
                            style={styles.addressInput}
                            placeholder="Strada, Număr, Oraș..."
                            placeholderTextColor="#ccc"
                            value={address}
                            onChangeText={(text) => {
                                setAddress(text);
                                setDeliveryTime(null); 
                            }}
                            onSubmitEditing={handleManualAddressConfirm} 
                        />
                        <TouchableOpacity onPress={getCurrentLocation} style={styles.gpsButton}>
                            <Icon.MapPin stroke="#b0a96d" width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timeRow}>
                        <Icon.Clock stroke="white" width={18} height={18} />
                            <Text style={styles.deliveryText}>
                                {isCalculating ? 
                                    " Se calculează..." : 
                                    (deliveryTime ? ` Estimare: ~${deliveryTime} minute` : " Introdu adresa pentru calcul")
                                }
                            </Text>
                    </View>
    
                    {address.length > 3 && !isCalculating && !deliveryTime && (
                        <TouchableOpacity onPress={handleManualAddressConfirm} style={styles.calcButton}>
                            <Text style={styles.calcButtonText}>Calculează timp livrare</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Subtotal</Text>
                    <Text style={styles.totalText}>{cartTotal.toFixed(2)}lei</Text>
                </View>
                {discountApplied && (
                  <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Reducere (10%)</Text>
                    <Text style={styles.totalText}>- {(cartTotal * 0.1).toFixed(2)}lei</Text>
                  </View>
                )}
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>{(discountApplied ? discountedTotal : cartTotal).toFixed(2)}lei</Text>
                </View>
                <View style={styles.totalRow}>
                  <TouchableOpacity onPress={handleApplyDiscount} disabled={discountApplied}>
                    <Text style={{color: 'white', textDecorationLine: discountApplied? 'line-through' : 'none'}}>Aplica reducere (100 puncte)</Text>
                  </TouchableOpacity>
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
        marginBottom: 15
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
deliveryContainer: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        marginHorizontal: 10,
    },
    sectionTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14
    },
    addressInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    addressInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#000',
        marginRight: 10
    },
    gpsButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 14,
    },
    calcButton: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    calcButtonText: {
        color: '#b0a96d',
        fontWeight: 'bold',
        fontSize: 13
    },
    
});
