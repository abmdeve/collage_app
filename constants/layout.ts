export type GridLayout = {
    id: string;
    name: string;
    shape?: 'rect' | 'heart' | 'clover' | 'hexagon';
    rows: number;
    cols: number;
    layout: number[][]
}