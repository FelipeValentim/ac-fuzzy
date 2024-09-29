import { useState } from "react";
import "./App.css"; // Importando seu CSS

import { rulesFuzzy } from "./rules";
import ChartFuzzy from "./ChartFuzzy";

function App() {
  const [answer, setAnswer] = useState({
    temperature: 0,
    humidity: 0,
    roomSize: 9,
    umidificator: false,
  });

  const [result, setResult] = useState("");
  // Criar uma distribuição normal com média 0 e desvio padrão 1

  const assessAC = (temperature, humidity, roomSize) => {
    return rulesFuzzy(temperature, humidity, roomSize);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const acResult = assessAC(
      answer.temperature,
      answer.humidity,
      answer.roomSize
    );
    setResult(acResult);
  };

  return (
    <div className="app-container">
      <h1>Calculadora de Ar-Condicionado</h1>
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
                setAnswer({ ...answer, temperature: Number(e.target.value) })
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
                setAnswer({ ...answer, humidity: Number(e.target.value) })
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
                setAnswer({ ...answer, roomSize: Number(e.target.value) })
              }
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Tem umidificador no cômodo?
            <input
              type="checkbox"
              checked={answer.umidificator}
              onChange={(e) =>
                setAnswer({ ...answer, umidificator: !answer.umidificator })
              }
              className="form-input"
            />
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
