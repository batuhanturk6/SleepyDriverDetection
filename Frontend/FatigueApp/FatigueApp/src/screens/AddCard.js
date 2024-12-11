import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddCard() {
  const navigation = useNavigation();
  const route = useRoute(); // Use route to access params

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timing, setTiming] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [nextTake, setNextTake] = useState("");

  const handleAddMedication = () => {
    const newMedication = {
      name,
      description,
      timing,
      dosage,
      frequency,
      nextTake,
    };
    route.params?.addMedication(newMedication); // Access addMedication safely
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Timing"
        value={timing}
        onChangeText={setTiming}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dosage}
        onChangeText={setDosage}
      />
      <TextInput
        style={styles.input}
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Next Take"
        value={nextTake}
        onChangeText={setNextTake}
      />
      <Button title="Add Medication" onPress={handleAddMedication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
