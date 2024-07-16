/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextureLoader, RepeatWrapping, MeshPhysicalMaterial } from "three";
import { useControls } from "leva";

const Model = () => {
  const meshRef = useRef();
  const fbx = useLoader(FBXLoader, "/src/assets/Chelsea - Small Sofa.fbx"); // Path to your FBX model

  // Load textures
  const colorMap = useLoader(
    TextureLoader,
    "/src/assets/wisteria-storm 1mx1m.jpg"
  );
  const normalMap = useLoader(
    TextureLoader,
    "/src/assets/wisteria-storm_NRM.jpg"
  );

  // Set wrapping and repeat
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(2, 2); // Adjust repeat to better fit your model

  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(2, 2); // Adjust repeat to better fit your model

  // Leva controls for material properties
  // const { roughness, metalness, displacementScale } = useControls({
  //   roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //   metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //   displacementScale: { value: 0.05, min: 0, max: 0.5, step: 0.01 },
  // });

  // Apply textures to the model materials
  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        console.log(child); // Log each child node to the console

        // Force the use of MeshPhysicalMaterial
        child.material = new MeshPhysicalMaterial({
          map: colorMap,
          normalMap: normalMap,
        });

        // Check if the mesh is the unwanted plane by its ID and hide it
        if (child.id === 2095853326848) {
          // Use the specific ID
          child.visible = false; // Hide the plane geometry
        } else {
          child.material.needsUpdate = true; // Ensure the material updates
        }
      }
    });
  }, [fbx, colorMap, normalMap]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate for visual confirmation
    }
  });

  return <primitive ref={meshRef} object={fbx} dispose={null} />;
};

export default Model;
