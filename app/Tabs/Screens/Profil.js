import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { ProfilePicture, ProfilePictureContainer } from "../../../styles";
import { auth, storage } from "../../../firebase";
import UserPermissions from "../Components/Permission";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../../styles";
import { StyledButton, ButtonText, Avatar } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const { red_logo,secondary } = Colors;

const Profil = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");

  const goToLogin = () => {
    navigation.replace("Login");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.error("Eroare la deconectare:", error.message);
      Alert.alert(
        "Eroare",
        "A apărut o eroare la deconectare. Vă rugăm să încercați din nou."
      );
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const fullName = authenticatedUser.displayName;
        if (fullName) {
          const splitName = fullName.split(" ");
          const firstName = splitName[1];
          setFirstName(firstName);
        } else {
          setFirstName("");
        }
      } else {
        setUser(null);
        setFirstName("");
      }
    });
    return () => unsubscribe();
  }, []);

  const asyncUpload = async () => {
    try {
      // Verificăm dacă rezultatul selecției imaginii este definit și nu este null
      if (recordInfo) {
        const response = await fetch(recordInfo.uri);
        console.log("Rezultatul selectării imaginii:", recordInfo);
        const blob = await response.blob();
        await upload(blob);
      } else {
        console.log("Nu s-a selectat nicio imagine.");
      }
    } catch (error) {
      console.log("Eroare la încărcarea imaginii:", error);
    }
  };

  const handlePickAvatar = async () => {
    await UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log("Rezultatul selectării imaginii:", result); // Adaugă această linie pentru a verifica rezultatul

    if (!result.cancelled) {
      console.log("Imagine selectată:", result.uri);

      try {
        asyncUpload();
        console.log("Imaginea a fost încărcată în Firebase Storage.");
      } catch (error) {
        console.error(
          "Eroare la încărcarea imaginii în Firebase Storage:",
          error
        );
        Alert.alert(
          "Eroare",
          "A apărut o eroare la încărcarea imaginii în Firebase Storage."
        );
      }
    } else {
      console.log("Selectarea imaginii a fost anulată sau nu există URI.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        {user ? (
          <Text style={styles.greetingText}>Salut, {firstName}</Text>
        ) : (
          <Text style={styles.greetingText2}>
            Te vrem în familia Pizzeriei La Maria!
          </Text>
        )}
        <View style={styles.contentContainer}>
          {user && (
            <TouchableOpacity onPress={handlePickAvatar}>
              <ProfilePictureContainer>
                <ProfilePicture
                  source={
                    user.avatar
                      ? { uri: user.avatar }
                      : require("../../../assets/images/user.png")
                  } style={{ tintColor: "grey" }}
                />
              </ProfilePictureContainer>
            </TouchableOpacity>
          )}
          <View style={styles.userInfoContainer}>
            {user && (
              <Text style={styles.userInfoText}>
                Nume: {user.displayName || ""}
              </Text>
            )}
            {user && user.email && (
              <Text style={styles.userInfoText}>Email: {user.email}</Text>
            )}
          </View>
        </View>
        {!user && (
          <Avatar
            style={{
              marginBottom: 20,
              marginTop: 20,
              width: 150,
              height: 150,
              borderRadius: 75,
            }}
            resizeMode="cover"
            source={require("../../../assets/images/pizzerie_logo_copy.png")}
          />
        )}

        {user && (
          <StyledButton
            style={{
              width: 260,
              alignSelf: "center",
              position: "absolute",
              bottom: -300,
            }}
            onPress={handleLogout}
          >
            <ButtonText style={{ fontSize: 22 }}>Deconectați-vă</ButtonText>
          </StyledButton>
        )}
        {!user && (
          <StyledButton
            style={{
              width: 200,
              alignSelf: "center",
              position: "absolute",
              bottom: -120,
            }}
            onPress={goToLogin}
          >
            <ButtonText style={{ fontSize: 22 }}>Conectați-vă</ButtonText>
          </StyledButton>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: red_logo,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  userInfoTextContainer: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 23,
    color: "#ffffff",
    textAlign: "left",
    marginTop: 25,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
    marginTop: 30,
    color: "#ffffff",
  },
  greetingText2: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
    marginTop: 100,
    marginLeft: 40,
    marginRight: 40,
    color: "#ffffff",
  },
});

export default Profil;
