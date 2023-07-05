"use client";

import { useEffect, useRef } from "react";
import { render } from "react-dom";
import * as THREE from "three";

type Props = {};

export default function Bg({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true, // Enable transparency
      });
      renderer.setClearColor(0x000000);

      // Create a scene
      const scene = new THREE.Scene();

      // Create a camera
      const FOV = 75;
      const camera = new THREE.PerspectiveCamera(
        FOV,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      const cameraZoffSet = 5;
      camera.position.z = cameraZoffSet;

      // create sphere
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = 0;
      sphere.position.y = 0;
      scene.add(sphere);

      // track cursor
      const cursor = new THREE.Vector2(0, 0);
      const onMouseMove = (event: MouseEvent) => {
        // FOV for the hight will always be the set FOV
        // However for width if your aspect ratio is not 1:1
        // triangle of your vision will be skewed
        // this is why we have widthScaler and we aren't just using FOV
        const widthScaler = window.innerWidth / window.innerHeight;
        cursor.x = ((event.clientX / window.innerWidth) * 2 - 1) * widthScaler;
        cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(cursor);
      };
      addEventListener("mousemove", onMouseMove);

      // Render the scene
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // moving sphere
        const alpha = FOV / 2;
        // cameraZoffSet is "b" of the triangle
        // vectorScaler is "a" of the triangle
        const vectorScaler = Math.tan(alpha * (Math.PI / 180)) * cameraZoffSet;

        sphere.position.x = cursor.x * vectorScaler;
        sphere.position.y = cursor.y * vectorScaler;
      };
      animate();

      // Resize the canvas
      const resizeCanvasOnWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      resizeCanvasOnWindowResize();
      addEventListener("resize", resizeCanvasOnWindowResize);

      // remove event listener
      return () => {
        removeEventListener("resize", resizeCanvasOnWindowResize);
        removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [canvasRef]);

  return (
    <canvas className="absolute h-full w-full z-0" ref={canvasRef}></canvas>
  );
}
