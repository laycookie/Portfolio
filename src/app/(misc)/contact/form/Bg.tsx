"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { SphereBuilder, Sphere } from "./utils";
import { collisionAndRepulsionSystem } from "./collision";
import { oscillateGravitationalPoint } from "./oscillation";
import { applyNewtonsGravity } from "./gravity";
import { sceneSetup } from "./sceneSetup";

type Props = {};

export default function Bg({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true, // Enable transparency
        antialias: true,
      });
      const scene = new THREE.Scene();
      const FOV = 45;
      const camera = new THREE.PerspectiveCamera(
        FOV,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );

      // changes settings for the renderer
      sceneSetup(renderer, scene, camera);

      // create spheres
      const spheres: Sphere[] = [];
      const sphereBuilder = new SphereBuilder();

      sphereBuilder.changeMaterial(0xff0000);
      spheres.push(sphereBuilder.createSphere({ x: 2, y: 0, z: -25 }));
      sphereBuilder.changeMaterial(0x00ff00);
      spheres.push(sphereBuilder.createSphere({ x: -2, y: 0, z: -25 }));
      sphereBuilder.changeMaterial(0x0000ff);
      spheres.push(sphereBuilder.createSphere({ x: 0, y: 2, z: -25 }));

      spheres.forEach((sphere) => {
        scene.add(sphere);
      });

      const cursor = new THREE.Vector2(0, 0);
      const onMouseMove = (event: MouseEvent) => {
        // vector might exceed 1 due to screen ratio not always being 1:1
        const widthScaler = window.innerWidth / window.innerHeight;
        cursor.x = ((event.clientX / window.innerWidth) * 2 - 1) * widthScaler;
        cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      addEventListener("mousemove", onMouseMove);

      // point of attraction for the spheres
      const attractionPoint: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

      const clock = new THREE.Clock();
      // Render the scene
      const animate = () => {
        // Sphere movement pipeline
        oscillateGravitationalPoint(
          FOV,
          camera.position.z,
          attractionPoint,
          cursor,
          clock.getDelta()
        );
        collisionAndRepulsionSystem(spheres);
        applyNewtonsGravity(attractionPoint, spheres);

        // Render the scene
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
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

  return <canvas className="absolute h-full w-full z-0" ref={canvasRef} />;
}
