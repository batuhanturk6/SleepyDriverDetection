import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { updateUserDetails, getUserDetails } from "../api";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../components/BottomNavigation";

export default function EditProfileScreen({ navigation, route }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "editProfile", title: "Profile", img: require("../assets/edit-profile.png") },
    { key: "home", title: "Home", img: require("../assets/home.png") },
    { key: "logout", title: "Logout", img: require("../assets/logout.png") },
  ];

  useEffect(() => {
    const userId = route.params?.Id;
    if (userId) {
      fetchUserDetails(userId);
    } else {
      Alert.alert("Error", "User ID is missing.");
      navigation.goBack();
    }
  }, []);

  const fetchUserDetails = async (Id) => {
    try {
      setLoading(true);
      const details = await getUserDetails(Id);
      setUserDetails(details);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateUserDetails(route.params.Id, userDetails);
      Alert.alert("Success", "Your profile has been updated.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (selectedIndex) => {
    setIndex(selectedIndex);
    switch (routes[selectedIndex].key) {
      case "home":
        navigation.navigate("Dashboard");
        break;
      case "editProfile":
        break;
      case "settings":
        navigation.navigate("SettingsScreen");
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avatarContainer}>
          <Icon name="person-circle-outline" size={100} color="#4A90E2" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={userDetails.name}
            onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
            placeholder="Enter your first name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={userDetails.surname}
            onChangeText={(text) =>
              setUserDetails({ ...userDetails, surname: text })
            }
            placeholder="Enter your last name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userDetails.email}
            onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={String(userDetails.age)}
            onChangeText={(text) => setUserDetails({ ...userDetails, age: text })}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation
        routes={routes}
        currentIndex={index}
        onNavigate={handleNavigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
  },
  scrollViewContent: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
