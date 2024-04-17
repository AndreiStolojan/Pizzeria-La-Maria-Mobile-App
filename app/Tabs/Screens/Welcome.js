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
  WelcomeImage,
} from "../../../styles";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation=useNavigation()

  const handleSignOut = () => {
    auth.signOut()
    .then(() => {
      navigation.replace("Login")

    }).catch(error => alert(error.message))
  }

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>
            Te-ai alăturat familiei La Maria!
          </PageTitle>
          <SubTitle>{auth.currentUser?.displayName}</SubTitle>
          <SubTitle welcome={true}>{auth.currentUser?.email}</SubTitle>
          <StyledFormArea>
            <Avatar
              style={{ marginBottom: 20, marginTop: 20 }}
              resizeMode="cover"
              source={require("../../../assets/images/pizzerie_logo_copy.png")}
            />
            <StyledButton
              style={{ width: 260 }}
              onPress={handleSignOut}
            >
              <ButtonText style={{ fontSize: 22 }}>LogOut</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
