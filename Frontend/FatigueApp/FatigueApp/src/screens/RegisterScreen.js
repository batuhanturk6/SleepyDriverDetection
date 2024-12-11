import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { registerUser } from "../api"; // registerUser API fonksiyonunu içe aktar

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [surname, setSurname] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [age, setAge] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false); // Kayıt sırasında yüklenme durumu

  const onSignUpPressed = async () => {
    // Alanların doğrulanması
    const nameError = nameValidator(name.value);
    const surnameError = nameValidator(surname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const ageError = isNaN(age.value) || age.value <= 0 ? "Invalid age" : "";

    if (nameError || surnameError || emailError || passwordError || ageError) {
      setName({ ...name, error: nameError });
      setSurname({ ...surname, error: surnameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setAge({ ...age, error: ageError });
      return;
    }

    try {
      setLoading(true); // Yüklenme durumunu başlat
      const userData = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
        age: parseInt(age.value),
      };
      const response = await registerUser(userData); // Backend ile kayıt işlemi
      setLoading(false); // Yüklenme durumunu durdur
      Alert.alert("Registration Successful", `Welcome, ${response.name}!`);
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen", params: { user: response } }], // Dashboard'a yönlendir
      });
    } catch (error) {
      setLoading(false); // Hata durumunda yüklenme durumunu durdur
      Alert.alert("Registration Failed", error.message || "An error occurred.");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Surname"
        returnKeyType="next"
        value={surname.value}
        onChangeText={(text) => setSurname({ value: text, error: "" })}
        error={!!surname.error}
        errorText={surname.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Age"
        returnKeyType="done"
        value={age.value}
        onChangeText={(text) => setAge({ value: text, error: "" })}
        error={!!age.error}
        errorText={age.error}
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        loading={loading}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
