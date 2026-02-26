// Utility to generate the GLOHSEN favicon dynamically on canvas
export const generateFaviconDataURL = (size: number = 32): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  canvas.width = size;
  canvas.height = size;
  ctx.clearRect(0, 0, size, size);
  const centerX = size / 2;
  const centerY = size / 2;
  const sunRadius = size * 0.15;
  const sunGradient = ctx.createRadialGradient(centerX - sunRadius * 0.3, centerY - sunRadius * 0.3, 0, centerX, centerY, sunRadius);
  sunGradient.addColorStop(0, '#ffffff');
  sunGradient.addColorStop(0.35, '#ffeb3b');
  sunGradient.addColorStop(0.6, '#ff9800');
  sunGradient.addColorStop(1, '#d84315');
  ctx.fillStyle = sunGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius, 0, 2 * Math.PI);
  ctx.fill();
  return canvas.toDataURL('image/png');
};
