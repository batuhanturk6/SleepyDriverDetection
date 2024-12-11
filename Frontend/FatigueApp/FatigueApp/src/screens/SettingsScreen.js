import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingsScreen() {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [selectedAlarmSound, setSelectedAlarmSound] = useState("Default");
  const [spotifyLinked, setSpotifyLinked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [gestureControlEnabled, setGestureControlEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("userSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setAlarmEnabled(settings.alarmEnabled);
        setSelectedAlarmSound(settings.selectedAlarmSound);
        setSpotifyLinked(settings.spotifyLinked);
        setVolume(settings.volume);
        setGestureControlEnabled(settings.gestureControlEnabled);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load settings.");
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        alarmEnabled,
        selectedAlarmSound,
        spotifyLinked,
        volume,
        gestureControlEnabled,
      };
      await AsyncStorage.setItem("userSettings", JSON.stringify(settings));
      Alert.alert("Success", "Settings saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save settings.");
    }
  };

  const linkSpotify = () => {
    setSpotifyLinked(!spotifyLinked);
    Alert.alert(
      spotifyLinked ? "Spotify Unlinked" : "Spotify Linked",
      spotifyLinked
        ? "Spotify has been disconnected from your account."
        : "Spotify is now connected to your account."
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Alarm Settings */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="alarm-outline" size={24} color="#1E88E5" />
          <Text style={styles.cardTitle}>Alarm Settings</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Enable Alarm</Text>
            <Switch
              value={alarmEnabled}
              onValueChange={(value) => setAlarmEnabled(value)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alarm Sound</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Change Sound", "Implement sound picker.")
              }
            >
              <Text style={styles.link}>{selectedAlarmSound}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowWithIcon}>
            <Text style={styles.label}>Volume</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={volume}
              onValueChange={(value) => setVolume(value)}
              minimumTrackTintColor="#1E88E5"
              thumbTintColor="#1E88E5"
            />
            <Text>{volume}%</Text>
          </View>
        </View>
      </View>

      {/* Spotify Integration */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="musical-notes-outline" size={24} color="#1E88E5" />
          <Text style={styles.cardTitle}>Spotify Integration</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Link Spotify</Text>
            <Switch value={spotifyLinked} onValueChange={linkSpotify} />
          </View>
        </View>
      </View>

      {/* Gesture Control */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="hand-left-outline" size={24} color="#1E88E5" />
          <Text style={styles.cardTitle}>Gesture Controls</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Enable Gestures</Text>
            <Switch
              value={gestureControlEnabled}
              onValueChange={(value) => setGestureControlEnabled(value)}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    paddingTop: 70, 
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E88E5",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#1E88E5",
  },
  cardContent: {
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rowWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#4B5563",
  },
  link: {
    color: "#1E88E5",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#1E88E5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});