import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: any;
  label: string;
};

const TopNavIcon = ({ label, name }: Props) => {
  return (
    <TouchableOpacity style={styles.topNavItem}>
      <View style={styles.topNavIconContainer}>
        <Ionicons name={name} size={24} color={"#fff"} />
      </View>
      <Text style={styles.topNavLabel}>{label} </Text>
    </TouchableOpacity>
  );
};

export default TopNavIcon;

const styles = StyleSheet.create({
  topNavItem: {
    alignItems: "center",
  },
  topNavIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF5A5F",
    justifyContent: "center",
    alignItems: "center",
  },

  topNavLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});
