import * as THREE from "three";

export function sceneSetup(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) {
  // camera setup
  camera.position.z = 10;

  let themeColor: number;
  // check if dark mode is enabled
  const html = document.querySelector("html");
  if (html?.classList.contains("dark")) {
    themeColor = 0x000000;
  } else {
    themeColor = 0xffffff;
  }

  // render setup
  renderer.setClearColor(themeColor);

  // scene setup
  scene.fog = new THREE.FogExp2(themeColor, 0.075);
}
