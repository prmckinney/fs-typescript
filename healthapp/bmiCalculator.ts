const calculateBmi = (height: number, weight: number): string => {
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
}

console.log(calculateBmi(180, 74));
