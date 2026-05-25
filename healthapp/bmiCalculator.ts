import { isNotNumber } from "./utils.ts";

export const calculateBmi = (height: number, weight: number): string => {
  const bmi:number = weight/(height/100*height/100);
  switch(true) {
    case (bmi < 16): return "Underweight (Severe thinness)";
    case (bmi < 17): return "Underweight (Moderate thinness)";
    case (bmi < 18.5): return "Underweight (Mild thinness)";
    case (bmi < 25): return "Normal range";
    case (bmi < 30): return "Overweight (Pre-obese)";
    case (bmi < 35): return "Obese (Class I)";
    case (bmi < 50): return "Obese (Class II)";
    default: return "Obese (Class III)";
  }
};

if (process.argv[1] === import.meta.filename) {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  if (process.argv.length > 4) throw new Error('Too many arguments');
  
  if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3])) throw new Error ('You must pass numbers only');
  
  // command line arguments start from process.argv[2]
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[3]);
  
  console.log(calculateBmi(a, b));
}