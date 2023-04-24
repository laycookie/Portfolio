"use client";

import { useEffect, useRef } from "react";
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
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );

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

      // Render the scene
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    }
  }, [canvasRef]);

  return (
    <canvas className="absolute h-full w-full z-0" ref={canvasRef}></canvas>
  );
}
