import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavIcon from "../components/TopNavIcon";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.settingsIcon}>
            <Ionicons name="settings-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons
              style={styles.searchIcon}
              name="search-outline"
              size={24}
              color={"#888"}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Birthday, Love, Sale..."
            />
          </View>
          <TouchableOpacity style={styles.shopIcon}>
            <Ionicons name="storefront-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>

        {/* TOP NAV ICON */}
        <View style={styles.topNavIcons}>
          <TopNavIcon name="sparkles-outline" label="AI Tools" />
          <TopNavIcon name="cut-outline" label="AI Tools" />
          <TopNavIcon name="grid-outline" label="AI Tools" />
          <TopNavIcon name="happy-outline" label="AI Tools" />
          <TopNavIcon name="color-palette-outline" label="AI Tools" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginRight: 6,
  },
  settingsIcon: {
    marginRight: 6
  },
  shopIcon: {
    marginLeft: 8,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topNavIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
