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
import { View, Text, ActivityIndicator} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../../../styles";
import { FontAwesome } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import axios from "axios";

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

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleLogin = async (credentials, setSubmitting) => {
    setMessage(null);

    try {
      const response = await axios.post('https://pizzeria-la-maria-heroku.herokuapp.com/user/signin', credentials);
      const { message, status, data } = response.data;

      if (status !== 'SUCCESS') {
        setMessage(message);
        setMessageType(status);
      } else {
        navigation.navigate('Welcome', { ...data[0] });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Verifica conexiunea la internet!");
      setMessageType('FAILED');
    }

    setSubmitting(false);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../../../assets/images/pizzerie_logo_copy.png")}
          />
          <SubTitle>Înregistrați-vă</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email === '' || values.password === '') {
                setMessage('Completeaza toate campurile!');
                setMessageType('FAILED');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label1="Adresa de email"
                  icon="mail"
                  placeholder="pizzerialamaria@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label1="Parola"
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
                {message && <MsgBox type={messageType}>{message}</MsgBox>}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {!isSubmitting && <StyledButton style={{ width: 150 }} onPress={handleSubmit}>
                    <ButtonText>Conectați-vă</ButtonText>
                  </StyledButton>}
                  {isSubmitting && <StyledButton style={{ width: 150 }} disabled={true} >
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>}
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
                    Nu aveți un cont?
                    <TextLink
                      style={{ marginLeft: 5 }}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <TextLinkContent>  Înregistrați-vă</TextLinkContent>
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
