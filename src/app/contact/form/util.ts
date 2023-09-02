import * as THREE from "three";
import { Sphere } from "./utils";

export function oscillator(
  theta: number,
  amplitude: number,
  frequency: number,
  phase: number
) {
  return amplitude * Math.sin(theta * frequency + phase);
}

export function moveTheta(theta: number, speed: number, deltaTime: number) {
  theta += speed * deltaTime;
  if (theta > Math.PI) {
    theta -= Math.PI * 2;
  }
  return theta;
}

export function ifSpheresColliding(
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

export class SphereBuilder {
  private geometry: THREE.SphereGeometry;
  private material: THREE.MeshBasicMaterial;

  constructor() {
    this.geometry = new THREE.SphereGeometry(1, 24, 16);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }

  changeGeometry(
    radius?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number
  ) {
    this.geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
  }

  changeMaterial(color: number, wireframe = false) {
    this.material = new THREE.MeshBasicMaterial({
      color,
      wireframe,
    });
  }

  createSphere({ x, y, z = 0 }: { x: number; y: number; z?: number }) {
    const sphere: Sphere = new Sphere(this.geometry, this.material);
    sphere.geometry.computeBoundingSphere();
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    return sphere;
  }
}
