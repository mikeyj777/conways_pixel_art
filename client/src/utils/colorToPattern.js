// utils/colorToPattern.js

export function mapColorToPattern(color) {
  // Simple mapping based on color brightness
  const rgb = color
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);
  const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3;

  if (brightness < 85) {
    return 'block'; // Dark colors
  } else if (brightness < 170) {
    return 'beehive'; // Medium colors
  } else {
    return 'blinker'; // Light colors
  }
}
