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
import { auth } from '../../../firebase'; // Importăm metoda de autentificare din firebase
import { useNavigation } from "@react-navigation/native"; // Importăm hook-ul useNavigation

const { rems_color, darkLight, primary, danger } = Colors;

const MyTextInput = ({
  label1,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  setValue,
  value,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={rems_color} />
      </LeftIcon>
      <StyledInputLabel style={{ color: primary }}>{label1}</StyledInputLabel>
      <StyledTextInput
        {...props}
        onChangeText={text => setValue(text)}
        value={value}
      />

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

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Inițializăm hook-ul useNavigation pentru a obține obiectul de navigare

  const handleSignUp = () => {
    // Verificați dacă toate câmpurile sunt completate
    if (!email || !password || !confirmPassword || !fullName) {
      setError('Toate câmpurile sunt obligatorii!');
      return;
    }
  
    // Verificați dacă parolele coincid
    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc!');
      return;
    }
  
    // Creați utilizatorul în Firebase cu numele complet inclus
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        
        // Adăugați numele complet în obiectul de date al utilizatorului
        return user.updateProfile({
          displayName: fullName
        });
      })
      .then(() => {
        console.log("Utilizatorul a fost înregistrat cu succes cu emailul:", email, "!");
        navigation.navigate("Welcome");
        // Aici poți adăuga redirecționarea către pagina de bun venit sau alte acțiuni
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('Adresa de email este deja înregistrată!');
        } else {
          setError(error.message);
        }
      });
  };
  

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer>
          <PageTitle>Creează-ți contul!</PageTitle>
          <SubTitle></SubTitle>

          <Formik
            initialValues={{ fullName: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                {error ? <MsgBox type="error">{error}</MsgBox> : null}
                <MyTextInput
                  label1="Nume Prenume"
                  icon="person"
                  placeholder="Stolojan Andrei"
                  placeholderTextColor={darkLight}
                  setValue={setFullName}
                  value={fullName}
                />
                <MyTextInput
                  label1="Adresa de email"
                  icon="mail"
                  placeholder="pizzerialamaria@gmail.com"
                  placeholderTextColor={darkLight}
                  setValue={setEmail}
                  value={email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label1="Parola"
                  icon="lock"
                  placeholder="*********"
                  placeholderTextColor={darkLight}
                  setValue={setPassword}
                  value={password}
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
                  setValue={setConfirmPassword}
                  value={confirmPassword}
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
                  <StyledButton style={{ width: 200 }} onPress={handleSignUp}>
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
                    <TextLink
                      onPress={() => navigation.replace("Login")}
                    >
                      <TextLinkContent>  Conectați-vă</TextLinkContent>
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
