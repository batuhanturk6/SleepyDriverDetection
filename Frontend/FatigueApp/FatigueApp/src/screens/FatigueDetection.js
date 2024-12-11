import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, FlatList } from "react-native";
import { Card, Avatar, Button, ProgressBar } from "react-native-paper";

export default function FatigueDetection({ navigation }) {
  const [fatigueLevel, setFatigueLevel] = useState(0); // 0: Normal, 1: Moderate, 2: High
  const [eventLogs, setEventLogs] = useState([]);

  useEffect(() => {
    // Simulate fatigue monitoring updates
    const interval = setInterval(() => {
      const randomFatigue = Math.floor(Math.random() * 3); // Random fatigue level
      setFatigueLevel(randomFatigue);
      logEvent(randomFatigue);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const logEvent = (level) => {
    const severity = ["Normal", "Moderate", "High"];
    if (level > 0) {
      const timestamp = new Date().toLocaleTimeString();
      const event = {
        id: `${Date.now()}`,
        time: timestamp,
        severity: severity[level],
        message: `${severity[level]} fatigue detected.`,
      };
      setEventLogs((prevLogs) => [event, ...prevLogs]);
      if (level === 2) triggerAlarm();
    }
  };

  const triggerAlarm = () => {
    Alert.alert(
      "High Fatigue Alert!",
      "Drowsiness detected. Please take a break immediately.",
      [
        { text: "Acknowledge", onPress: () => console.log("Alarm acknowledged") },
        { text: "Ignore", style: "cancel" },
      ]
    );
  };

  const fatigueMeterColors = ["#4CAF50", "#FFC107", "#F44336"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fatigue Detection</Text>

      {/* Fatigue Status */}
      <Card style={styles.statusCard}>
        <Card.Title
          title="Current Fatigue Level"
          subtitle={["Normal", "Moderate", "High"][fatigueLevel]}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="eye"
              style={{ backgroundColor: fatigueMeterColors[fatigueLevel] }}
            />
          )}
        />
        <ProgressBar
          progress={fatigueLevel / 2}
          color={fatigueMeterColors[fatigueLevel]}
          style={styles.progressBar}
        />
      </Card>

      {/* Actions */}
      <Text style={styles.sectionHeader}>Actions</Text>
      <TouchableOpacity style={styles.actionButton} onPress={triggerAlarm}>
        <Text style={styles.actionText}>Simulate Alarm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.actionText}>Go Back</Text>
      </TouchableOpacity>

      {/* Event Logs */}
      <Text style={styles.sectionHeader}>Event Logs</Text>
      <FlatList
        data={eventLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.logCard}>
            <Card.Title
              title={`Time: ${item.time}`}
              subtitle={item.message}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="alert-circle"
                  style={{
                    backgroundColor:
                      item.severity === "High" ? "#F44336" : "#FFC107",
                  }}
                />
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 90, 
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200EE",
  },
  statusCard: {
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
  progressBar: {
    marginTop: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#6200EE",
  },
  actionButton: {
    marginBottom: 15,
    backgroundColor: "#6200EE",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logCard: {
    marginBottom: 10,
    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
});
