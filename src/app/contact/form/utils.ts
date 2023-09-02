import * as THREE from "three";

export function getSphereDataForCollision(
  sphere: THREE.Mesh<any, any>
): [number, THREE.Vector3] {
  const sphereRadius = sphere.geometry.boundingSphere.radius;
  const spherePosition = sphere.position;
  return [sphereRadius, spherePosition];
}

export type SphereData = [number, THREE.Vector3];

export function areSpheresColliding(
  [sphereRadius, spherePosition]: SphereData,
  [sphere2Radius, sphere2Position]: SphereData
) {
  const distance = spherePosition.distanceTo(sphere2Position);
  if (distance < sphereRadius + sphere2Radius) {
    return true;
  }
  return false;
}

export function pullSpheresApartData(
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

export class Sphere extends THREE.Mesh {
  // add force property to sphere on init
  velocity: THREE.Vector3;

  constructor(geometry: THREE.SphereGeometry, material: THREE.Material) {
    super(geometry, material);
    this.velocity = new THREE.Vector3(0, 0, 0);
  }
}
