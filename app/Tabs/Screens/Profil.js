import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Text,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import { ProfilePicture, ProfilePictureContainer } from "../../../styles";
import { auth, storage } from "../../../firebase";
import UserPermissions from "../Components/Permission";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../../styles";
import { StyledButton, ButtonText, Avatar } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const { red_logo, secondary } = Colors;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {user ? (
            <Text style={styles.greetingText}>Salut, {firstName}</Text>
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
                      : require("../../../assets/images/user.png")
                  }
                  style={styles.profilePicture}
                />
              </ProfilePictureContainer>
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
              style={[styles.avatar, { marginTop: windowHeight * 0.1 }]}
              resizeMode="cover"
              source={require("../../../assets/images/pizzerie_logo_copy.png")}
            />
          )}

          {user && (
            <StyledButton style={styles.button} onPress={handleLogout}>
              <ButtonText style={styles.buttonText}>
                Deconectați-vă
              </ButtonText>
            </StyledButton>
          )}
          {!user && (
            <StyledButton style={styles.button} onPress={goToLogin}>
              <ButtonText style={styles.buttonText}>
                Conectați-vă
              </ButtonText>
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
    marginBottom: windowHeight * 0.05,
    marginTop: windowHeight * 0.05,
  },
  profilePicture: {
    tintColor: "grey",
  },
  userInfoContainer: {
    backgroundColor: "transparent",
    padding: windowHeight * 0.02,
    borderRadius: 5,
    marginTop: windowHeight * 0.05,
  },
  userInfoText: {
    fontSize: windowWidth * 0.045,
    color: "#ffffff",
    textAlign: "left",
    marginTop: windowHeight * 0.02,
  },
  greetingText: {
    fontSize: windowWidth * 0.055,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
    marginTop: windowHeight * 0.03,
    color: "#ffffff",
  },
  greetingText2: {
    fontSize: windowWidth * 0.065,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.1,
    marginLeft: windowWidth * 0.05,
    marginRight: windowWidth * 0.05,
    color: "#ffffff",
  },
  avatar: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.05,
    width: windowWidth * 0.5,
    aspectRatio: 1,
    borderRadius: windowWidth * 0.25,
    alignSelf: "center",
  },
  button: {
    width: windowWidth * 0.6,
    alignSelf: "center",
    marginTop: windowHeight * 0.05,
  },
  buttonText: {
    fontSize: windowWidth * 0.05,
  },
});

export default Profil;
