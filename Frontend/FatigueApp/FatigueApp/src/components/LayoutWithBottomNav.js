import React from "react";
import { View, StyleSheet } from "react-native";
import BottomNavigation from "./BottomNavigation";

export default function LayoutWithBottomNav({ children }) {
  return (
    <View style={styles.container}>
      {children}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
