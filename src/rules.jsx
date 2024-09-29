import Logic from "es6-fuzz";
import Trapezoid from "es6-fuzz/lib/curve/trapezoid";
import * as boon from "boon-js";

export const rulesFuzzy = (temperature, humidity, roomSize) => {
  var logicTemperature = new Logic();
  const lowTemperature = new Trapezoid(0, 0, 15, 20);
  const moderateTemperature = new Trapezoid(15, 20, 25, 30);
  const highTemperature = new Trapezoid(25, 30, 41, 41);

  logicTemperature.init("low", lowTemperature);
  logicTemperature.or("moderate", moderateTemperature);
  logicTemperature.or("high", highTemperature);

  var logicHumidity = new Logic();
  const lowHumidity = new Trapezoid(0, 0, 30, 40);
  const moderateHumidity = new Trapezoid(30, 40, 60, 70);
  const highHumidity = new Trapezoid(60, 70, 101, 101);

  logicHumidity.init("low", lowHumidity);
  logicHumidity.or("moderate", moderateHumidity);
  logicHumidity.or("high", highHumidity);

  var logicRoom = new Logic();
  const smallRoom = new Trapezoid(9, 9, 15, 20); // 9 a 20 m²
  const mediumRoom = new Trapezoid(15, 20, 30, 40); // 20 a 40 m²
  const bigRoom = new Trapezoid(40, 50, 61, 61); // 40 a 60 m²

  logicRoom.init("small", smallRoom);
  logicRoom.or("medium", mediumRoom);
  logicRoom.or("big", bigRoom);

  const tests = [];
  // Adicionando todas as combinações de temperatura, umidade e tamanho do cômodo
  // Para cômodos pequenos
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.low AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.moderate AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.high AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.low AND room.small")
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small"
    )
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.high AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.low AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.moderate AND room.small")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.high AND room.small")
  );

  // Para cômodos médios
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.low AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.moderate AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.high AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.low AND room.medium")
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium"
    )
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.high AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.low AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.moderate AND room.medium")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.high AND room.medium")
  );

  // Para cômodos grandes
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.low AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.moderate AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.low AND humidity.high AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.low AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.moderate AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.moderate AND humidity.high AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.low AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.moderate AND room.big")
  );
  tests.push(
    boon.getEvaluator("temperature.high AND humidity.high AND room.big")
  );

  const res_temperature = logicTemperature.defuzzify(
    temperature,
    "temperature"
  );
  const res_humidity = logicHumidity.defuzzify(humidity, "humidity");
  const res_room_size = logicRoom.defuzzify(roomSize, "room"); // Avaliação do tamanho do cômodo

  const js_boon_input = {
    ...res_temperature.boonJsInputs,
    ...res_humidity.boonJsInputs,
    ...res_room_size.boonJsInputs, // Incluir os inputs do tamanho do cômodo
  };

  const results = [];
  for (let i = 0; i < tests.length; i++) {
    results.push(tests[i](js_boon_input));
  }

  let base_result = null;
  if (results[0]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo pequeno
  else if (results[1])
    base_result = 28; // Temperatura baixa, umidade média, cômodo pequeno
  else if (results[2])
    base_result = 27; // Temperatura baixa, umidade alta, cômodo pequeno
  else if (results[3])
    base_result = 26; // Temperatura média, umidade baixa, cômodo pequeno
  else if (results[4])
    base_result = 25; // Temperatura média, umidade média, cômodo pequeno
  else if (results[5])
    base_result = 24; // Temperatura média, umidade alta, cômodo pequeno
  else if (results[6])
    base_result = 22; // Temperatura alta, umidade baixa, cômodo pequeno
  else if (results[7])
    base_result = 20; // Temperatura alta, umidade média, cômodo pequeno
  else if (results[8])
    base_result = 19; // Temperatura alta, umidade alta, cômodo pequeno
  // Adicione os resultados para cômodos médios
  else if (results[9])
    base_result = "Desligado"; // Temperatura baixa, umidade baixa, cômodo médio
  else if (results[10])
    base_result = 26; // Temperatura baixa, umidade média, cômodo médio
  else if (results[11])
    base_result = 25; // Temperatura baixa, umidade alta, cômodo médio
  else if (results[12])
    base_result = 24; // Temperatura média, umidade baixa, cômodo médio
  else if (results[13])
    base_result = 23; // Temperatura média, umidade média, cômodo médio
  else if (results[14])
    base_result = 22; // Temperatura média, umidade alta, cômodo médio
  else if (results[15])
    base_result = 20; // Temperatura alta, umidade baixa, cômodo médio
  else if (results[16])
    base_result = 18; // Temperatura alta, umidade média, cômodo médio
  else if (results[17])
    base_result = 17; // Temperatura alta, umidade alta, cômodo médio
  // Adicione os resultados para cômodos grandes
  else if (results[18]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo grande
  else if (results[19])
    base_result = 24; // Temperatura baixa, umidade média, cômodo grande
  else if (results[20])
    base_result = 23; // Temperatura baixa, umidade alta, cômodo grande
  else if (results[21])
    base_result = 22; // Temperatura média, umidade baixa, cômodo grande
  else if (results[22])
    base_result = 21; // Temperatura média, umidade média, cômodo grande
  else if (results[23])
    base_result = 19; // Temperatura média, umidade alta, cômodo grande
  else if (results[24])
    base_result = 18; // Temperatura alta, umidade baixa, cômodo grande
  else if (results[25])
    base_result = 17; // Temperatura alta, umidade média, cômodo grande
  else if (results[26])
    base_result = 16; // Temperatura alta, umidade alta, cômodo grande
  else return null; // Desconhecido

  return base_result; // Retorna o resultado ajustado ou original
};
