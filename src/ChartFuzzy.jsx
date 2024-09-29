import React from "react";
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
        data: [1, 1, 1, 0.5, 0, 0, 0, 0, 0],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Temperatura Moderada",
        data: [0, 0, 0.5, 1, 1, 0.5, 0, 0, 0],
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Alta Temperatura",
        data: [0, 0, 0, 0, 0.5, 1, 1, 1, 1],
        borderColor: "red",
        fill: false,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1, // Graus de pertencimento variam de 0 a 1
        },
      },
    },
  };

  const humidityData = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        label: "Baixa Umidade",
        data: [1, 1, 1, 0.5, 0, 0, 0, 0, 0, 0, 0], // 0 a 40%
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Umidade Moderada",
        data: [0, 0, 0, 0, 0.5, 1, 1, 0.5, 0, 0, 0], // 30 a 70%
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Alta Umidade",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0.5, 1, 1], // 60 a 100%
        borderColor: "red",
        fill: false,
      },
    ],
  };

  // Dados para o gráfico de tamanhos de sala
  const roomSizeData = {
    labels: [9, 15, 20, 30, 40, 50, 60],
    datasets: [
      {
        label: "Pequena Sala",
        data: [1, 1, 0.5, 0, 0, 0, 0], // 9 a 20 m²
        borderColor: "green",
        fill: false,
      },
      {
        label: "Sala Média",
        data: [0, 0.5, 1, 1, 0.5, 0, 0], // 20 a 40 m²
        borderColor: "red",
        fill: false,
      },
      {
        label: "Grande Sala",
        data: [0, 0, 0, 0.5, 1, 1, 1], // 40 a 60 m²
        borderColor: "purple",
        fill: false,
      },
    ],
  };
  return (
    <div>
      <Line data={temperatureData} />
      <Line data={humidityData} />
      <Line data={roomSizeData} />
      {/* Adicionando o gráfico de tamanhos de sala */}
    </div>
  );
};

export default ChartFuzzy;
