import Logic from "es6-fuzz";
import Trapezoid from "es6-fuzz/lib/curve/trapezoid";
import * as boon from "boon-js";
import RuleBase from "../lib/RuleBase";
export const RulesFuzzy = (
  temperature,
  humidity,
  roomSize,
  respiratoryProblem,
  setPertinences
) => {
  var logicTemperature = new Logic();
  const lowTemperature = new Trapezoid(-1, -1, 15, 20);
  const moderateTemperature = new Trapezoid(15, 20, 25, 30);
  const highTemperature = new Trapezoid(25, 30, 41, 41);

  logicTemperature.init("low", lowTemperature);
  logicTemperature.or("moderate", moderateTemperature);
  logicTemperature.or("high", highTemperature);

  var logicHumidity = new Logic();
  const lowHumidity = new Trapezoid(-1, -1, 30, 40);
  const moderateHumidity = new Trapezoid(30, 40, 60, 70);
  const highHumidity = new Trapezoid(60, 70, 101, 101);

  logicHumidity.init("low", lowHumidity);
  logicHumidity.or("moderate", moderateHumidity);
  logicHumidity.or("high", highHumidity);

  var logicRoom = new Logic();
  const smallRoom = new Trapezoid(8, 8, 15, 20); // 9 a 20 m²
  const mediumRoom = new Trapezoid(15, 20, 30, 40); // 20 a 40 m²
  const bigRoom = new Trapezoid(30, 40, 50, 61); // 40 a 60 m²

  logicRoom.init("small", smallRoom);
  logicRoom.or("medium", mediumRoom);
  logicRoom.or("big", bigRoom);

  var logicRespiratoryProblem = new Logic();
  const noProblem = new Trapezoid(-1, -1, 10, 20); // Representa um nível de problema próximo a zero
  const mildProblem = new Trapezoid(15, 20, 40, 50); // Problema leve
  const severeProblem = new Trapezoid(40, 50, 101, 101); // Problema grave

  logicRespiratoryProblem.init("no", noProblem);
  logicRespiratoryProblem.or("mild", mildProblem);
  logicRespiratoryProblem.or("severe", severeProblem);

  const assessments = getAssessments();

  const resTemperature = logicTemperature.defuzzify(temperature, "temperature");
  const resHumidity = logicHumidity.defuzzify(humidity, "humidity");
  const resRoomSize = logicRoom.defuzzify(roomSize, "room"); // Avaliação do tamanho do cômodo
  const resRespiratoryProblem = logicRespiratoryProblem.defuzzify(
    respiratoryProblem,
    "respiratory"
  );

  const jsBoonInput = {
    ...resTemperature.boonJsInputs,
    ...resHumidity.boonJsInputs,
    ...resRoomSize.boonJsInputs, // Incluir os inputs do tamanho do cômodo
    ...resRespiratoryProblem.boonJsInputs, // Incluir os inputs do tamanho do cômodo
  };

  assessments.evaluateAllRules(jsBoonInput);

  getPertinence(
    logicTemperature,
    logicHumidity,
    logicRoom,
    logicRespiratoryProblem,
    setPertinences
  );

  return assessments.getResult();
};

const getAssessments = () => {
  const assessments = new RuleBase();

  // Para cômodos pequenos e problemas respiratórios "no"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.no"
    ),
    28
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.no"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.no"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.no"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.no"
    ),
    22
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.no"
    ),
    21
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.no"
    ),
    20
  );

  // Para cômodos pequenos e problemas respiratórios "mild"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.mild"
    ),
    27
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.mild"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.mild"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.mild"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.mild"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.mild"
    ),
    22
  );

  // Para cômodos pequenos e problemas respiratórios "severe"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.small AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.small AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.small AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.small AND respiratory.severe"
    ),
    28
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.small AND respiratory.severe"
    ),
    27
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.small AND respiratory.severe"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.small AND respiratory.severe"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.small AND respiratory.severe"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.small AND respiratory.severe"
    ),
    24
  );

  // Para cômodos médios e problemas respiratórios "no"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.no"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.no"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.no"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.no"
    ),
    22
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.no"
    ),
    20
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.no"
    ),
    18
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.no"
    ),
    17
  );

  // Para cômodos médios e problemas respiratórios "mild"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.mild"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.mild"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.mild"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.mild"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.mild"
    ),
    22
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.mild"
    ),
    21
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.mild"
    ),
    20
  );

  // Para cômodos médios e problemas respiratórios "severe"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.medium AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.medium AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.medium AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.medium AND respiratory.severe"
    ),
    28
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.medium AND respiratory.severe"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.medium AND respiratory.severe"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.medium AND respiratory.severe"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.medium AND respiratory.severe"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.medium AND respiratory.severe"
    ),
    22
  );

  // Para cômodos grandes e problemas respiratórios "no"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.no"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.no"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.no"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.no"
    ),
    21
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.no"
    ),
    19
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.no"
    ),
    18
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.no"
    ),
    17
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.no"
    ),
    16
  );

  // Para cômodos grandes e problemas respiratórios "mild"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.mild"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.mild"
    ),
    28
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.mild"
    ),
    27
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.mild"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.mild"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.mild"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.mild"
    ),
    22
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.mild"
    ),
    21
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.mild"
    ),
    20
  );

  // Para cômodos grandes e problemas respiratórios "severe"
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.low AND room.big AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.moderate AND room.big AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.low AND humidity.high AND room.big AND respiratory.severe"
    ),
    "Desligado"
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.low AND room.big AND respiratory.severe"
    ),
    28
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.moderate AND room.big AND respiratory.severe"
    ),
    26
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.moderate AND humidity.high AND room.big AND respiratory.severe"
    ),
    25
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.low AND room.big AND respiratory.severe"
    ),
    24
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.moderate AND room.big AND respiratory.severe"
    ),
    23
  );
  assessments.addRule(
    boon.getEvaluator(
      "temperature.high AND humidity.high AND room.big AND respiratory.severe"
    ),
    22
  );

  return assessments;
};

const getPertinence = (
  logicTemperature,
  logicHumidity,
  logicRoom,
  logicRespiratoryProblem,
  setPertinences
) => {
  setPertinences({
    Temperatura: logicTemperature.rules.map(({ output, fuzzy }) => ({
      output,
      fuzzy: Number(fuzzy.toFixed(2)),
    })),
    Umidade: logicHumidity.rules.map(({ output, fuzzy }) => ({
      output,
      fuzzy: Number(fuzzy.toFixed(2)),
    })),
    "Tamanho do cômodo": logicRoom.rules.map(({ output, fuzzy }) => ({
      output,
      fuzzy: Number(fuzzy.toFixed(2)),
    })),
    "Problema respiratório": logicRespiratoryProblem.rules.map(
      ({ output, fuzzy }) => ({
        output,
        fuzzy: Number(fuzzy.toFixed(2)),
      })
    ),
  });
};
