/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MeshPhysicalMaterial, DoubleSide } from "three";
import { useStore } from "./Store";

const Meshes = () => {
  const meshRef = useRef();

  const fbx = useLoader(FBXLoader, "/src/assets/WSAMPLE.fbx"); // Path to your FBX model
  const colors = useStore((state) => state.colors);
  // Apply materials and log mesh names
  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          let color = colors[child.name] || "#999898"; // Default color if not in state

          child.material = new MeshPhysicalMaterial({
            color: color,
            side: DoubleSide,
          });


          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [fbx, colors]);

  useFrame(() => {
    if (meshRef.current) {
    }
  });

  return (
    <primitive ref={meshRef} object={fbx} dispose={null} scale={[1, 1, 1]} />
  );
};

export default Meshes;

