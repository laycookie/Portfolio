import * as THREE from "three";
import { Sphere } from "./utils";

const sphereMass: number = 1;
const attractionPointMass: number = 1000;
const gravityConst: number = 6.67e-6;

// move sphere to attraction point (Based on newtons law of gravity)
export function applyNewtonsGravity(
  attractionPoint: THREE.Vector3,
  spheres: Sphere[]
) {
  for (const sphere of spheres) {
    // calculate gravity force with newtons
    const distance = sphere.position.distanceTo(
      new THREE.Vector3(attractionPoint.x, attractionPoint.y, attractionPoint.z)
    );

    // Check that attraction point is not inside the sphere
    if (sphere.geometry.boundingSphere === null) continue;
    if (distance < sphere.geometry.boundingSphere.radius) continue;

    /*
     * I have changed Newtons formula where you
     * square the distance by the power of 2 in
     * order to soften the effect of gravity
     * changing as the distance changes.
     */
    const forceMagnitude =
      gravityConst *
      ((attractionPointMass * sphereMass) / Math.pow(distance, 0.2));

    // calculate direction of gravity force
    const force = new THREE.Vector3(
      attractionPoint.x - sphere.position.x,
      attractionPoint.y - sphere.position.y,
      attractionPoint.z - sphere.position.z
    )
      .normalize()
      .multiplyScalar(forceMagnitude);

    // apply gravity force
    sphere.velocity.add(force);
  }

  // apply force to spheres
  for (const sphere of spheres) {
    if (!sphere.velocity) continue;
    sphere.position.addScaledVector(sphere.velocity, 1 / sphereMass);
    // Apply air resistance
    const AIR_RESISTANCE = 0.99;
    sphere.velocity.multiplyScalar(AIR_RESISTANCE);
  }
}
