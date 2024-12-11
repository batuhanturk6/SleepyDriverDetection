import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Title, Paragraph, Avatar } from "react-native-paper";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={120}
        source={require("../assets/logo.png")} // Update the path to your logo
        style={styles.logo}
      />
      <Title style={styles.title}>Welcome to Sleepy Driver Detection</Title>
      <Paragraph style={styles.paragraph}>
        Stay safe and alert with our real-time driver fatigue monitoring app.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
        style={[styles.button, styles.outlineButton]}
        contentStyle={styles.buttonContent}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
  outlineButton: {
    borderColor: "#6200ee",
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 10,
  },
});
