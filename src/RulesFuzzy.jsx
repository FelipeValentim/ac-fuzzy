import Logic from "es6-fuzz";
import Trapezoid from "es6-fuzz/lib/curve/trapezoid";
import * as boon from "boon-js";

export const rulesFuzzy = (
  temperature,
  humidity,
  roomSize,
  respiratoryProblem
) => {
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

  var logicRespiratoryProblem = new Logic();
  const noProblem = new Trapezoid(0, 0, 10, 20); // Representa um nível de problema próximo a zero
  const mildProblem = new Trapezoid(15, 25, 40, 50); // Problema leve
  const severeProblem = new Trapezoid(40, 50, 101, 101); // Problema grave

  logicRespiratoryProblem.init("no", noProblem);
  logicRespiratoryProblem.or("mild", mildProblem);
  logicRespiratoryProblem.or("severe", severeProblem);

  const tests = setRules();

  const resTemperature = logicTemperature.defuzzify(temperature, "temperature");
  const resHumidity = logicHumidity.defuzzify(humidity, "humidity");
  const resRoomSize = logicRoom.defuzzify(roomSize, "room"); // Avaliação do tamanho do cômodo
  const resRespiratoryProblem = logicRespiratoryProblem.defuzzify(
    respiratoryProblem,
    "respiratory"
  );

  return getResult(
    resTemperature,
    resHumidity,
    resRoomSize,
    resRespiratoryProblem,
    tests
  );
};

