// function validateInput(input) {
//   const min = parseInt(input.min);
//   const max = parseInt(input.max);
//   let value = parseInt(input.value);
//   if (!isNaN(value)) {
//     if (value < min) {
//       input.value = min;
//     } else if (value > max) {
//       input.value = max;
//     }
//   } else {
//     input.value = min;
//   }
// }

var obj = {
  crisp_input: [30, 50, 9], // Exemplo de entrada: temperatura 30°C e umidade 70%, Tamanho sala
  variables_input: [
    {
      name: "Temperatura Ambiente",
      setsName: ["Frio", "Amena", "Quente"],
      sets: [
        [0, 0, 20, 25], // Fria
        [20, 25, 25, 30], // Agradável
        [25, 30, 40, 40], // Quente
      ],
    },
    {
      name: "Umidade",
      setsName: ["Baixa", "Média", "Alta"],
      sets: [
        [0, 0, 30, 40], // Baixa
        [30, 40, 40, 70], // Moderada
        [40, 70, 100, 100], // Alta
      ],
    },
    {
      name: "Tamanho do comodo",
      setsName: ["Pequena", "Médio", "Grande"],
      sets: [
        [9, 9, 15, 20], // Pequeno (9 m² a 20 m²)
        [15, 20, 30, 40], // Médio (15 m² a 40 m²)
        [30, 40, 60, 60], // Grande (30 m² a 60 m²)
      ],
    },
  ],
  variable_output: {
    name: "Ar Condicionado",
    setsName: ["Desligado", "Baixo", "Médio", "Alto"],
    sets: [
      [0, 0, 0, 25], // Desligado
      [0, 25, 25, 50], // Baixa
      [25, 50, 50, 75], // Média
      [50, 75, 100, 100], // Alta
    ],
  },
  inferences: [
    [0, 1, 3],
    [2, 3, 3],
    [1, 2, 3],
  ],
};
var fl = new FuzzyLogic();

document.getElementById("calcular").addEventListener("click", () => {
  const temperatura = parseFloat(document.getElementById("temperatura").value);
  const umidade = parseFloat(document.getElementById("umidade").value);
  const tamanho = parseFloat(document.getElementById("tamanho").value);

  if (!isNaN(temperatura) && !isNaN(umidade) && !isNaN(tamanho)) {
    if (
      temperatura < 0 ||
      temperatura > 45 ||
      umidade < 0 ||
      umidade > 100 ||
      tamanho < 9 ||
      tamanho > 60
    ) {
      document.getElementById("resultado").innerText =
        "Por favor, insira valores válidos.";
    } else {
      var fl = new FuzzyLogic();

      const result = fl.getResult({
        ...obj,
        crisp_input: [temperatura, umidade, tamanho],
      });

      document.getElementById("resultado").innerText = result.toFixed(0) + "°C";
    }
  } else {
    document.getElementById("resultado").innerText =
      "Por favor, insira valores válidos.";
  }
});
