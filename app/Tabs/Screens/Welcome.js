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

const Welcome = ({ navigation }) => {
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>Te-ai alăturat familiei La Maria!</PageTitle>
          <SubTitle>Andrei Stolojan</SubTitle>
          <SubTitle welcome={true}>andreistolojan@gmail.com</SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("../../../assets/images/pizzerie_logo_copy.png")}
            />
            <StyledButton style={{ width: 260 }} onPress={() => {navigation.navigate('Login')}}>
              <ButtonText style={{ fontSize: 22 }}>LogOut</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
