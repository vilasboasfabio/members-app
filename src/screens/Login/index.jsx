import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useFonts } from "expo-font";
import { ArimaMadurai_100Thin } from "@expo-google-fonts/arima-madurai";
import { ReemKufiFun_400Regular } from "@expo-google-fonts/reem-kufi-fun";
import { Lora_400Regular } from "@expo-google-fonts/lora";

const LoginForm = ({ route, navigation }) => {
  const { setUserToken } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

  const [fontsLoaded] = useFonts({
    ArimaMadurai_100Thin,
    ReemKufiFun_400Regular,
    Lora_400Regular,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      const { token } = data;
      console.log("Token received: ", token);

      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      navigation.navigate("Drawer");
    } catch (error) {
      console.error("Login error: ", error);
      setErrorMessage("Invalid email or password");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPADIUM'S</Text>

      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require("../../../assets/logonova.png")}
        />
      </View>

      <View style={styles.textView}>
        <Text style={styles.text}>Faça login</Text>
      </View>

      <View style={styles.cardInput}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textInput}>Entre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("UserRegistration")}
      >
        <Text style={styles.registerText}>
          Não tem uma conta? Cadastre-se aqui
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
