export const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return 'text-red-600 bg-red-100';
  if (magnitude >= 5.5) return 'text-orange-600 bg-orange-100';
  if (magnitude >= 4) return 'text-yellow-600 bg-yellow-100';
  if (magnitude >= 2.5) return 'text-blue-600 bg-blue-100';
  return 'text-green-600 bg-green-100';
};

export const getMagnitudeLevel = (magnitude: number): string => {
  if (magnitude >= 7) return 'Major';
  if (magnitude >= 5.5) return 'Strong';
  if (magnitude >= 4) return 'Moderate';
  if (magnitude >= 2.5) return 'Minor';
  return 'Micro';
};

export const formatCoordinates = (longitude: number, latitude: number): string => {
  const latDir = latitude >= 0 ? 'N' : 'S';
  const lonDir = longitude >= 0 ? 'E' : 'W';
  
  return `${Math.abs(latitude).toFixed(4)}°${latDir}, ${Math.abs(longitude).toFixed(4)}°${lonDir}`;
};

export const formatDepth = (depth: number): string => {
  return `${depth.toFixed(1)} km`;
};