import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
    left: string;
    right: string;
}

const SeeAll = ({left, right}: Props) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{left}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAll}>{right} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
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
