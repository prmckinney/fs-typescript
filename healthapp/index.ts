import express from 'express';
import { isNotNumber } from "./utils.ts";
import { calculateBmi } from './bmiCalculator.ts';
import { exerciseCalculator } from './exerciseCalculator.ts';

const app = express();

app.use(express.json()); 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    return res.status(400).json({error: "malformatted parameters"});
  }
  const height:number = Number(req.query.height);
  const weight:number = Number(req.query.weight);
  const bmi:string = calculateBmi(height, weight);
  return res.json({height: height, weight: weight, bmi: bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({error: "parameters missing"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access 
  if (isNotNumber(target) || daily_exercises.some(isNotNumber)) {
    return res.status(400).json({error: "malformatted parameters"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access 
  const hours:number[] = daily_exercises.map((n:string) => Number(n));

  return res.json(exerciseCalculator(hours, Number(target)));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});