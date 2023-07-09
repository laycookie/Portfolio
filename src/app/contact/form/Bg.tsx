"use client";

import { useEffect, useRef } from "react";
import {
  areSpheresColliding,
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

      // create sphere
      const geometry = new THREE.SphereGeometry(1, 24, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      });

      // test spheres
      const testSphere = new THREE.Mesh(geometry, material);
      testSphere.position.x = -0.5;
      testSphere.position.y = 0;
      scene.add(testSphere);
      const testSphere1 = new THREE.Mesh(geometry, material);
      testSphere1.position.x = 0.5;
      testSphere1.position.y = 0;
      scene.add(testSphere1);

      // point of attraction for the spheres
      const APGeometry = new THREE.SphereGeometry(0.1, 10, 6);
      const APMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      });
      const attractionPoint = new THREE.Mesh(APGeometry, APMaterial);
      scene.add(attractionPoint);

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
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // moving sphere
        const alpha = FOV / 2;
        // cameraZoffSet is "b" of the triangle
        // vectorScaler is "a" of the triangle
        const vectorScaler =
          Math.tan(alpha * (Math.PI / 180)) *
          (cameraZoffSet - Math.sin(theta) * sinAmplitude);

        attractionPoint.position.x = cursor.x * vectorScaler;
        attractionPoint.position.y = cursor.y * vectorScaler;

        // moves sphere back and forth in a sin wave
        attractionPoint.position.z = Math.sin(theta) * sinAmplitude;
        theta += 0.01;
        if (theta > Math.PI) {
          theta = -Math.PI;
        }

        // collision detection system
        for (const sphere of scene.children) {
          for (const sphere2 of scene.children) {
            if (sphere instanceof THREE.Mesh && sphere2 instanceof THREE.Mesh) {
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
                  const [moveSpheresDist, direction] = pullSpheresApartData(
                    [sphereRadius, spherePosition],
                    [sphere2Radius, sphere2Position],
                    distance
                  );

                  sphere.position.addScaledVector(direction, moveSpheresDist);
                  sphere2.position.addScaledVector(direction, -moveSpheresDist);
                }
              }
            }
          }
        }

        // move sphere to attraction point
        const sphereMass: number = 1;
        const attractionPointMass: number = 75000;
        const gravityConst: number = 6.67e-7;
        for (const sphere of scene.children) {
          if (sphere instanceof THREE.Mesh) {
            if (sphere === attractionPoint) continue;
            // calculate gravity force with newtons
            const distance = sphere.position.distanceTo(
              new THREE.Vector3(
                attractionPoint.position.x,
                attractionPoint.position.y,
                attractionPoint.position.z
              )
            );

            /*
             * I have changed Newtons formula where you
             * square the distance by the power of 2 in
             * order to soften the effect of gravity
             * changing as the distance changes.
             */
            const gravityForce =
              gravityConst *
              ((attractionPointMass * sphereMass) / Math.pow(distance, 0.25));

            // calculate direction of gravity force
            const direction = new THREE.Vector3(
              attractionPoint.position.x - sphere.position.x,
              attractionPoint.position.y - sphere.position.y,
              attractionPoint.position.z - sphere.position.z
            ).normalize();

            // apply gravity force
            sphere.position.addScaledVector(direction, gravityForce);
          }
        }
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
