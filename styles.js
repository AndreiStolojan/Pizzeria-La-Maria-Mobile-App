import styled from "styled-components/native";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { version } from "react";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1f2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  rems_color: "#064B52",
  gri: "#6EB5D2",
};

const {
  primary,
  secondary,
  tertiary,
  darkLight,
  brand,
  green,
  red,
  rems_color,
  gri,
} = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${rems_color};
  padding-top: ${StatusBarHeight + 30}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${primary};

  ${(props) => props.welcome && `
    font-size: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${primary};
  margin: 10px;

  ${(props) => props.welcome && `
    margin-bottom: 5px;
    font-weight: normal;  
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${(props) => (props.google ? "#4285F4" : "#6EB5D2")};
  justify-content: center;
  border-radius: 25px; /* Marginile butonului rotunjite */
  align-items: center;
  margin: 10px; /* Marginile între butoane */
  height: 55px; /* Înălțimea butonului */
  width: 150px; /* Lățimea butonului */
  elevation: 5; /* Efect de umbră pentru o aparență tridimensională */
  align-self: center;

  flex-direction: ${(props) =>
    props.google
      ? "row"
      : "column"}; /* Așezarea iconului și a textului pentru butonul Google */
`;

export const ButtonText = styled.Text`
  color: ${(props) =>
    props.google
      ? "#FFFFFF"
      : "#FFFFFF"}; /* Text alb pentru butonul Google sau culoarea ta */
  font-size: 18px; /* Mărimea fontului */
  font-weight: bold; /* Textul bold */

  padding: ${(props) =>
    props.google
      ? "3px"
      : "0px"}; /* Spațiu între text și icon pentru butonul Google */
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${primary};
`;
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary}
  font-size: 15px;
`;

export const TextLink = styled.Text`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${gri};
  font-size: 17px;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
    background-color: ${rems_color};
    flex: 1;
    background-color: ${rems_color};
    
`


export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary}; /* Corectare aici */
    margin-bottom: 10px;
    margin-top: 10px;
`;


export const WelcomeImage = styled.Image`
    height: 50%;
    width: 140%
    
`