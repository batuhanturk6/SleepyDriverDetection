import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Token yönetimi için
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { theme } from "../core/theme";
import { getUserDetails, logoutUser } from "../api";
import { TouchableOpacity } from "react-native"; // Import TouchableOpacity

export default function Dashboard({ navigation, route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(1); // Başlangıçta "Home" seçili

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
      navigation.navigate("LoginScreen");
    }
  }, []);

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true);
      const userDetails = await getUserDetails(id);
      setUser(userDetails);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Logout API çağrısı
      await AsyncStorage.removeItem("userToken"); // Token temizleniyor (gerekirse)
      Alert.alert("Success", "Logged out successfully.");
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleNavigation = (selectedIndex) => {
    setIndex(selectedIndex);
    switch (routes[selectedIndex].key) {
      case "home":
        break; // Home sayfasında herhangi bir işlem yapılmaz
      case "editProfile":
        navigation.navigate("EditProfileScreen", { user });
        break;
      case "logout":
        handleLogout();
        break;
      case "detectCrash":
        navigation.navigate("CrashDetection"); // CrashDetection ekranına yönlendirme
        break;
      default:
        break;
    }
  };
  

  if (loading) {
    return (
      <Background>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </Background>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Üst Kısım: Logo ve Kullanıcı Bilgisi */}
        <Logo />
        <Header style={styles.header}>Welcome, {user?.name || "User"}!</Header>

        {/* Kullanıcı Kartı */}
        <Card style={styles.userCard}>
          <Card.Title
            title={`${user?.name || ""} ${user?.surname || ""}`}
            subtitle={`Email: ${user?.email || ""}`}
            left={(props) => (
              <Avatar.Text
                {...props}
                label={user?.name?.charAt(0) || "U"}
                style={styles.avatar}
              />
            )}
          />
          <Card.Content>
            <Text style={styles.userInfo}>Age: {user?.age || "N/A"}</Text>
          </Card.Content>
        </Card>

        {/* Özellikler Bölümü */}
        <Text style={styles.sectionHeader}>Your Features</Text>
        <View style={styles.featuresContainer}>
          <Card style={styles.featureCard}>
            <Card.Title
              title="Manage Preferences"
              subtitle="Feature 1"
              left={(props) => (
                <Avatar.Icon {...props} icon="cog" style={styles.featureIcon} />
              )}
            />
          </Card>
          <Card style={styles.featureCard}>
            <Card.Title
              title="Track Activities"
              subtitle="Feature 2"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="chart-line"
                  style={styles.featureIcon}
                />
              )}
            />
          </Card>
          {/* Yeni Özellik: Detect Fatigue */}
          <Card style={styles.featureCard}>
          <TouchableOpacity onPress={() => navigation.navigate("FatigueDetection")}>
            <Card.Title
              title="Detect Fatigue"
              subtitle="Feature 3"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="eye-outline" // Yorgunluk için uygun bir ikon
                  style={styles.featureIcon}
                />
              )}
            />
          </TouchableOpacity>
        </Card>
          {/* Yeni Özellik: Detect Crash */}
          {/* Detect Crash Kartı */}
          <Card
            style={styles.featureCard}
            onPress={() => navigation.navigate("CrashDetection")} // Tıklanıldığında yönlendir
          >
            <Card.Title
              title="Detect Crash"
              subtitle="Feature 4"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="car" // Çarpışma algılama için uygun bir ikon
                  style={styles.featureIcon}
                />
              )}
            />
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
    paddingTop: 50, // 50px aşağıya çekme
  },
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: "center",
    paddingTop: 50, // 50px aşağıya çekme
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: theme.colors.secondary,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 10,
  },
  userCard: {
    width: "90%",
    marginVertical: 20,
    backgroundColor: theme.colors.surface,
    elevation: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  userInfo: {
    fontSize: 16,
    marginTop: 8,
    color: theme.colors.primary,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 20,
  },
  featuresContainer: {
    width: "90%",
  },
  featureCard: {
    backgroundColor: theme.colors.background,
    marginBottom: 15,
    elevation: 3,
    borderRadius: 10,
  },
  featureIcon: {
    backgroundColor: theme.colors.accent,
  },
});
