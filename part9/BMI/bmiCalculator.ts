const calculateBmi = (height: number, weight: number) => {
  const bmi : number = (weight / (height/100)**2);
  if ( 18.5 <= bmi && bmi <= 25.0) {
    return 'Normal range'
  }
}

console.log(calculateBmi(180, 74))