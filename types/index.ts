export type GridLayout = {
  id: string;
  name: string;
  shape?: "rect" | "heart" | "clover" | "hexagon" | "circle";
  rows: number;
  cols: number;
  layout: number[][];
};

export type Template = {
  id: string;
  name: string;
  image: string;
  placeholders: { x: number; y: number; height: number; width: number }[];
};

export type DesignOptions = {
  id: string;
  name: string;
  icon: any;
};
