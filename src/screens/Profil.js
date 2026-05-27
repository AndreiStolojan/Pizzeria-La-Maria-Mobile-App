import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { ProfilePicture, ProfilePictureContainer } from "../styles";
// MODIFICARE 1: Importăm firestore de aici, nu îl mai creăm manual jos
import { auth, storage, firestore } from "../config/firebase"; 
import { Colors } from "../styles";
import { StyledButton, ButtonText } from "../styles";
import { useNavigation } from "@react-navigation/native";

const { red_logo } = Colors;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profil = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState(0); // Pornim de la 0

  const goToLogin = () => {
    navigation.replace("Login");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.error("Eroare la deconectare:", error.message);
      Alert.alert("Eroare", "A apărut o eroare la deconectare.");
    }
  };

  useEffect(() => {
    // Ascultăm starea de autentificare
    const unsubscribeAuth = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        
        // Extragere prenume
        const fullName = authenticatedUser.displayName;
        if (fullName) {
          const splitName = fullName.split(" ");
          setFirstName(splitName[1] || splitName[0]); // Siguranță dacă nu are spațiu
        }

        // --- ASCULTARE PUNCTE ÎN TIMP REAL ---
        // Folosim instanța 'firestore' importată
        const userDocRef = firestore.collection('users').doc(authenticatedUser.uid);
        
        const unsubscribeFirestore = userDocRef.onSnapshot((doc) => {
          if (doc.exists) {
            // Luăm datele, sau 0 dacă câmpul lipsește
            setLoyaltyPoints(doc.data().loyaltyPoints || 0);
          } else {
            // Documentul nu există încă (utilizator nou care n-a scanat nimic)
            setLoyaltyPoints(0);
          }
        }, (error) => {
           console.log("Eroare la citire puncte:", error);
        });

        // Curățăm ascultătorul de Firestore când userul se deloghează
        return () => unsubscribeFirestore();

      } else {
        // Dacă nu e logat
        setUser(null);
        setFirstName("");
        setLoyaltyPoints(0);
      }
    });

    // Curățăm ascultătorul de Auth la ieșirea din pagină
    return () => unsubscribeAuth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {user ? (
            <Text style={styles.greetingText}>Salut, {firstName}!</Text>
          ) : (
            <Text style={styles.greetingText2}>
              Te vrem în familia Pizzeriei La Maria!
            </Text>
          )}
          <View style={styles.contentContainer}>
            {user && (
              <ProfilePictureContainer style={styles.profilePictureContainer}>
                <ProfilePicture
                  source={
                    user.avatar
                      ? { uri: user.avatar }
                      : require('../../assets/images/user.png')
                  }
                  style={styles.profilePicture}
                />
              </ProfilePictureContainer>
            )}

            <View style={styles.userInfoContainer}>
              {user && (
                <>
                    <Text style={styles.userInfoText}>
                    Nume: {user.displayName || "Nespecificat"}
                    </Text>
                    
                    {user.email && (
                    <Text style={styles.userInfoText}>Email: {user.email}</Text>
                    )}

                    {/* --- ZONA PUNCTE EVIDENȚIATĂ --- */}
                    <View style={styles.pointsHighlight}>
                        <Text style={styles.pointsLabel}>Puncte Fidelitate:</Text>
                        <Text style={styles.pointsValue}>{loyaltyPoints}</Text>
                    </View>
                </>
              )}
            </View>
          </View>

          {!user && (
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                resizeMode="cover"
                source={require('../../assets/images/pizzerie_logo_copy.png')}
              />
            </View>
          )}

          {user ? (
            <StyledButton style={styles.button} onPress={handleLogout}>
              <ButtonText style={styles.buttonText}>Deconectați-vă</ButtonText>
            </StyledButton>
          ) : (
            <StyledButton style={styles.button} onPress={goToLogin}>
              <ButtonText style={styles.buttonText}>Conectați-vă</ButtonText>
            </StyledButton>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: red_logo,
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.05
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureContainer: {
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.05,
  },
  profilePicture: {
    tintColor: "grey",
  },
  userInfoContainer: {
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 5,
  },
  // Stiluri noi pentru puncte
  pointsHighlight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // fundal semi-transparent
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  pointsLabel: {
    color: '#eee',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  pointsValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5
  },
  greetingText: {
    fontSize: windowWidth * 0.055,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: windowHeight * 0.03,
    color: "#ffffff",
  },
  greetingText2: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: "#ffffff",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    borderRadius: windowWidth * 0.3,
  },
  button: {
    width: windowWidth * 0.6,
    alignSelf: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default Profil;
