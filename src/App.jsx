import { useState } from "react";
import "./App.css"; // Importando seu CSS

import { RulesFuzzy } from "./RulesFuzzy";
import ChartFuzzy from "./ChartFuzzy";
import { translations } from "./locale";

function App() {
  const [answer, setAnswer] = useState({
    temperature: 0,
    humidity: 0,
    roomSize: 9,
    respiratoryProblem: 0,
  });
  const [pertinences, setPertinences] = useState();
  const [issues, setIssues] = useState({
    asma: { checked: false, value: 40 },
    rinite: { checked: false, value: 15 },
    sinusite: { checked: false, value: 15 },
    bronquite: { checked: false, value: 30 },
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setIssues((prevIssues) => ({
      ...prevIssues,
      [id]: {
        ...prevIssues[id],
        checked: checked,
      },
    }));
  };
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
      Object.values(issues).reduce((total, issue) => {
        return issue.checked ? total + issue.value : total;
      }, 0)
    );
    setResult(acResult);
  };

  return (
    <div className="app-container">
      <h1>Monitoramento de Ar-Condicionado</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <div className="form-label">
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
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
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
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
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
          </div>
        </div>
        <div className="form-group">
          <div className="form-label">
            Tem problemas respiratórios?
            <div className="issues">
              <label htmlFor="asma">
                <input
                  type="checkbox"
                  id="asma"
                  checked={issues.asma.checked}
                  onChange={handleCheckboxChange}
                />
                <span>Asma</span>
              </label>
              <label htmlFor="rinite">
                <input
                  type="checkbox"
                  id="rinite"
                  checked={issues.rinite.checked}
                  onChange={handleCheckboxChange}
                />
                <span>Rinite</span>
              </label>
              <label htmlFor="sinusite">
                <input
                  type="checkbox"
                  id="sinusite"
                  checked={issues.sinusite.checked}
                  onChange={handleCheckboxChange}
                />
                <span>Sinusite</span>
              </label>
              <label htmlFor="bronquite">
                <input
                  type="checkbox"
                  id="bronquite"
                  checked={issues.bronquite.checked}
                  onChange={handleCheckboxChange}
                />
                <span>Bronquite</span>
              </label>
            </div>
          </div>
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
                  {translations[x.output] || x.output}: {x.fuzzy}
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
