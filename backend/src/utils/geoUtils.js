// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // Distance in kilometers
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Calculate bearing between two coordinates
const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return bearing; // Bearing in degrees
};

// Check if a point is within a certain radius of another point
const isWithinRadius = (lat1, lon1, lat2, lon2, radiusKm) => {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return distance <= radiusKm;
};

// Calculate estimated arrival time based on distance and average speed
const calculateETA = (distanceKm, averageSpeedKmh = 30) => {
  const timeHours = distanceKm / averageSpeedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  const now = new Date();
  const eta = new Date(now.getTime() + timeMinutes * 60000);
  
  return {
    minutes: timeMinutes,
    eta: eta,
    etaString: eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

// Validate coordinates
const isValidCoordinate = (lat, lon) => {
  return (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180
  );
};

// Convert coordinates to geofence boundary
const createGeofence = (centerLat, centerLon, radiusKm) => {
  const points = [];
  const numberOfPoints = 16; // Number of points to create a circle
  
  for (let i = 0; i < numberOfPoints; i++) {
    const angle = (2 * Math.PI * i) / numberOfPoints;
    const lat = centerLat + (radiusKm / 111.32) * Math.sin(angle);
    const lon = centerLon + (radiusKm / (111.32 * Math.cos(toRadians(centerLat)))) * Math.cos(angle);
    points.push([lat, lon]);
  }
  
  return points;
};

// Check if point is inside polygon (for geofencing)
const isPointInPolygon = (lat, lon, polygon) => {
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    
    if (((yi > lon) !== (yj > lon)) && (lat < (xj - xi) * (lon - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};

module.exports = {
  calculateDistance,
  calculateBearing,
  isWithinRadius,
  calculateETA,
  isValidCoordinate,
  createGeofence,
  isPointInPolygon
};