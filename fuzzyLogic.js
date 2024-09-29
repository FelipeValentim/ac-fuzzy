class FuzzyLogicAC {
  constructor() {
    this.powerSets = { off: 0, low: 25, medium: 50, high: 75, max: 100 };
  }

  fuzzifyTemperature(temp) {
    const fuzzyTemp = {
      low: temp < 25 ? 1 : temp < 30 ? (30 - temp) / 5 : 0,
      medium: temp >= 20 && temp <= 30 ? (temp - 25) / 5 : temp > 30 ? 0 : 0, // Corrigido
      high: temp > 30 ? (temp - 30) / 10 : 0,
    };

    // Certificando-se de que os valores não ultrapassem 1
    fuzzyTemp.medium = Math.min(fuzzyTemp.medium, 1);
    console.log("Fuzzified Temperature:", fuzzyTemp);
    return fuzzyTemp;
  }

  fuzzifyHumidity(humidity) {
    const fuzzyHumidity = {
      low: humidity < 40 ? 1 : humidity < 70 ? (70 - humidity) / 30 : 0,
      medium:
        humidity >= 40 && humidity <= 70
          ? (humidity - 40) / 30
          : humidity > 70
          ? 0
          : (70 - humidity) / 30,
      high: humidity > 70 ? (humidity - 70) / 30 : 0,
    };
    console.log("Fuzzified Humidity:", fuzzyHumidity);
    return fuzzyHumidity;
  }

  defuzzify(fuzzyOutput) {
    let totalWeight = 0;
    let weightedSum = 0;
    for (const key in fuzzyOutput) {
      if (fuzzyOutput[key] > 0) {
        // Verifica se a pertença é maior que 0
        weightedSum += fuzzyOutput[key] * this.powerSets[key];
        totalWeight += fuzzyOutput[key];
      }
    }
    console.log(
      "Defuzzified Output:",
      weightedSum,
      "Total Weight:",
      totalWeight
    );
    return totalWeight ? weightedSum / totalWeight : 0;
  }

  computeACPower(temp, humidity) {
    console.log(`Computing AC Power for Temp: ${temp}, Humidity: ${humidity}`);
    const fuzzyTemp = this.fuzzifyTemperature(temp);
    const fuzzyHumidity = this.fuzzifyHumidity(humidity);

    //regras
    const fuzzyOutput = {
      off: Math.min(fuzzyTemp.low),
      low: Math.min(fuzzyTemp.medium, fuzzyHumidity.high),
      medium: Math.min(fuzzyTemp.medium, fuzzyHumidity.medium),
      max: Math.min(fuzzyTemp.high),
    };

    return this.defuzzify(fuzzyOutput);
  }
}
