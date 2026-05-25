import express from 'express';
import { isNotNumber } from "./utils.ts";
import { calculateBmi } from './bmiCalculator.ts'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
console.log("req ==> ", req.query);
  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.json({error: "malformatted parameters"})
    return;
  }
  const height:number = Number(req.query.height);
  const weight:number = Number(req.query.weight);
  const bmi:string = calculateBmi(height, weight)
  res.json({height: height, weight: weight, bmi: bmi})
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});