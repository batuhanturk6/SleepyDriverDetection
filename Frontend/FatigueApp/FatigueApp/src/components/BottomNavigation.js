import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

export default function BottomNavigation({ routes, currentIndex, onNavigate }) {
  return (
    <View style={styles.navbar}>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          onPress={() => onNavigate(index)}
          style={styles.navItem} // Aktif elemanın arka planını değiştirmiyoruz
        >
          <Image
            source={route.img}
            style={[
              styles.navIcon,
              currentIndex === index && styles.navIconActive, // Aktif simge rengi
            ]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.navText,
              currentIndex === index && styles.navTextActive, // Aktif yazı rengi
            ]}
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Eşit aralıklarla elemanları dağıtır
    alignItems: "center", // Elemanları dikey olarak ortalar
    backgroundColor: "#FFFFFF", // Arka plan beyaz
    paddingVertical: 12, // Dikey padding
    borderTopLeftRadius: 20, // Yuvarlatılmış kenarlar
    borderTopRightRadius: 20,
    elevation: 5, // Android gölgesi
    shadowColor: "#000", // iOS gölge rengi
    shadowOffset: { width: 0, height: -2 }, // Gölge yönü
    shadowOpacity: 0.1, // Gölge opaklığı
    shadowRadius: 8, // Gölge genişliği
  },
  navItem: {
    alignItems: "center", // Elemanları ortalar
    justifyContent: "center", // Metin ve simgeyi dikeyde ortalar
    flex: 1, // Elemanların eşit genişlikte olmasını sağlar
    paddingVertical: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#9E9E9E", // Pasif ikon rengi
  },
  navIconActive: {
    tintColor: "#6200EE", // Aktif ikon rengi
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: "#9E9E9E", // Pasif yazı rengi
    fontWeight: "500",
    textAlign: "center", // Metni yatayda ortalar
  },
  navTextActive: {
    color: "#6200EE", // Aktif yazı rengi
    fontWeight: "700",
  },
});
