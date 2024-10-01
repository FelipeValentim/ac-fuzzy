import { useState } from "react";
import "./App.css"; // Importando seu CSS

import { RulesFuzzy } from "./RulesFuzzy";
import ChartFuzzy from "./ChartFuzzy";

function App() {
  const [answer, setAnswer] = useState({
    temperature: 0,
    humidity: 0,
    roomSize: 9,
    respiratoryProblem: 0,
  });
  const [pertinences, setPertinences] = useState();

  const [result, setResult] = useState("");
  // Criar uma distribuição normal com média 0 e desvio padrão 1

  const assessAC = (temperature, humidity, roomSize, respiratoryProblem) => {
    return RulesFuzzy(
      temperature,
      humidity,
      roomSize,
      respiratoryProblem,
      setPertinences
    );
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
      <div className="pertinences">
        {pertinences &&
          Object.entries(pertinences).map(([name, pertinence], index) => (
            <div key={index} className="pertinence-group">
              <h3>{name}</h3>
              {pertinence.map((x, index) => (
                <div key={index}>
                  {x.output}: {x.fuzzy}
                </div>
              ))}
            </div>
          ))}
      </div>
      <ChartFuzzy />
    </div>
  );
}

export default App;
