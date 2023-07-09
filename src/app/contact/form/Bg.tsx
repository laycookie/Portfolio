"use client";

import { useEffect, useRef } from "react";
import {
  areSpheresColliding,
  Sphere,
  getSphereDataForCollision,
  pullSpheresApartData,
} from "./utils";

import * as THREE from "three";

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
      renderer.setClearColor(0x000000);

      // Create a scene
      const scene = new THREE.Scene();

      // Create a camera
      const FOV = 45;
      const cameraZoffSet = 10;
      const camera = new THREE.PerspectiveCamera(
        FOV,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = cameraZoffSet;
      // spheres setup

      const geometry = new THREE.SphereGeometry(1, 24, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });

      const spheres: Sphere[] = [];
      const testSphere: Sphere = new Sphere(geometry, material);
      testSphere.geometry.computeBoundingSphere();
      testSphere.position.x = -2;
      testSphere.position.y = 0;

      spheres.push(testSphere);
      const testSphere1 = new Sphere(geometry, material);
      testSphere1.geometry.computeBoundingSphere();
      testSphere1.position.x = 2;
      testSphere1.position.y = 0;

      spheres.push(testSphere1);

      spheres.forEach((sphere) => {
        scene.add(sphere);
      });

      // point of attraction for the spheres

      const attractionPoint = {
        x: 0,
        y: 0,
        z: 0,
      };

      // used to move sphere back and forth in a loop
      let theta = -Math.PI;
      const sinAmplitude = 3;

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
      };
      addEventListener("mousemove", onMouseMove);

      // Render the scene
      const animate = () => {
        // moving sphere
        const alpha = FOV / 2;
        // cameraZoffSet is "b" of the triangle
        // vectorScaler is "a" of the triangle
        const vectorScaler =
          Math.tan(alpha * (Math.PI / 180)) *
          (cameraZoffSet - Math.sin(theta) * sinAmplitude);

        attractionPoint.x = cursor.x * vectorScaler;
        attractionPoint.y = cursor.y * vectorScaler;

        // moves sphere back and forth in a sin wave
        attractionPoint.z = Math.sin(theta) * sinAmplitude;
        theta += 0.01;
        if (theta > Math.PI) {
          theta = -Math.PI;
        }

        // collision detection system
        for (const sphere of spheres) {
          for (const sphere2 of spheres) {
            const [sphereRadius, spherePosition] =
              getSphereDataForCollision(sphere);
            const [sphere2Radius, sphere2Position] =
              getSphereDataForCollision(sphere2);
            if (sphere !== sphere2) {
              const distance = spherePosition.distanceTo(sphere2Position);
              if (
                areSpheresColliding(
                  [sphereRadius, spherePosition],
                  [sphere2Radius, sphere2Position]
                )
              ) {
                // === Move spheres away from each other ===
                const bounceForceMultiplier = 10;
                let { direction, magnitude } = pullSpheresApartData(
                  [sphereRadius, spherePosition],
                  [sphere2Radius, sphere2Position],
                  distance
                );

                // makes spheres bounce off each other
                sphere.velocity.addScaledVector(
                  direction,
                  magnitude * bounceForceMultiplier
                );

                // === Move spheres away from each other ===
                sphere.position.addScaledVector(direction, magnitude);
                sphere2.position.addScaledVector(direction, -magnitude);
              }
            }
          }
        }

        // move sphere to attraction point
        const sphereMass: number = 1;
        const attractionPointMass: number = 1000;
        const gravityConst: number = 6.67e-7;
        for (const sphere of spheres) {
          // calculate gravity force with newtons
          const distance = sphere.position.distanceTo(
            new THREE.Vector3(
              attractionPoint.x,
              attractionPoint.y,
              attractionPoint.z
            )
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
            ((attractionPointMass * sphereMass) / Math.pow(distance, 0.25));

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

  return (
    <canvas className="absolute h-full w-full z-0" ref={canvasRef}></canvas>
  );
}
