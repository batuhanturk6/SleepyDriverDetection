import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar, Card, Button } from "react-native-paper";
import * as Location from 'expo-location';

export default function CrashDetection({ navigation }) {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(new Animated.Value(0));
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "John Doe", phone: "+123456789" },
    { id: 2, name: "Jane Doe", phone: "+987654321" },
    { id: 3, name: "Jane Smith", phone: "+987654321" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [speed, setSpeed] = useState(null);
  const [previousSpeed, setPreviousSpeed] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature."
        );
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    let subscription;
    let speedCheckInterval;

    const startMonitoring = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to monitor crashes."
        );
        return;
      }

      if (isMonitoring) {
        try {
          subscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              distanceInterval: 1,
            },
            (position) => {
              const currentSpeed = (position.coords.speed * 3.6).toFixed(2); // m/s to km/h
              setSpeed(currentSpeed);
            }
          );

          speedCheckInterval = setInterval(() => {
            if (speed !== null && previousSpeed !== null && previousSpeed - speed >= 4) {
                alertCrashDetected(); 
            }
            setPreviousSpeed(speed);
          }, 1000); // Check every 5 seconds
        } catch (error) {
          Alert.alert("Error", "Unable to monitor position: " + error.message);
        }
      } else {
        setSpeed(null);
        setPreviousSpeed(null);
      }
    };

    startMonitoring();

    return () => {
      if (subscription) {
        subscription.remove();
      }
      if (speedCheckInterval) {
        clearInterval(speedCheckInterval);
      }
    };
  }, [isMonitoring, speed, previousSpeed]);

  useEffect(() => {
    if (speed === null) {
      setPreviousSpeed(null);
    }
  }, [speed]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#FFFFFF"],
  });

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const deleteContact = (id) => {
    setEmergencyContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    Alert.alert("Contact Deleted", "The emergency contact has been removed.");
  };
  const alertCrashDetected = () => {
    let timeoutId;
  
    // Kullanıcının mesaj göndermesine yönelik bir simülasyon
    const sendEmergencyMessage = (details) => {
      const emergencyContact = emergencyContacts.find((contact) => contact.id === 1);
      if (emergencyContact) {
        console.log(`Message sent to ${emergencyContact.name}: Crash detected! Details: ${details}`);
        Alert.alert(
          "Message Sent",
          `Emergency message with details ("${details}") has been sent to ${emergencyContact.name}. They will contact you shortly.`
        );
      }
    };
  
    const askForDetails = () => {
      Alert.alert(
        "Injury Details",
        "Please select the type of injury or situation:",
        [
          {
            text: "Severe Injury",
            onPress: () => sendEmergencyMessage("Severe Injury"),
          },
          {
            text: "Minor Injury",
            onPress: () => sendEmergencyMessage("Minor Injury"),
          },
          {
            text: "No Injury, Just Shock",
            onPress: () => sendEmergencyMessage("No Injury, Just Shock"),
          },
        ],
        { cancelable: false }
      );
    };
  
    // Zaman aşımı ile mesaj gönderme
    timeoutId = setTimeout(() => {
      sendEmergencyMessage("Automatic alert - no details provided");
      Alert.alert(
        "Timeout",
        "You did not respond within 15 seconds. An emergency message has been sent automatically."
      );
    }, 15000); // 15 saniye
  
    // Kullanıcıya kaza bildirimi uyarısı
    Alert.alert(
      "Crash Detected",
      "A possible crash has been detected. Did you have an accident?\n\n" +
        "If you don't respond within 15 seconds, an emergency message will be sent automatically.",
      [
        {
          text: "Yes, I had an accident",
          onPress: () => {
            clearTimeout(timeoutId); // Zaman aşımını temizle
            askForDetails(); // Detayları sormak için yeni alert'i başlat
          },
        },
        {
          text: "No, I am fine",
          style: "cancel",
          onPress: () => {
            clearTimeout(timeoutId); // Zaman aşımını temizle
            Alert.alert(
              "No Action Taken",
              "We're glad to know you're safe! Stay alert and drive carefully."
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  

  const addContact = () => {
    if (newContactName && newContactPhone) {
      setEmergencyContacts((prevContacts) => [
        ...prevContacts,
        { id: Date.now(), name: newContactName, phone: newContactPhone },
      ]);
      setNewContactName("");
      setNewContactPhone("");
      setModalVisible(false);
      Alert.alert("Contact Added", "The new emergency contact has been added.");
    } else {
      Alert.alert("Error", "Please provide both name and phone number.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={30} color="#1F2937" />
      </TouchableOpacity>

      <Text style={styles.header}>Crash Detection</Text>
      <Text style={styles.description}>
        Real-time crash detection and emergency alerts system.
      </Text>

      <Animated.View style={[styles.statusCard, { backgroundColor: interpolatedBackgroundColor }]}>
        <Card.Title
          title="Monitoring Status"
          subtitle={isMonitoring ? "Active" : "Inactive"}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={isMonitoring ? "check-circle" : "alert-circle-outline"}
              style={{ backgroundColor: "transparent" }}
              color={isMonitoring ? "#4CAF50" : "#EF4444"}
              size={50}
            />
          )}
          titleStyle={{
            color: isMonitoring ? "#4CAF50" : "#F44336",
            fontWeight: "bold",
          }}
          subtitleStyle={{
            color: isMonitoring ? "#4CAF50" : "#F44336",
          }}
        />
        {isMonitoring && speed !== null && (
          <Text style={styles.speedText}>Current Speed: {speed} km/h</Text>
        )}
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isMonitoring ? styles.stopButton : styles.startButton]}
          onPress={isMonitoring ? stopMonitoring : startMonitoring}
        >
          <Text style={styles.buttonText}>{isMonitoring ? "Stop Monitoring" : "Start Monitoring"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Emergency Contacts</Text>
      {emergencyContacts.map((contact) => (
        <Card key={contact.id} style={styles.contactCard}>
          <Card.Title
            title={contact.name}
            subtitle={`Phone: ${contact.phone}`}
            left={(props) => <Avatar.Icon {...props} icon="phone" />}
            right={(props) => (
              <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteContact(contact.id)}>
                <Icon name="delete" size={24} color="#EF4444" />
              </TouchableOpacity>
            )}
          />
        </Card>
      ))}

      <Button
        mode="contained"
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        Add Emergency Contact
      </Button>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={[styles.modalContainer, { marginTop: -200 }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newContactName}
              onChangeText={setNewContactName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContactPhone}
              onChangeText={setNewContactPhone}
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <Button onPress={() => setModalVisible(false)} mode="outlined">
                Cancel
              </Button>
              <Button onPress={addContact} mode="contained">
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
    paddingTop: 70,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1F2937",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#4B5563",
  },
  statusCard: {
    marginBottom: 20,
    borderRadius: 16, // Daha yumuşak köşeler
    padding: 15, // İçerik için daha geniş alan
    borderWidth: 1, // İnce ve zarif sınır
    borderColor: "#D1D5DB", // Hafif gri sınır
    backgroundColor: "#FFFFFF", // Kartın arka plan rengi
    shadowColor: "#000", // Gölge rengi
    shadowOffset: {
      width: 0,
      height: 4, // Dikey gölge
    },
    shadowOpacity: 0.1, // Hafif gölge görünürlüğü
    shadowRadius: 10, // Gölge yayılma mesafesi
    elevation: 6, // Android için gölge yüksekliği
  },  
  speedText: {
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  startButton: {
    backgroundColor: "#10B981",
  },
  stopButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
    color: "#1F2937",
  },
  contactCard: {
    marginBottom: 10,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  deleteIcon: {
    marginRight: 15,
  },
  addButton: {
    marginVertical: 10,
    backgroundColor: "#3B82F6",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
