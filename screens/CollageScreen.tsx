import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CollageRouteProp,
  MainStackParamList,
} from "../navigation/types/navigation";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as MadiaLibrairy from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { captureRef } from "react-native-view-shot";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CANVAS_SIZE = SCREEN_WIDTH - 40;

const ASPECT_RATIOS = [
  { name: "Free Crop", icon: "crop-outline", ratio: null },
  { name: "1:1", icon: "square-outline", ratio: 1 / 1 },
  { name: "4:5", icon: "crop-outline", ratio: 4 / 5 },
  { name: "3:4", icon: "crop-outline", ratio: 3 / 4 },
  { name: "9:16", icon: "crop-outline", ratio: 9 / 16 },
  { name: "16:9", icon: "crop-outline", ratio: 16 / 9 },
  { name: "3:2", icon: "crop-outline", ratio: 3 / 2 },
  { name: "2:3", icon: "crop-outline", ratio: 2 / 3 },
];

const CollageScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const route = useRoute<CollageRouteProp>();

  const { selectedGrid } = route.params;

  const totalContainers = selectedGrid.layout
    .flat()
    .filter((v, i, a) => a.indexOf(v) === i).length;
  const [images, setImages] = useState<(string | null)[]>(
    Array(totalContainers).fill(null)
  );
  const layoutRef = useRef<View>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<number | null>(null);
  const [selectedContainerIndex, setSelectedContainerIndex] = useState<
    number | null
  >(null);
  const [cropPosition, setCropPosition] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [isDownLoading, setIsDownLoading] = useState(false);

  const pickImage = async (containerIndex: number) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission to access gallery is required!"
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setSelectedContainerIndex(containerIndex);
      setModalVisible(true);
    }
  };

  const renderLayout = () => {
    const layoutStyle = {
      ...styles.layoutContainer,
      ...(isDownLoading && styles.noBorder),
      ...(selectedGrid.shape == "heart" || selectedGrid.shape == "clover"
        ? { width: CANVAS_SIZE * 0.7, height: CANVAS_SIZE * 0.7 }
        : selectedGrid.shape == "circle"
        ? {
            width:
              CANVAS_SIZE * 0.2 * selectedGrid.layout[0].length +
              20 * (selectedGrid.layout[0].length - 1),
            height: CANVAS_SIZE * 0.2,
          }
        : selectedGrid.shape === "hexagon" && selectedGrid.cols !== 1
        ? {
            width:
              CANVAS_SIZE * 0.25 * selectedGrid.layout[0].length +
              10 * (selectedGrid.layout[0].length - 1),
            height: CANVAS_SIZE * 0.28,
          }
        : {}),
    };

    switch (selectedGrid.shape) {
      case "heart":
        return (
          <View style={layoutStyle} ref={layoutRef} collapsable={false}>
            <TouchableOpacity
              onPress={() => pickImage(0)}
              style={[styles.heartShape, isDownLoading && styles.noBorder]}
            >
              {images[0]} ? (
              <Image
                source={{ uri: images[0] }}
                style={[
                  styles.image,
                  styles.heartShape,
                  isDownLoading && { borderWidth: 0 },
                ]}
              />
              ) : (
              <Ionicons name="add" size={40} color={"#888"} />)
            </TouchableOpacity>
          </View>
        );

      case "circle":
        return (
          <View style={layoutStyle} ref={layoutRef} collapsable={false}>
            {selectedGrid.layout[0].map((_, j) => (
              <TouchableOpacity
                key={j}
                style={[
                  styles.circleShape,
                  { marginHorizontal: 10 },
                  isDownLoading && styles.noBorder,
                ]}
                onPress={() => pickImage(j)}
              >
                {images[j]} ? (
                <Image
                  source={{ uri: images[j] }}
                  style={[
                    styles.image,
                    styles.circleShape,
                    isDownLoading && { borderWidth: 0 },
                  ]}
                />
                ) : (
                <Ionicons name="add" size={40} color={"#888"} />)
              </TouchableOpacity>
            ))}
          </View>
        );

      case "clover":
        return (
          <View style={layoutStyle} ref={layoutRef} collapsable={false}>
            <TouchableOpacity
              onPress={() => pickImage(0)}
              style={[styles.heartShape, isDownLoading && styles.noBorder]}
            >
              {images[0]} ? (
              <Image
                source={{ uri: images[0] }}
                style={[
                  styles.image,
                  styles.cloverShape,
                  isDownLoading && { borderWidth: 0 },
                ]}
              />
              ) : (
              <Ionicons name="add" size={40} color={"#888"} />)
            </TouchableOpacity>
          </View>
        );

      case "hexagon":
        return selectedGrid.cols === 1 ? (
          <View
            style={[
              layoutStyle,
              { width: CANVAS_SIZE * 0.25, height: CANVAS_SIZE * 0.23 },
            ]}
            ref={layoutRef}
            collapsable={false}
          >
            <TouchableOpacity
              onPress={() => pickImage(j)}
              style={[styles.hexagonShape, isDownLoading && styles.noBorder]}
            >
              {images[0]} ? (
              <Image
                source={{ uri: images[0] }}
                style={[
                  styles.image,
                  styles.hexagonShape,
                  isDownLoading && { borderWidth: 0 },
                ]}
              />
              ) : (
              <Ionicons name="add" size={30} color={"#888"} />)
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[layoutStyle]} ref={layoutRef} collapsable={false}>
            {selectedGrid.layout[0].map((_, j) => (
              <TouchableOpacity
                onPress={() => pickImage(j)}
                key={j}
                style={[
                  styles.circleShape,
                  { marginHorizontal: 5 },
                  isDownLoading && styles.noBorder,
                ]}
              >
                {images[j]} ? (
                <Image
                  source={{ uri: images[j] }}
                  style={[
                    styles.image,
                    styles.hexagonShape,
                    isDownLoading && { borderWidth: 0 },
                  ]}
                />
                ) : (
                <Ionicons name="add" size={40} color={"#888"} />)
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return (
          <View style={layoutStyle} ref={layoutRef} collapsable={false}>
            {selectedGrid.layout.map((row, i) => (
              <View key={i} style={styles.gridRow}>
                {row.map((cell, j) => {
                  const containerIndex =
                    selectedGrid.layout
                      .slice(0, 1)
                      .flat()
                      .filter((v, idx, a) => a.indexOf(v) === idx).length - 1;

                  return (
                    <TouchableOpacity
                      key={j}
                      onPress={() => pickImage(containerIndex)}
                      style={[
                        styles.gridCell,
                        {
                          flex:
                            Math.max(...row.filter((_, idx) => idx !== 1)) ===
                            cell
                              ? 2
                              : 1,
                        },
                        isDownLoading && styles.noBorder,
                      ]}
                    >
                      {images[containerIndex] ? (
                        <Image
                          source={{ uri: images[containerIndex] }}
                          style={[
                            styles.image,
                            isDownLoading && { borderWidth: 0 },
                          ]}
                        />
                      ) : (
                        <Ionicons name="add" size={40} color={"#888"} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        );
    }
  };

  const renderAspectRatioItem = ({
    item,
  }: {
    item: { name: string; icon: string; ratio: number | null };
  }) => {
    return (
      <TouchableOpacity>
        <Ionicons
          name={item.name}
          size={24}
          color={
            selectedRatio == item.ratio ||
            (item.name == "Free crop" && selectedRatio == null)
              ? "#FF5A5F"
              : "#888"
          }
        />
        <Text
          style={[
            styles.label,
            selectedRatio == item.ratio ||
            (item.name == "Free crop" && selectedRatio == null)
              ? styles.selectedRatioLabel
              : {},
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>

        <View style={styles.topBarActions}>
          <TouchableOpacity>
            <Ionicons name="arrow-undo-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="arrow-redo-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* RENDER LAYOUT */}
      <View style={[styles.canvasArea, isDownLoading && styles.noBackground]}>
        {renderLayout()}
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.prevContainer}>
              {previewImage && (
                <View style={[styles.imageWrapper, selectedRatio !== null && {aspectRatio: selectedRatio}]}>
                  <View>
                    <Image
                      style={[
                        styles.previewImage,
                        selectedRatio !== null
                          ? { aspectRatio: selectedRatio }
                          : { width: "100%", height: "100%" },
                      ]}
                      source={{ uri: previewImage }}
                    />
                  </View>
                  {selectedRatio == null && (
                    <>
                      <View style={[styles.cropHandle, styles.topHandle]}>
                        <View style={styles.handleLine} />
                      </View>
                      <View style={[styles.cropHandle, styles.topHandle]}>
                        <View style={styles.handleLine} />
                      </View>
                      <View style={[styles.cropHandle, styles.topHandle]}>
                        <View style={styles.handleLine} />
                      </View>
                      <View style={[styles.cropHandle, styles.topHandle]}>
                        <View style={styles.handleLine} />
                      </View>
                      <View style={[styles.cropHandle, styles.topHandle]}>
                        <View style={styles.handleLine} />
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>

            {/* RATIO LISTS */}
            <View style={styles.ratioContainer}>
              <FlatList
                data={ASPECT_RATIOS}
                horizontal
                renderItem={renderAspectRatioItem}
                keyExtractor={(item) => item.name}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.ratioList}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CollageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  topBarActions: {
    flexDirection: "row",
    gap: 10,
  },
  canvasArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "#F5F5F5",
    // backgroundColor: "red",
  },
  noBackground: {
    backgroundColor: "transparent",
    padding: 0,
  },
  layoutContainer: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  noBorder: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
  },
  gridCell: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartShape: {
    width: CANVAS_SIZE * 0.7,
    height: CANVAS_SIZE * 0.7,
    borderRadius: CANVAS_SIZE * 0.35,
    transform: [{ rotate: "45deg" }],
    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
  },
  circleShape: {
    width: CANVAS_SIZE * 0.2,
    height: CANVAS_SIZE * 0.2,
    borderRadius: CANVAS_SIZE * 0.1,
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cloverShape: {
    width: CANVAS_SIZE * 0.7,
    height: CANVAS_SIZE * 0.7,
    borderRadius: CANVAS_SIZE * 0.35,
    position: "relative",
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  hexagonShape: {
    width: CANVAS_SIZE * 0.25,
    height: CANVAS_SIZE * 0.28,
    borderWidth: 2,
    borderColor: "#1E90FF",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {},
  handleLine: {},
  cropHandle: {},
  topHandle: {},
  bottomHandle: {},
  rightHandle: {},
  leftHandle: {},
  ratioList: {},
  ratioContainer: {},
  label: {},
  modalContainer: {},
  modalContent: {},
  prevContainer: {},
  selectedRatioLabel: {},
  imageWrapper: {},
});
