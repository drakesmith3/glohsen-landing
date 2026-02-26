import * as THREE from 'three';

// Generate Caduceus shape coordinates (Staff of Hermes with two snakes)
export const asclepiusRodShape: THREE.Vector3[] = [];

const generateCaduceusShape = () => {
  const points: THREE.Vector3[] = [];
  // Central Staff/Rod
  for (let i = 0; i < 180; i++) {
    const t = (i / 180) * 2 - 1;
    const y = t * 3.6;
    const staffRadius = 0.025 * (1 + Math.abs(t) * 0.2);
    const angle = (i / 180) * Math.PI * 2 * 3;
    const x = staffRadius * Math.cos(angle);
    const z = staffRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z));
  }
  // Top Orb/Handle
  for (let i = 0; i < 45; i++) {
    const phi = Math.acos(1 - 2 * (i / 45));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const sphereRadius = 0.06;
    const topHeight = 3.76;
    const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
    const y = topHeight + sphereRadius * Math.cos(phi);
    const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
    points.push(new THREE.Vector3(x, y, z));
  }
  // First Snake - spiraling clockwise
  for (let i = 0; i < 525; i++) {
    const progress = i / 525;
    const t = progress * 4.5 * Math.PI;
    const height = ((i / 525) * 2 - 1) * 3.36;
    const baseRadius = 0.25;
    const radiusVariation = Math.sin(progress * Math.PI * 8) * 0.08;
    const radius = baseRadius + radiusVariation;
    const x = radius * Math.cos(t);
    const z = radius * Math.sin(t);
    const bodyThickness = Math.sin(t * 2) * 0.02;
    points.push(new THREE.Vector3(x + bodyThickness, height, z));
  }
  // Second Snake - spiraling counter-clockwise
  for (let i = 0; i < 525; i++) {
    const progress = i / 525;
    const t = progress * 4.5 * Math.PI;
    const height = ((i / 525) * 2 - 1) * 3.36;
    const baseRadius = 0.25;
    const radiusVariation = Math.sin(progress * Math.PI * 8) * 0.08;
    const radius = baseRadius + radiusVariation;
    const x = radius * Math.cos(-t + Math.PI * 0.5);
    const z = radius * Math.sin(-t + Math.PI * 0.5);
    const bodyThickness = Math.sin(-t * 2) * 0.02;
    points.push(new THREE.Vector3(x + bodyThickness, height, z));
  }
  // Enhanced Snake Heads
  for (let i = 0; i < 120; i++) {
    const snakeIndex = i < 60 ? 0 : 1;
    const headIndex = i % 60;
    const progress = headIndex / 60;
    const angle = snakeIndex === 0 ? Math.PI * 0.2 : Math.PI * 1.8;
    const headRadius = 0.18 + progress * 0.12;
    const headHeight = 3.2 + progress * 0.2;
    const headAngle = (progress * Math.PI * 1.5) + angle;
    const eyeDetail = progress < 0.3 ? Math.sin(progress * Math.PI * 10) * 0.02 : 0;
    const x = headRadius * Math.cos(headAngle) + eyeDetail;
    const y = headHeight;
    const z = headRadius * Math.sin(headAngle) + eyeDetail;
    points.push(new THREE.Vector3(x, y, z));
  }
  // Enhanced Wings at the top
  for (let i = 0; i < 105; i++) {
    const side = i < 52 ? -1 : 1;
    const wingIndex = i % 52;
    const progress = wingIndex / 52;
    const wingSpan = 1.0;
    const wingHeight = 0.6;
    const topPosition = 3.36;
    const wingCurve = Math.sin(progress * Math.PI);
    const featherDetail = Math.sin(progress * Math.PI * 8) * 0.05;
    const x = side * progress * wingSpan * wingCurve;
    const y = topPosition + wingCurve * wingHeight - (progress * 0.15) + featherDetail;
    const z = Math.cos(progress * Math.PI * 2) * 0.2 * wingCurve + featherDetail;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
};

asclepiusRodShape.push(...generateCaduceusShape());

export default asclepiusRodShape;
