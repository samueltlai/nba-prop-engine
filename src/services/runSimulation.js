import calculateMean from './mathHelpers'

export function runMonteCarlo(mean, stdDev, line, iterations) {
  let over = 0;
  for (let i = 0; i < iterations; i++) {
    let score = (getStandardNormal * stdDev + mean);
    score = Math.round(score);
    if (score > line) {
      over++;
    }
  }a

  const probability = (over / iterations) * 100;
  return probability.toFixed(2); 
}

