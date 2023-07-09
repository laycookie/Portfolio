import * as THREE from "three";

export function getSphereDataForCollision(
  sphere: THREE.Mesh<any, any>
): [number, THREE.Vector3] {
  sphere.geometry.computeBoundingSphere();
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
  distance: number
): [number, THREE.Vector3] {
  // calculate the direction of the collision
  const direction = new THREE.Vector3();
  direction.subVectors(spherePosition, sphere2Position);
  direction.normalize();
  // calculate half of the distance the spheres are overlapping
  const halfOverlapDistance = (sphereRadius + sphere2Radius - distance) / 4;
  // move spheres away from each other

  // This const is just to move the spheres away from
  // each other  enough to not be triggering the collision

  return [halfOverlapDistance, direction];
}
