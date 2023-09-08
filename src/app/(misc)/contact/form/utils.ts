import * as THREE from "three";

export class Sphere extends THREE.Mesh {
  // add force property to sphere on init
  velocity: THREE.Vector3;

  constructor(geometry: THREE.SphereGeometry, material: THREE.Material) {
    super(geometry, material);
    this.velocity = new THREE.Vector3(0, 0, 0);
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
