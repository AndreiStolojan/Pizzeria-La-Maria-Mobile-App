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
import { View, Text, Settings, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../../../styles";
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
      <StyledTextInput {...props} />

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

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageTitle>Create Your Account </PageTitle>
          <SubTitle></SubTitle>

          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label1="Nume Prenume"
                  icon="person"
                  placeholder="Stolojan Andrei"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
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
                <MyTextInput
                  label1="Confirm Password"
                  icon="lock"
                  placeholder="*********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 40,
                    marginBottom: 20,
                  }}
                >
                  <StyledButton style={{ width: 200 }} onPress={handleSubmit}>
                    <ButtonText>Create!</ButtonText>
                  </StyledButton>
                </View>

                <ExtraView
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18, margin: 10 }}>
                    Aveti deja un cont?
                    <TextLink
                      style={{ marginLeft: 5 }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <TextLinkContent>Login</TextLinkContent>
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

export default SignUp;
