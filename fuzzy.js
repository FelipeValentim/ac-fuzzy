// Definição dos universos de temperatura, umidade e potência
const temperatura_universe = Array.from({ length: 45 }, (_, i) => i);
const umidade_universe = Array.from({ length: 101 }, (_, i) => i);
const potencia_universe = Array.from({ length: 101 }, (_, i) => i);

// Funções de pertinência para temperatura
function temperatura_fria(x) {
  return Math.max(Math.min((20 - x) / 10, 1), 0);
}

function temperatura_amena(x) {
  const sigma = 2; // desvio padrão da gaussiana

  return Math.exp(-0.5 * Math.pow((x - 25) / sigma, 2));
}

function temperatura_quente(x) {
  return Math.max(Math.min((x - 20) / 10, 1), 0);
}

// Funções de pertinência para umidade
function umidade_baixa(x) {
  return Math.max(Math.min((40 - x) / 20, 1), 0);
}

function umidade_media(x) {
  return Math.max(Math.min((x - 20) / 30, (80 - x) / 30), 0);
}

function umidade_alta(x) {
  return Math.max(Math.min((x - 60) / 40, 1), 0);
}

// Funções de pertinência para potência do ar-condicionado
function potencia_baixa(x) {
  return Math.max(Math.min((35 - x) / 30, 1), 0);
}

function potencia_media(x) {
  return Math.max(Math.min((x - 35) / 15, (65 - x) / 15), 0);
}

function potencia_alta(x) {
  return Math.max(Math.min((x - 60) / 10, (100 - x) / 30), 0);
}

// Gerando os dados para temperatura
function gerarDadosTemperatura() {
  const fria = temperatura_universe.map((x) => temperatura_fria(x));
  const amena = temperatura_universe.map((x) => temperatura_amena(x));
  const quente = temperatura_universe.map((x) => temperatura_quente(x));
  return { fria, amena, quente };
}

// Gerando os dados para umidade
function gerarDadosUmidade() {
  const baixa = umidade_universe.map((x) => umidade_baixa(x));
  const media = umidade_universe.map((x) => umidade_media(x));
  const alta = umidade_universe.map((x) => umidade_alta(x));
  return { baixa, media, alta };
}

// Gerando os dados para potência do ar-condicionado
function gerarDadosPotencia() {
  const baixa = potencia_universe.map((x) => potencia_baixa(x));
  const media = potencia_universe.map((x) => potencia_media(x));
  const alta = potencia_universe.map((x) => potencia_alta(x));
  return { baixa, media, alta };
}

// Função para criar os gráficos usando Chart.js
function criarGrafico(id, labels, datasets, title) {
  const ctx = document.getElementById(id).getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets.map((dataset) => ({
        ...dataset,
        pointRadius: dataset.data.map((value) => (value > 0.001 ? 3 : 0)), // Define o tamanho dos pontos (0 se pertinência for 0)
      })),
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: title,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 1,
            },
          },
        ],
      },
    },
  });
}

// Criando o gráfico de temperatura
const temperatura_dados = gerarDadosTemperatura();
criarGrafico(
  "temperaturaChart",
  temperatura_universe,
  [
    {
      label: "Fria",
      data: temperatura_dados.fria,
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Amena",
      data: temperatura_dados.amena,
      borderColor: "green",
      fill: false,
    },
    {
      label: "Quente",
      data: temperatura_dados.quente,
      borderColor: "red",
      fill: false,
    },
  ],
  "Funções de Pertinência - Temperatura"
);

// Criando o gráfico de umidade
const umidade_dados = gerarDadosUmidade();
criarGrafico(
  "umidadeChart",
  umidade_universe,
  [
    {
      label: "Baixa",
      data: umidade_dados.baixa,
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Média",
      data: umidade_dados.media,
      borderColor: "green",
      fill: false,
    },
    {
      label: "Alta",
      data: umidade_dados.alta,
      borderColor: "red",
      fill: false,
    },
  ],
  "Funções de Pertinência - Umidade"
);

// Criando o gráfico de potência do ar-condicionado
const potencia_dados = gerarDadosPotencia();
criarGrafico(
  "potenciaChart",
  potencia_universe,
  [
    {
      label: "Baixa",
      data: potencia_dados.baixa,
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Média",
      data: potencia_dados.media,
      borderColor: "green",
      fill: false,
    },
    {
      label: "Alta",
      data: potencia_dados.alta,
      borderColor: "red",
      fill: false,
    },
  ],
  "Funções de Pertinência - Potência do Ar-condicionado"
);

// Definindo as regras fuzzy
function fuzzyRules(temperatura, umidade) {
  // Avaliação das funções de pertinência
  const temp_fria = temperatura_fria(temperatura);
  const temp_amena = temperatura_amena(temperatura);
  const temp_quente = temperatura_quente(temperatura);

  const umid_baixa = umidade_baixa(umidade);
  const umid_media = umidade_media(umidade);
  const umid_alta = umidade_alta(umidade);

  // Aplicação de regras fuzzy
  const potencia_baixa_result = Math.min(temp_fria, umid_alta);
  const potencia_media_result = Math.min(temp_amena, umid_media);
  const potencia_alta_result = Math.max(temp_quente, umid_baixa);

  // Combinação dos resultados fuzzy
  return {
    baixa: potencia_baixa_result,
    media: potencia_media_result,
    alta: potencia_alta_result,
  };
}

function validateInput(input) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  let value = parseInt(input.value);
  if (!isNaN(value)) {
    if (value < min) {
      input.value = min;
    } else if (value > max) {
      input.value = max;
    }
  } else {
    input.value = min;
  }
}

// Defuzzificação usando o método do centro de massa
function defuzzificar(fuzzy_output) {
  let numerador = 0;
  let denominador = 0;

  for (let i = 0; i <= 100; i++) {
    const baixa = potencia_baixa(i) * fuzzy_output.baixa;
    const media = potencia_media(i) * fuzzy_output.media;
    const alta = potencia_alta(i) * fuzzy_output.alta;

    const valor_pertinencia = Math.max(baixa, media, alta);
    numerador += valor_pertinencia * i;
    denominador += valor_pertinencia;
  }

  return numerador / denominador;
}

const fuzzy_output = fuzzyRules(temperatura, umidade);
const potencia = defuzzificar(fuzzy_output);

// Evento de clique do botão
document.getElementById("calcular").addEventListener("click", () => {
  const temperatura = parseFloat(document.getElementById("temperatura").value);
  const umidade = parseFloat(document.getElementById("umidade").value);

  if (!isNaN(temperatura) && !isNaN(umidade)) {
    if (temperatura < 0 || temperatura > 45 || umidade < 0 || umidade > 100) {
      document.getElementById("resultado").innerText =
        "Por favor, insira valores válidos.";
    } else {
      const fuzzy_output = fuzzyRules(temperatura, umidade);
      const potencia = defuzzificar(fuzzy_output).toFixed(0);

      document.getElementById("resultado").innerText = potencia + "%";
    }
  } else {
    document.getElementById("resultado").innerText =
      "Por favor, insira valores válidos.";
  }
});
