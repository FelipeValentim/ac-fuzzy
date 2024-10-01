import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ChartFuzzy.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartFuzzy = () => {
  const temperatureData = {
    labels: [0, 5, 10, 15, 20, 25, 30, 35, 40],
    datasets: [
      {
        label: "Baixa Temperatura",
        data: [1, 1, 1, 1, 0, 0, 0, 0, 0],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Temperatura Moderada",
        data: [0, 0, 0, 0, 1, 1, 0, 0, 0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Alta Temperatura",
        data: [0, 0, 0, 0, 0, 0, 1, 1, 1],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const humidityData = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        label: "Baixa Umidade",
        data: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Umidade Moderada",
        data: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Alta Umidade",
        data: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const roomSizeData = {
    labels: [9, 15, 20, 30, 40, 50, 60],
    datasets: [
      {
        label: "Pequena Sala",
        data: [1, 1, 0, 0, 0, 0, 0],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Sala Média",
        data: [0, 0, 1, 1, 0, 0, 0],
        borderColor: "red",
        fill: false,
      },
      {
        label: "Grande Sala",
        data: [0, 0, 0, 0, 1, 1, 1],
        borderColor: "purple",
        fill: false,
      },
    ],
  };

  // Dados para o gráfico de Problemas Respiratórios
  const respiratoryProblemData = {
    labels: [0, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        label: "Sem Problema",
        data: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Problema Leve",
        data: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Problema Grave",
        data: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  // Dados para o gráfico de Resultado
  const resultData = {
    labels: ["Desligado", 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16],
    datasets: [
      {
        label: "Pertinência do Resultado",
        data: [
          0, 0.083, 0.167, 0.25, 0.333, 0.417, 0.5, 0.583, 0.667, 0.75, 0.833,
          0.917, 1.0,
        ],
        borderColor: "purple",
        fill: false,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={temperatureData} />
      <Line data={humidityData} />
      <Line data={roomSizeData} />
      <Line data={respiratoryProblemData} />
      <Line data={resultData} />
      {/* Adicionando o gráfico de Problemas Respiratórios */}
    </div>
  );
};

export default ChartFuzzy;
