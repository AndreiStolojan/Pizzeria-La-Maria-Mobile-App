import React, { useState, useEffect, useRef } from 'react'; // 1. Importăm useRef
import { Text, View, StyleSheet, Button, Dimensions, Alert, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import firebase from "firebase/compat/app"; 
import { auth, firestore } from '../../../firebase'; 

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false); // Doar pentru UI (chenar verde/roșu)
  const [statusMessage, setStatusMessage] = useState(''); 
  
  // 2. NOU: Folosim un Ref pentru blocare instantanee
  const scanLock = useRef(false); 

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Resetăm starea și zăvorul (Ref) când revenim pe ecran
  useEffect(() => {
    if (isFocused) {
      setScanned(false);
      setStatusMessage('');
      scanLock.current = false; // Deblocăm scanerul
    }
  }, [isFocused]);

  const handleUpdatePoints = async (points) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const userRef = firestore.collection('users').doc(user.uid);

    await userRef.set({
      loyaltyPoints: firebase.firestore.FieldValue.increment(points)
    }, { merge: true });
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 10, color: 'white' }}>
          Avem nevoie de permisiune pentru cameră
        </Text>
        <Button onPress={requestPermission} title="Oferă permisiune" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    // 3. VERIFICARE INSTANTANEE: Dacă zăvorul e pus, ne oprim imediat.
    // Această verificare nu depinde de randarea React, e instantanee.
    if (scanLock.current) return;

    // 4. BLOCĂM IMEDIAT
    scanLock.current = true; 

    // Actualizăm UI-ul (asta poate dura câteva ms, dar nu contează, scanLock e deja true)
    setScanned(true);
    setStatusMessage('Se procesează...');

    if (data.startsWith('pizzeria-la-maria-loyalty-points-')) {
      const points = parseInt(data.split('-').pop(), 10);

      if (!isNaN(points)) {
        try {
          Vibration.vibrate(); 
          
          await handleUpdatePoints(points);
          
          Alert.alert(
            "Succes!",
            `Ai primit ${points} puncte de fidelitate!`,
            [{ 
              text: "Vezi Profil", 
              onPress: () => {
                navigation.navigate("Profil");
                // Nu deblocăm aici scanLock, se va debloca singur când userul revine pe pagină (useEffect)
              } 
            }]
          );
        } catch (error) {
          console.error("Eroare update puncte:", error);
          setStatusMessage('Eroare la adăugarea punctelor.');
          Vibration.vibrate(400);
          
          setTimeout(() => {
              if(isFocused) {
                  setScanned(false);
                  setStatusMessage('');
                  scanLock.current = false; // Deblocăm manual doar în caz de eroare
              }
            }, 3000);
        }
      } else {
        Vibration.vibrate(400); 
        setStatusMessage('Valoare puncte invalidă.');
        setTimeout(() => {
            if(isFocused) {
                setScanned(false);
                setStatusMessage('');
                scanLock.current = false; // Deblocăm manual
            }
        }, 2000);
      }
    } else {
      Vibration.vibrate(400); 
      setStatusMessage('Cod QR invalid.');
      setTimeout(() => {
        if(isFocused) {
            setScanned(false);
            setStatusMessage('');
            scanLock.current = false; // Deblocăm manual
        }
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            // Trimitem undefined dacă e scanat, deși scanLock face treaba grea acum
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
        />
      )}
      
      <View style={styles.overlay}>
        <View style={[styles.scanArea, { borderColor: scanned ? (statusMessage.includes('Succes') ? 'green' : 'red') : 'white' }]} />
        
        {statusMessage !== '' && (
            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{statusMessage}</Text>
            </View>
        )}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: qrSize,
    height: qrSize,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 8,
    maxWidth: '90%'
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});