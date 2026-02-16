import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height : number = Number(req.query.height);
  const weight : number = Number(req.query.weight);
  if (!height || !weight) return res.status(400).json({ error: "malformatted parameters" });
  const response = {
    height,
    weight,
    bmi: calculateBmi(height, weight)
  };
  return res.json(response);
  
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target : number = Number(req.body.target);
  if (!target || !daily_exercises) return res.status(400).json({ error: "parameters missing" });
  if (daily_exercises.length < 2) return res.status(400).json({ error: "malformatted parameters"});
  for (const element of daily_exercises) {
    if (!(typeof element === "number")) return res.status(400).json({ error: "malformatted parameters"});
  }
  return res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});