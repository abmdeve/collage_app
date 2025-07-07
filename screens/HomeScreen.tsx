import {
  FlatList,
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
import {
  BIRTHDAY_TEMPLATES,
  DESIGN_OPTIONS,
  GRID_LAYOUTS,
  TEMPLATES,
} from "../constants/layout";
import DesignOptionItem from "../components/DesignOptionItem";
import { DesignOptions, GridLayout, Template } from "../types";
import GridItem from "../components/GridItem";
import SeeAll from "../components/SeeAll";
import TemplateItem from "../components/TemplateItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/types/navigation";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const handleDesignOptionSelect = (item: DesignOptions) => {};

  const handleGridSelect = (grid: GridLayout) => {
    navigation.navigate("Collage", {
      selectedGrid: grid,
    });
  };

  const handleTemplateSelect = (item: Template) => {};

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

        {/* DESIGN OPTIONS */}
        <View style={styles.section}>
          <FlatList
            horizontal
            data={DESIGN_OPTIONS}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <DesignOptionItem
                item={item}
                onPress={() => handleDesignOptionSelect(item)}
              />
            )}
          />
        </View>

        {/* GRID AND ALL */}
        <View style={styles.section}>
          <SeeAll left="Grid" right="See All" />

          {/* GRID LAYOUT */}
          <FlatList
            horizontal
            data={GRID_LAYOUTS}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <GridItem item={item} onPress={() => handleGridSelect(item)} />
            )}
          />
        </View>

        {/* SPRING STORY AND ALL */}
        <View style={styles.section}>
          <SeeAll left="Spring Story" right="See All" />
          {/* GRID SPRING STORY LAYOUT */}
          <FlatList
            horizontal
            data={TEMPLATES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TemplateItem
                item={item}
                onPress={() => handleTemplateSelect(item)}
              />
            )}
          />
        </View>

        {/* HAPPY BIRTHDAY CARD */}
        <View style={styles.section}>
          <SeeAll left="Happy Birthday Caed" right="See All" />
          {/* HAPPY BIRTHDAY CARD LAYOUT */}
          <FlatList
            horizontal
            data={BIRTHDAY_TEMPLATES}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TemplateItem
                item={item}
                onPress={() => handleTemplateSelect(item)}
              />
            )}
          />
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
    marginRight: 6,
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
  listContainer: {
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#FF5A5F",
    fontWeight: "600",
  },
});
