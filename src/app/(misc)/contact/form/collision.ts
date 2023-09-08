import * as THREE from "three";
import { Sphere } from "./utils";

function ifSpheresColliding(
  sphere: THREE.Mesh<any, any>,
  sphere2: THREE.Mesh<any, any>,
  callBackFunction: ([]: [any, THREE.Vector3], []: [any, THREE.Vector3]) => void
) {
  const [[sphereRadius, spherePosition], [sphere2Radius, sphere2Position]] = [
    sphere,
    sphere2,
  ].map((sphere) => {
    const sphereRadius = sphere.geometry.boundingSphere.radius;
    const spherePosition = sphere.position;
    return [sphereRadius, spherePosition];
  });

  const distance = spherePosition.distanceTo(sphere2Position);
  if (distance < sphereRadius + sphere2Radius) {
    callBackFunction(
      [sphereRadius, spherePosition],
      [sphere2Radius, sphere2Position]
    );
  }
}

type SphereData = [number, THREE.Vector3];

function pullSpheresApartData(
  [sphereRadius, spherePosition]: SphereData,
  [sphere2Radius, sphere2Position]: SphereData,
  magnitudeMultiplier = 10,
  logBase = 5
) {
  const distance = spherePosition.distanceTo(sphere2Position);
  // calculate the direction of the collision
  const direction = new THREE.Vector3();
  direction.subVectors(spherePosition, sphere2Position);
  direction.normalize();
  // calculate half of the distance the spheres are overlapping
  const halfOverlapDistance = (sphereRadius + sphere2Radius - distance) / 4;

  // halfOverlapDistance log of logBase
  let magnitude =
    (Math.log(halfOverlapDistance + 1) / Math.log(logBase)) *
    magnitudeMultiplier;

  return { direction, magnitude };
}

// === collision detection system ===
export function collisionAndRepulsionSystem(spheres: Sphere[]) {
  for (const sphere of spheres) {
    for (const sphere2 of spheres) {
      if (sphere === sphere2) continue;
      ifSpheresColliding(sphere, sphere2, (sphereData, sphere2Data) => {
        // === Adds force to spheres ===
        const { direction, magnitude } = pullSpheresApartData(
          sphereData,
          sphere2Data
        );

        // we don't reference sphere2 because on the second
        // passing the sphere and sphere2 are switched
        sphere.velocity.addScaledVector(direction, magnitude);
      });
    }
  }
}
