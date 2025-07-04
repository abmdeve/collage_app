import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DesignOptions } from "../types";

type Props = {
  item: DesignOptions;
  onPress: () => void;
};

const DesignOptionItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.designOptionItem}>
      <Ionicons name={item.icon} size={24} color={"#888"} />

      <Text style={styles.designOptionLabel}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default DesignOptionItem;

const styles = StyleSheet.create({
  designOptionItem: {
    alignItems: "center",
    marginRight: 20,
  },
  designOptionLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
  },
});
