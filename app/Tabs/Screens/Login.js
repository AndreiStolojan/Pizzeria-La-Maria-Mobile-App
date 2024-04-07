import React, { useState } from "react";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  SubTitle,
  LeftIcon,
  ExtraView,
  StyledInputLabel,
  MsgBox,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  TextLink,
  TextLinkContent,
} from "../../../styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../../../styles";
import { FontAwesome } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";

const { rems_color, darkLight, primary } = Colors;

const MyTextInput = ({
  label1,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={rems_color} />
      </LeftIcon>
      <StyledInputLabel style={{ color: primary }}>{label1}</StyledInputLabel>
      <StyledTextInput {...props} placeholder={label1} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Octicons
            name={hidePassword ? "eye-closed" : "eye"}
            size={25}
            color={rems_color}
          />
        </RightIcon>
      )}
    </View>
  );
};

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../../../assets/images/rems_logo.jpg")}
          />
          <PageTitle>Login to your account </PageTitle>
          <SubTitle>Account Registration</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome")
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label1="Email address"
                  icon="mail"
                  placeholder="rems@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label1="Password"
                  icon="lock"
                  placeholder="*********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <StyledButton style={{ width: 150 }} onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                  <StyledButton
                    google={true}
                    style={{ width: 150 }}
                    onPress={handleSubmit}
                  >
                    <FontAwesome name="google" color={primary} size={25} />
                    <ButtonText google={true}>Sign In</ButtonText>
                  </StyledButton>
                </View>
                <ExtraView
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
                    Nu aveti un cont?
                    <TextLink style={{ marginLeft: 5 }} onPress={() => navigation.navigate("SignUp")} >
                      <TextLinkContent>SignUp</TextLinkContent>
                    </TextLink>
                  </Text>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
