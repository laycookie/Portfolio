"use client";

import { useEffect, useRef } from "react";
import {
  areSpheresColliding,
  Sphere,
  getSphereDataForCollision,
  pullSpheresApartData,
} from "./utils";

import * as THREE from "three";
import {
  SphereBuilder,
  ifSpheresColliding,
  moveTheta,
  oscillator,
} from "./util";

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
      scene.fog = new THREE.FogExp2(0x000000, 0.075);

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

      // === Vars for the animation (they are out of the function so they don't get reset) ===
      // theta is the angle of the sin wave
      let theta = -Math.PI;
      const sinAmplitude = 3;
      // point of attraction for the spheres
      const attractionPoint = {
        x: 0,
        y: 0,
        z: 0,
      };
      const clock = new THREE.Clock();
      // Render the scene
      const animate = () => {
        console.log(clock.getDelta());
        // === moving the attraction point back and forth ===
        attractionPoint.z = oscillator(theta, sinAmplitude, 1, 0);

        const alpha = (FOV / 2) * (Math.PI / 180);
        // cameraZoffSet is "b" of the triangle
        // vectorScaler is "a" of the triangle
        const vectorScaler =
          Math.tan(alpha) * (cameraZoffSet - attractionPoint.z);

        [attractionPoint.x, attractionPoint.y] = [cursor.x, cursor.y].map(
          (coord) => {
            return (coord = coord * vectorScaler);
          }
        );

        // moves sphere back and forth in a sin wave
        const thetaSpeed = 1;
        theta = moveTheta(theta, thetaSpeed, clock.getDelta());

        // === collision detection system ===
        for (const sphere of spheres) {
          for (const sphere2 of spheres) {
            if (sphere === sphere2) continue;
            ifSpheresColliding(sphere, sphere2, (sphereData, sphere2Data) => {
              // === Adds force to spheres ===
              const { direction, magnitude } = pullSpheresApartData(
                sphereData,
                sphere2Data
              );

              // we don't reference sphere2 because on the second
              // passing the sphere and sphere2 are switched
              sphere.velocity.addScaledVector(direction, magnitude);
            });
          }
        }

        // move sphere to attraction point (Based on newtons law of gravity)
        const sphereMass: number = 1;
        const attractionPointMass: number = 1000;
        const gravityConst: number = 6.67e-6;
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
