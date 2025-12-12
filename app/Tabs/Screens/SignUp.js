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
import { auth } from "../../../firebase"; // Importăm metoda de autentificare din firebase
import { useNavigation } from "@react-navigation/native"; // Importăm hook-ul useNavigation

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
      <StyledTextInput
        {...props}
      />

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

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async (values, { setSubmitting }) => {
    const { email, password, confirmPassword, fullName } = values;

    if (!email || !password || !confirmPassword || !fullName) {
      setError("Toate câmpurile sunt obligatorii!");
      setSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc!");
      setSubmitting(false);
      return;
    }

    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      await user.updateProfile({
        displayName: fullName,
      });
      console.log("Utilizatorul a fost înregistrat cu succes cu emailul:", email, "!");
      navigation.replace("Profil");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Adresa de email este deja înregistrată!");
      } else {
        setError(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageTitle>Creează-ți contul!</PageTitle>
          <SubTitle></SubTitle>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {error ? <MsgBox type="error">{error}</MsgBox> : null}
                <MyTextInput
                  label1="Nume Prenume"
                  icon="person"
                  placeholder="Stolojan Andrei"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                <MyTextInput
                  label1="Adresa de email"
                  icon="mail"
                  placeholder="pizzerialamaria@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label1="Parola"
                  icon="lock"
                  placeholder="*********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label1="Confirmarea Parolei"
                  icon="lock"
                  placeholder="*********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  <StyledButton style={{ width: 200 }} onPress={handleSubmit} disabled={isSubmitting}>
                    <ButtonText>Creează</ButtonText>
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
                    <TextLink onPress={() => navigation.replace("Login")}>
                      <TextLinkContent> Conectați-vă</TextLinkContent>
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
