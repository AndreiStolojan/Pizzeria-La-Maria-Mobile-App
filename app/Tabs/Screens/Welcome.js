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
} from "../../../styles";
import { StatusBar } from "expo-status-bar";



const Login = () => {
 
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        
        <WelcomeContainer>
            <PageTitle welcome={true}>Welcome to Rem's Family !</PageTitle>
            <SubTitle>Andrei Stolojan</SubTitle>
            <SubTitle welcome={true}>andreistolojan@gmail.com</SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("../../../assets/images/rems_logo.jpg")}
            />

            
            <StyledButton style={{ width: 260 }} onPress={() => {}}>
              <ButtonText style={{  fontSize: 22}}>LogOut</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Login;
