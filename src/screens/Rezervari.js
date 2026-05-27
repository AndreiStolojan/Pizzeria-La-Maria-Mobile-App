import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,SafeAreaView, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const ReservationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [persons, setPersons] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [existingReservation, setExistingReservation] = useState(null);
    const [user, setUser] = useState(auth.currentUser);
    const navigation = useNavigation();

    useEffect(() => {
        const checkExistingReservation = async () => {
            try {
                const reservations = await AsyncStorage.getItem('reservations');
                const parsedReservations = reservations ? JSON.parse(reservations) : [];

                if (parsedReservations.length > 0) {
                    setExistingReservation(parsedReservations[parsedReservations.length - 1]);
                }
            } catch (error) {
                console.error('Eroare la verificarea rezervării existente:', error);
            }
        };

        checkExistingReservation();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                setName(user.displayName || '');
                setEmail(user.email || '');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleReservation = async () => {
        if (!name || !email || !date || !time || !persons) {
            Alert.alert('Eroare', 'Te rugăm să completezi toate câmpurile.');
            return;
        }

        const reservation = { name, email, date: date.toISOString().split('T')[0], time: time.toTimeString().split(' ')[0], persons };

        try {
            const existingReservations = await AsyncStorage.getItem('reservations');
            const reservations = existingReservations ? JSON.parse(existingReservations) : [];
            reservations.push(reservation);
            await AsyncStorage.setItem('reservations', JSON.stringify(reservations));

            Alert.alert('Succes', 'Rezervarea a fost făcută cu succes!');
            setDate(new Date());
            setTime(new Date());
            setPersons('');
            setExistingReservation(reservation);
        } catch (error) {
            Alert.alert('Eroare', 'A apărut o problemă. Te rugăm să încerci din nou.');
            console.error(error);
        }
    };

    const handleDeleteReservation = async () => {
        try {
            await AsyncStorage.removeItem('reservations');
            Alert.alert('Succes', 'Rezervarea a fost ștearsă cu succes!');
            setExistingReservation(null);
        } catch (error) {
            Alert.alert('Eroare', 'A apărut o problemă la ștergerea rezervării. Te rugăm să încerci din nou.');
            console.error(error);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Te rugăm să te conectezi pentru a avea acces la această funcționalitate.</Text>
                <TouchableOpacity 
                    style={[styles.buttonRez, styles.largeRoundedButton]} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonRezerva}>Conectează-te</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (existingReservation) {
        // Extrageți data din existingReservation
        const reservationDate = new Date(existingReservation.date);
        // Formatați data pentru a afișa ziua săptămânii cu prima literă majusculă și restul cu litere mici
        const formattedDay = reservationDate.toLocaleDateString('ro-RO', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase());
        // Formatați data pentru a afișa data în limba română
        const formattedDate = reservationDate.toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
    
        // Extrageți ora din existingReservation
     
    
        return (
            
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.innerContainer}>
                <Text style={styles.title}>Rezervare existentă:</Text>
                <View style={styles.reservationBox}>
                    <Text style={styles.detail}>Nume: {existingReservation.name}</Text>
                    <Text style={styles.detail}>Email: {existingReservation.email}</Text>
                    <Text style={styles.detail}>Data: {formattedDay}, {formattedDate}</Text>
                    <Text style={styles.detail}>Ora: {existingReservation.time}</Text>
                    <Text style={styles.detail}>Număr de persoane: {existingReservation.persons}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.buttonStergereRez, styles.largeRoundedButton]} 
                    onPress={handleDeleteReservation}
                >
                    <Text style={styles.buttonRezerva}>Șterge Rezervarea</Text>
                </TouchableOpacity>
                </View>
                </SafeAreaView>
            </View>
           
        );
    }
    
    return (
        
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Formular de Rezervare</Text>
                    {/* <Text style={styles.subtitle}>Completați detaliile de mai jos pentru a face o rezervare.</Text> */}
                    <Text style={styles.label}>Data:</Text>
                    <TouchableOpacity 
                        style={[styles.button, styles.largeRoundedButton]} 
                       
                        onPress={showDatepicker}
                    >
                        <Text style={styles.buttonText}>Selectează Data</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    <Text style={styles.label}>Ora:</Text>
                    <TouchableOpacity 
                        style={[styles.button, styles.largeRoundedButton]} 
                        onPress={showTimepicker}
                    >
                        <Text style={styles.buttonText}>Selectează Ora</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}
                    <Text style={styles.label}>Număr de persoane:</Text>
                    <TextInput
                        style={styles.input}
                        value={persons}
                        onChangeText={setPersons}
                        placeholder="Număr de persoane"
                        keyboardType="numeric"
                        placeholderTextColor="#8B0000"
                        // onBlur={() => Keyboard.dismiss()}
                    />
                    <TouchableOpacity 
                        style={[styles.buttonRez, styles.largeRoundedButton]} 
                        onPress={handleReservation}
                    >
                        <Text style={styles.buttonRezerva}>Rezervă</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
            </View>
        </KeyboardAvoidingWrapper>
       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.05,
        backgroundColor: '#8B0000',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    label: {
        marginVertical: height * 0.01,
        fontSize: height * 0.025,
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        height: height * 0.05,
        borderColor: 'black',
        borderWidth: 2,
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.02,
        borderRadius: height * 0.025,
        color: '#8B0000',
        backgroundColor: '#D2B48C',
        marginRight: 180,
        fontSize: height * 0.018,
        fontWeight: 'bold',
    },
    title: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        marginBottom: height * 0.06,
        marginTop: height * 0.0,
        color: '#fff',
    },
    detail: {
        fontSize: height * 0.024,
        marginBottom: height * 0.015,
        color: '#fff',
    },
    button: {
        backgroundColor: '#D2B48C',
        paddingVertical: height * 0.009,
        paddingHorizontal: width * 0.1,
        marginVertical: height * 0.01,
        alignItems: 'center',
        marginRight: 120,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonRez: {
        backgroundColor: '#D2B48C',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.1,
        marginVertical: height * 0.03,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0,
        marginTop: height * 0.06,
        marginLeft: 60,
        marginRight: 60,
    },
    buttonStergereRez: {
        backgroundColor: '#D2B48C',
        paddingVertical: height * 0.011,
        paddingHorizontal: width * 0.1,
        marginVertical: height * 0.03,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0,
        marginTop: height * 0.06,
        marginLeft: 50,
        marginRight: 50,
    },
    largeRoundedButton: {
        borderRadius: height * 0.05,
    },
    buttonText: {
        fontSize: height * 0.025,
        color: '#8B0000',
        fontWeight: 'bold',
    },
    buttonRezerva: {
        fontSize: height * 0.025,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    message: {
        fontSize: height * 0.03,
        color: '#fff',
        marginBottom: height * 0.02,
        textAlign: 'center',
        marginRight: 0,
        fontWeight: 'bold',
    },
    reservationBox: {
        borderWidth: 2,
        borderColor: '#D2B48C',
        borderRadius: height * 0.02,
        padding: height * 0.02,
        marginBottom: height * 0.02,
    },
});

export default ReservationForm;
