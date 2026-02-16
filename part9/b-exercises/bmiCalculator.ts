export const calculateBmi = (height: number, weight: number) : string => {
  const bmi : number = (weight / (height/100)**2);
  if ( 18.5 <= bmi && bmi <= 25.0) {
    return 'Normal range';
  } else if ( bmi > 25 ) {
    return 'Overweight';
  } else {
    return 'Underweight';
  }
};

if (require.main === module) {
  const height : number = Number(process.argv[2]);
  const weight : number = Number(process.argv[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Wrong input! Input should be numbers');
  }
  console.log(calculateBmi(height, weight));
}

