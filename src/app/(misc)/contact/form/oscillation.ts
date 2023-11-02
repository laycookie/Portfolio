let theta = -Math.PI;
const sinAmplitude = 3;

function oscillator(
  theta: number,
  amplitude: number,
  frequency: number,
  phase: number
) {
  return amplitude * Math.sin(theta * frequency + phase);
}

function moveTheta(theta: number, speed: number, deltaTime: number) {
  theta += speed * deltaTime;
  if (theta > Math.PI) {
    theta -= Math.PI * 2;
  }
  return theta;
}

// === moving the attraction point back and forth ===
export function oscillateGravitationalPoint(
  FOV: number,
  cameraZoffSet: number,
  attractionPoint: THREE.Vector3,
  cursor: THREE.Vector2,
  frameDelta: number
) {
  attractionPoint.z = oscillator(theta, sinAmplitude, 1, 0);

  const alpha = (FOV / 2) * (Math.PI / 180);
  // cameraZoffSet is "b" of the triangle
  // vectorScaler is "a" of the triangle
  const vectorScaler = Math.tan(alpha) * (cameraZoffSet - attractionPoint.z);

  [attractionPoint.x, attractionPoint.y] = [cursor.x, cursor.y].map((coord) => {
    return coord * vectorScaler;
  });

  // moves sphere back and forth in a sin wave
  const thetaSpeed = 1;
  theta = moveTheta(theta, thetaSpeed, frameDelta);
}
