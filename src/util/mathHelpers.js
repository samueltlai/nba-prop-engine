/**
 * box muller transformation
 * returns normally distributed number
*/
export function getStandardNormal () {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = sqrt(-2.00 * Math.log(u1)) * Math.sin(Math.PI * 2.00 * u2);
  return z;
}

/**
 * Gi
 * 
*/
export function calculateMean (data) {
  if (!data || data.length === 0) return 0;

  const sum = dataSummed(data);
  return sum / data.length;
}

function dataSummed(data) {
  return data.reduce((acc, val) => acc + val, 0);
}

export function calculateStdDev (data) {
  if (!data || data.length === 0) return 0;

  const squaredDiffs = data.map(val => {
      const diff = val - mean;
      return diff * diff;
  });

  const variance = calculateMean(squaredDiffs);
  const stdDev = Math.sqrt(variance);
  return stdDev;
}