const getResult = (
  resTemperature,
  resHumidity,
  resRoomSize,
  resRespiratoryProblem,
  tests
) => {
  const js_boon_input = {
    ...resTemperature.boonJsInputs,
    ...resHumidity.boonJsInputs,
    ...resRoomSize.boonJsInputs, // Incluir os inputs do tamanho do cômodo
    ...resRespiratoryProblem.boonJsInputs, // Incluir os inputs do tamanho do cômodo
  };

  const results = [];
  for (let i = 0; i < tests.length; i++) {
    results.push(tests[i](js_boon_input));
  }

  let base_result = null; // 16 a 28
  // Para cômodos pequenos e problemas respiratórios "no"
  if (results[0]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo pequeno, sem problemas respiratórios
  else if (results[1]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo pequeno, sem problemas respiratórios
  else if (results[2])
    base_result = 28; // Temperatura baixa, umidade alta, cômodo pequeno, sem problemas respiratórios
  else if (results[3])
    base_result = 26; // Temperatura média, umidade baixa, cômodo pequeno, sem problemas respiratórios
  else if (results[4])
    base_result = 25; // Temperatura média, umidade média, cômodo pequeno, sem problemas respiratórios
  else if (results[5])
    base_result = 24; // Temperatura média, umidade alta, cômodo pequeno, sem problemas respiratórios
  else if (results[6])
    base_result = 22; // Temperatura alta, umidade baixa, cômodo pequeno, sem problemas respiratórios
  else if (results[7])
    base_result = 21; // Temperatura alta, umidade média, cômodo pequeno, sem problemas respiratórios
  else if (results[8])
    base_result = 20; // Temperatura alta, umidade alta, cômodo pequeno, sem problemas respiratórios
  // Para cômodos pequenos e problemas respiratórios "mild"
  else if (results[9]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo pequeno, problemas respiratórios leves
  else if (results[10]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo pequeno, problemas respiratórios leves
  else if (results[11]) base_result = "Desligado";
  // Temperatura baixa, umidade alta, cômodo pequeno, problemas respiratórios leves
  else if (results[12])
    base_result = 27; // Temperatura média, umidade baixa, cômodo pequeno, problemas respiratórios leves
  else if (results[13])
    base_result = 26; // Temperatura média, umidade média, cômodo pequeno, problemas respiratórios leves
  else if (results[14])
    base_result = 25; // Temperatura média, umidade alta, cômodo pequeno, problemas respiratórios leves
  else if (results[15])
    base_result = 24; // Temperatura alta, umidade baixa, cômodo pequeno, problemas respiratórios leves
  else if (results[16])
    base_result = 23; // Temperatura alta, umidade média, cômodo pequeno, problemas respiratórios leves
  else if (results[17])
    base_result = 22; // Temperatura alta, umidade alta, cômodo pequeno, problemas respiratórios leves
  // Para cômodos pequenos e problemas respiratórios "severe"
  else if (results[18]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo pequeno, problemas respiratórios severos
  else if (results[19]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo pequeno, problemas respiratórios severos
  else if (results[20]) base_result = "Desligado";
  // Temperatura baixa, umidade alta, cômodo pequeno, problemas respiratórios severos
  else if (results[21])
    base_result = 28; // Temperatura média, umidade baixa, cômodo pequeno, problemas respiratórios severos
  else if (results[22])
    base_result = 27; // Temperatura média, umidade média, cômodo pequeno, problemas respiratórios severos
  else if (results[23])
    base_result = 26; // Temperatura média, umidade alta, cômodo pequeno, problemas respiratórios severos
  else if (results[24])
    base_result = 26; // Temperatura alta, umidade baixa, cômodo pequeno, problemas respiratórios severos
  else if (results[25])
    base_result = 25; // Temperatura alta, umidade média, cômodo pequeno, problemas respiratórios severos
  else if (results[26])
    base_result = 24; // Temperatura alta, umidade alta, cômodo pequeno, problemas respiratórios severos
  // Para cômodos médios e problemas respiratórios "no"
  else if (results[27]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo médio, sem problemas respiratórios
  else if (results[28]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo médio, sem problemas respiratórios
  else if (results[29])
    base_result = 25; // Temperatura baixa, umidade alta, cômodo médio, sem problemas respiratórios
  else if (results[30])
    base_result = 24; // Temperatura média, umidade baixa, cômodo médio, sem problemas respiratórios
  else if (results[31])
    base_result = 23; // Temperatura média, umidade média, cômodo médio, sem problemas respiratórios
  else if (results[32])
    base_result = 22; // Temperatura média, umidade alta, cômodo médio, sem problemas respiratórios
  else if (results[33])
    base_result = 20; // Temperatura alta, umidade baixa, cômodo médio, sem problemas respiratórios
  else if (results[34])
    base_result = 18; // Temperatura alta, umidade média, cômodo médio, sem problemas respiratórios
  else if (results[35])
    base_result = 17; // Temperatura alta, umidade alta, cômodo médio, sem problemas respiratórios
  // Para cômodos médios e problemas respiratórios "mild"
  else if (results[36]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo médio, problemas respiratórios leves
  else if (results[37]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo médio, problemas respiratórios leves
  else if (results[38])
    base_result = 26; // Temperatura baixa, umidade alta, cômodo médio, problemas respiratórios leves
  else if (results[39])
    base_result = 25; // Temperatura média, umidade baixa, cômodo médio, problemas respiratórios leves
  else if (results[40])
    base_result = 24; // Temperatura média, umidade média, cômodo médio, problemas respiratórios leves
  else if (results[41])
    base_result = 23; // Temperatura média, umidade alta, cômodo médio, problemas respiratórios leves
  else if (results[42])
    base_result = 22; // Temperatura alta, umidade baixa, cômodo médio, problemas respiratórios leves
  else if (results[43])
    base_result = 21; // Temperatura alta, umidade média, cômodo médio, problemas respiratórios leves
  else if (results[44])
    base_result = 20; // Temperatura alta, umidade alta, cômodo médio, problemas respiratórios leves
  // Para cômodos médios e problemas respiratórios "severe"
  else if (results[45]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo médio, problemas respiratórios severos
  else if (results[46]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo médio, problemas respiratórios severos
  else if (results[47]) base_result = "Desligado";
  // Temperatura baixa, umidade alta, cômodo médio, problemas respiratórios severos
  else if (results[48])
    base_result = 28; // Temperatura média, umidade baixa, cômodo médio, problemas respiratórios severos
  else if (results[49])
    base_result = 26; // Temperatura média, umidade média, cômodo médio, problemas respiratórios severos
  else if (results[50])
    base_result = 25; // Temperatura média, umidade alta, cômodo médio, problemas respiratórios severos
  else if (results[51])
    base_result = 24; // Temperatura alta, umidade baixa, cômodo médio, problemas respiratórios severos
  else if (results[52])
    base_result = 23; // Temperatura alta, umidade média, cômodo médio, problemas respiratórios severos
  else if (results[53])
    base_result = 22; // Temperatura alta, umidade alta, cômodo médio, problemas respiratórios severos
  // Para cômodos grandes e problemas respiratórios "no"
  else if (results[54]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo grande, sem problemas respiratórios
  else if (results[55]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo grande, sem problemas respiratórios
  else if (results[56])
    base_result = 26; // Temperatura baixa, umidade alta, cômodo grande, sem problemas respiratórios
  else if (results[57])
    base_result = 23; // Temperatura média, umidade baixa, cômodo grande, sem problemas respiratórios
  else if (results[58])
    base_result = 21; // Temperatura média, umidade média, cômodo grande, sem problemas respiratórios
  else if (results[59])
    base_result = 19; // Temperatura média, umidade alta, cômodo grande, sem problemas respiratórios
  else if (results[60])
    base_result = 18; // Temperatura alta, umidade baixa, cômodo grande, sem problemas respiratórios
  else if (results[61])
    base_result = 17; // Temperatura alta, umidade média, cômodo grande, sem problemas respiratórios
  else if (results[62])
    base_result = 16; // Temperatura alta, umidade alta, cômodo grande, sem problemas respiratórios
  // Para cômodos grandes e problemas respiratórios "mild"
  else if (results[63]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo grande, problemas respiratórios leves
  else if (results[64])
    base_result = 28; // Temperatura baixa, umidade média, cômodo grande, problemas respiratórios leves
  else if (results[65])
    base_result = 27; // Temperatura baixa, umidade alta, cômodo grande, problemas respiratórios leves
  else if (results[66])
    base_result = 26; // Temperatura média, umidade baixa, cômodo grande, problemas respiratórios leves
  else if (results[67])
    base_result = 25; // Temperatura média, umidade média, cômodo grande, problemas respiratórios leves
  else if (results[68])
    base_result = 24; // Temperatura média, umidade alta, cômodo grande, problemas respiratórios leves
  else if (results[69])
    base_result = 22; // Temperatura alta, umidade baixa, cômodo grande, problemas respiratórios leves
  else if (results[70])
    base_result = 20; // Temperatura alta, umidade média, cômodo grande, problemas respiratórios leves
  else if (results[71])
    base_result = 18; // Temperatura alta, umidade alta, cômodo grande, problemas respiratórios leves
  // Para cômodos grandes e problemas respiratórios "severe"
  else if (results[72]) base_result = "Desligado";
  // Temperatura baixa, umidade baixa, cômodo grande, problemas respiratórios severos
  else if (results[73]) base_result = "Desligado";
  // Temperatura baixa, umidade média, cômodo grande, problemas respiratórios severos
  else if (results[74])
    base_result = 28; // Temperatura baixa, umidade alta, cômodo grande, problemas respiratórios severos
  else if (results[75])
    base_result = 27; // Temperatura média, umidade baixa, cômodo grande, problemas respiratórios severos
  else if (results[76])
    base_result = 26; // Temperatura média, umidade média, cômodo grande, problemas respiratórios severos
  else if (results[77])
    base_result = 25; // Temperatura média, umidade alta, cômodo grande, problemas respiratórios severos
  else if (results[78])
    base_result = 24; // Temperatura alta, umidade baixa, cômodo grande, problemas respiratórios severos
  else if (results[79])
    base_result = 23; // Temperatura alta, umidade média, cômodo grande, problemas respiratórios severos
  else if (results[80])
    base_result = 22; // Temperatura alta, umidade alta, cômodo grande, problemas respiratórios severos
  // Se nenhum resultado foi encontrado
  else return null;

  return base_result; // Retorna o resultado ajustado ou original
};

const setRules = () => {
  const tests = [];

  // Para cômodos pequenos
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.no"
    )
  );

  // Para cômodos pequenos e problemas leves

  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.mild"
    )
  );

  // Para cômodos pequenos e problemas graves
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.severe"
    )
  );

  // Para cômodos médios
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.no"
    )
  );

  // Para cômodos médios e problemas leves
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.mild"
    )
  );

  // Para cômodos médios e problemas graves
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.severe"
    )
  );

  // Para cômodos grandes
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.no"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.no"
    )
  );

  // Para cômodos grandes e problemas leves
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.mild"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.mild"
    )
  );

  // Para cômodos grandes e problemas graves

  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.severe"
    )
  );
  tests.push(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.severe"
    )
  );

  return tests;
};
