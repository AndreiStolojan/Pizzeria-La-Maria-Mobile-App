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

const { red_logo } = Colors;

const Profil = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const fullName = authenticatedUser.displayName;
        const splitName = fullName.split(" ");
        const firstName = splitName[1];
        setFirstName(firstName);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePickAvatar = async () => {
    await UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setUser({ ...user, avatar: result.uri });
      console.log("Imagine selectată:", result.uri);

      try {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const storageRef = storage.ref().child(`profile_images/${user.uid}`);
        await storageRef.put(blob);
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
        {user && <Text style={styles.greetingText}>Salut, {firstName}</Text>}
        {!user && (
          <Text style={styles.greetingText2}>
            Te vrem in familia Pizzeriei La Maria!
          </Text>
        )}
        <View style={styles.contentContainer}>
          {user && (
            <TouchableOpacity>
              <ProfilePictureContainer>
                <ProfilePicture source={{ uri: user.avatar }} />
              </ProfilePictureContainer>
            </TouchableOpacity>
          )}
          <View style={styles.userInfoContainer}>
            {user && (
              <Text style={styles.userInfoText}>Nume: {user.displayName}</Text>
            )}
            <Text style={styles.userInfoText}>Email: {user.email}</Text>
          </View>
          {user && (
            <ProfilePictureContainer>
              <TouchableOpacity onPress={handlePickAvatar}>
                {!user && (
                  <ProfilePicture
                    source={require("../../../assets/images/user.png")}
                  />
                )}
              </TouchableOpacity>
            </ProfilePictureContainer>
          )}
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

        <StyledButton
          style={{
            width: 260,
            alignSelf: "center",
            position: "absolute",
            bottom: -300,
          }}
        >
          <ButtonText style={{ fontSize: 22 }}>Logout</ButtonText>
        </StyledButton>
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
