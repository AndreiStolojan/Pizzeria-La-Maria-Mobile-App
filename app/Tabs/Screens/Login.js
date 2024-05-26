import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  SubTitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  MsgBox,
  StyledButton,
  ButtonText,
  Colors,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../../../styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ActivityIndicator } from "react-native";
import { Octicons, FontAwesome } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../Components/KeyboardAvoidingWrapper";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const { red_logo, darkLight, primary, danger } = Colors;

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
        <Octicons name={icon} size={30} color={red_logo} />
      </LeftIcon>
      <StyledInputLabel style={{ color: primary }}>{label1}</StyledInputLabel>
      <StyledTextInput {...props} placeholder={label1} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Octicons
            name={hidePassword ? "eye-closed" : "eye"}
            size={25}
            color={red_logo}
          />
        </RightIcon>
      )}
    </View>
  );
};

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigation = useNavigation();

  const handleLogin = (values, setSubmitting) => {
    const { email, password } = values;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Autentificarea a fost realizata cu emailul: ", email);
        navigation.replace("Profil"); // Navigare către pagina de bun venit
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Adresa de email sau parola sunt incorecte");
        setMessageType("FAILED");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     // Inițializarea modulelor Google Sign-In
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.configure({
  //       webClientId: '997153372756-aujnbpcvmkgkqomcp87ti178rf2e3p53.apps.googleusercontent.com', // ID-ul clientului web din consola Firebase
  //       offlineAccess: true,
  //       forceCodeForRefreshToken: true,
  //     });

  //     // Deschiderea ecranului de autentificare Google
  //     const userInfo = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

  //     // Autentificarea cu credențialele Google
  //     await auth().signInWithCredential(googleCredential);

  //     console.log('Autentificare cu Google reușită:', userInfo);

  //     // Navigare către pagina de profil sau altă destinație dorită
  //     navigation.replace("Profil");
  //   } catch (error) {
  //     console.error('Eroare la autentificarea cu Google:', error);
  //   }
  // };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../../../assets/images/pizzerie_logo_copy.png")}
          />
          <SubTitle>Conectați-vă</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email === "" || values.password === "") {
                setMessage("Completeaza toate campurile!");
                setMessageType("FAILED");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
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
              {message && (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <FontAwesome
      name={messageType === 'FAILED' ? 'exclamation-circle' : 'check-circle'}
      size={20}
      color={messageType === 'FAILED' ? 'orange' : 'green'}
    />
    <Text style={{ marginLeft: 10, color: messageType === 'FAILED' ? 'orange' : 'green' }}>
      {message}
    </Text>
  </View>
)}


                <View>
                  <StyledButton
                    style={{ width: 150 }}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <ButtonText>Conectați-vă</ButtonText>
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
                      onPress={() => navigation.replace("SignUp")}
                    >
                      <TextLinkContent> Înregistrați-vă</TextLinkContent>
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
