interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const exerciseCalculator = (hours: number[], target: number) => {
  const average = hours.reduce((sum, value) => sum + value, 0)/hours.length;
  const trainingDays = hours.length - hours.filter(v => v===0).length;
  var rating: number;
  switch(true){
    case ((average - target) > 1): rating = 3; break;
    case ((average - target) < -1): rating = 1; break;
    default: rating = 2;
  }
  var ratingDescription: string = "";
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
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
