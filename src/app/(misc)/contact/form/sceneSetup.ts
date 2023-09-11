import * as THREE from "three";

export function sceneSetup(canvasElement: HTMLCanvasElement) {
  // camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    canvasElement.clientWidth / canvasElement.clientHeight,
    0.1,
    1000
  );

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

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    alpha: true, // Enable transparency
    antialias: true,
  });

  renderer.setClearColor(themeColor);

  // scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(themeColor, 0.075);

  return { camera, scene, renderer };
}
