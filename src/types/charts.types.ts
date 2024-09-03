export interface ChartProps {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    label: string;
    data: number[];
  }[];
}
