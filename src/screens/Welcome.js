import React from "react";
import {
  InnerContainer,
  PageTitle,
  StyledFormArea,
  SubTitle,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  Avatar,
} from "../styles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
const Welcome = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    // Implementarea funcției handleSignOut pentru deconectare
    console.log("Handle Sign Out");
  };

  const handleGoToComanda = () => {
    // Navigare către pagina de comandă
    navigation.navigate("Comanda");
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>
            Te-ai alăturat familiei La Maria!
          </PageTitle>
          {/* Afișează numele utilizatorului conectat */}
          <SubTitle>{auth.currentUser?.displayName}</SubTitle>
          <SubTitle welcome={true}>{auth.currentUser?.email}</SubTitle>
          <StyledFormArea>
            <Avatar
              style={{ marginBottom: 20, marginTop: 20 }}
              resizeMode="cover"
              source={require('../../assets/images/pizzerie_logo_copy.png')}
            />
            {/* Buton pentru deconectare */}
            <StyledButton style={{ width: 260 }} onPress={handleSignOut}>
              <ButtonText style={{ fontSize: 22 }}>LogOut</ButtonText>
            </StyledButton>
            {/* Buton pentru navigare către pagina de comandă */}
            <StyledButton
              style={{ width: 260 }}
              onPress={handleGoToComanda}
            >
              <ButtonText style={{ fontSize: 22 }}>Go to Comanda</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
