import { useState } from "react";
import "./App.css"; // Importando seu CSS

import { rulesFuzzy } from "./RulesFuzzy";
import ChartFuzzy from "./ChartFuzzy";

function App() {
  const [answer, setAnswer] = useState({
    temperature: 0,
    humidity: 0,
    roomSize: 9,
    respiratoryProblem: "no",
  });

  const [result, setResult] = useState("");
  // Criar uma distribuição normal com média 0 e desvio padrão 1

  const assessAC = (temperature, humidity, roomSize, respiratoryProblem) => {
    return rulesFuzzy(temperature, humidity, roomSize, respiratoryProblem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const acResult = assessAC(
      Number(answer.temperature),
      Number(answer.humidity),
      Number(answer.roomSize),
      Number(answer.respiratoryProblem)
    );
    setResult(acResult);
  };

  return (
    <div className="app-container">
      <h1>Monitoramento de Ar-Condicionado</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>
            Temperatura (0-40°C):
            <input
              type="number"
              value={answer.temperature}
              min="0"
              max="40"
              onChange={(e) =>
                setAnswer({ ...answer, temperature: e.target.value })
              }
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Umidade (0-100%):
            <input
              type="number"
              value={answer.humidity}
              min="0"
              max="100"
              onChange={(e) =>
                setAnswer({ ...answer, humidity: e.target.value })
              }
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tamanho do cômodo (9-60m²):
            <input
              type="number"
              value={answer.roomSize}
              min="9"
              max="60"
              onChange={(e) =>
                setAnswer({ ...answer, roomSize: e.target.value })
              }
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tem problemas respiratórios?
            <select
              className="form-input"
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  respiratoryProblem: Number(e.target.value),
                })
              }
            >
              <option value={0}>Não</option>
              <option value={40}>Leve</option>
              <option value={100}>Grave</option>
            </select>
          </label>
        </div>
        <button type="submit" className="submit-button">
          Calcular
        </button>
      </form>
      {result && (
        <div className="result-container">
          <h2>
            Resultado: {typeof result === "number" ? `${result}°C` : result}
          </h2>
        </div>
      )}
      <ChartFuzzy />
    </div>
  );
}

export default App;
