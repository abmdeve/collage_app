import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Template } from "../types";

type Props = {
  item: Template;
  onPress: () => void;
};

const TemplateItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.templateItem}>
      <View style={styles.templatePreview}>
        <Image
          source={{ uri: item.image }}
          style={styles.templateImage}
          resizeMode="cover"
        />

        <View style={styles.freeBadge}>
          <Text style={styles.freeBadgeTitle}>Free</Text>
        </View>

        <Text style={styles.templateName}>{item.name} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  templateItem: {
    marginRight: 12,
  },
  templateImage: {
    width: 120,
    height: 200,
    borderRadius: 12,
  },
  templatePreview: {
    width: 120,
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  templateName: {
    position: "absolute",
    bottom: 8,
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    paddingVertical: 2,
    backgroundColor: "rgba(255, 255, 255, .8)",
  },
  freeBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freeBadgeTitle: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});
