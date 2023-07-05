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
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

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
      const cursor: { x: number; y: number } = {
        x: 0,
        y: 0,
      };
      const onMouseMove = (event: MouseEvent) => {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
        console.log(cursor);
      };
      addEventListener("mousemove", onMouseMove);

      // Render the scene
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // move sphere
        sphere.position.x = cursor.x * 0.01 - (window.innerWidth * 0.01) / 2;
        sphere.position.y = -cursor.y * 0.01 + (window.innerHeight * 0.01) / 2;
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
