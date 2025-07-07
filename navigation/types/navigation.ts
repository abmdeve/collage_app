import { RouteProp } from "@react-navigation/native";
import { GridLayout } from "../../types";

export type MainStackParamList = {
  Collage: { selectedGrid: GridLayout };
  HomeScreen: undefined;
  TemplatePreview: undefined;
};

export type CollageRouteProp = RouteProp<MainStackParamList, "Collage">;
export type HomeScreenRouteProp = RouteProp<MainStackParamList, "HomeScreen">;
export type TemplatePreviewRouteProp = RouteProp<
  MainStackParamList,
  "TemplatePreview"
>;
