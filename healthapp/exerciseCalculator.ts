import { isNotNumber } from "./utils.ts";

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const exerciseCalculator = (hours: number[], target: number): Result => {
  const average = hours.reduce((sum, value) => sum + value, 0)/hours.length;
  const trainingDays = hours.length - hours.filter(v => v===0).length;
  let rating: number;
  switch(true){
    case ((average - target) > 1): rating = 3; break;
    case ((average - target) < -1): rating = 1; break;
    default: rating = 2;
  }
  let ratingDescription: string = "";
  switch(rating){
    case(1): ratingDescription="needs improvement"; break;
    case(2): ratingDescription="not too bad but could be better"; break;
    case(3): ratingDescription="very good"; break;
  }
  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: (average >= target),
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

if (process.argv[1] === import.meta.filename) {
  // Check for minimum # of params
  if (process.argv.length < 4) 
    throw new Error('Not enough arguments');
  
  // Parse first param as target
  if (isNotNumber(process.argv[2])) 
    throw new Error ('Target must be a numbers');
  const target: number = Number(process.argv[2]);
  
  // Parse remaining params as day data
  const days:number[] = process.argv.slice(3).map(n => {
    if (isNotNumber(n)) 
      throw new Error ('All day data must be a numbers');
    else return Number(n);
  });
  
  console.log(exerciseCalculator(days, target));
}