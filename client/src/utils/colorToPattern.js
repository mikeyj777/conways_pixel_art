// utils/colorToPattern.js

export function mapColorToPattern(color) {
  // Map color brightness to patterns
  const rgb = color
    .replace(/[^\d,]/g, '')
    .split(',')
    .map(Number);
  const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3;

  if (brightness < 64) {
    return 'block'; // Very dark colors
  } else if (brightness < 128) {
    return 'beehive'; // Dark colors
  } else if (brightness < 192) {
    return 'blinker'; // Medium colors
  } else {
    return 'glider'; // Light colors
  }
}
