/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextureLoader, RepeatWrapping } from "three";
import { useControls } from "leva";

const Modelnodes = () => {
  const meshRef = useRef();
  const fbx = useLoader(FBXLoader, "/src/assets/Chelsea - Small Sofa.fbx");

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
  const { roughness, metalness, displacementScale } = useControls({
    // roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    displacementScale: { value: 0.2, min: 0, max: 1, step: 0.01 },
  });

  // Apply textures to the model materials
  useEffect(() => {
    fbx.traverse((child) => {
      console.log(child.meshRef.current);
      if (child.isMesh) {
        if (child.name.toLowerCase().includes("Shadow_Rextangle003")) {
          child.visible = false; // Hide the plane mesh
        } else {
          child.material.map = colorMap;
          // child.material.normalMap = normalMap;
          child.material.roughness = roughness;
          child.material.metalness = metalness;
          child.material.displacementScale = displacementScale;
          child.material.needsUpdate = true; // Ensure the material updates
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMap, normalMap]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate for visual confirmation
    }
  });

  fbx.castShadow = true;
  fbx.receiveShadow = true;

  return <primitive ref={meshRef} object={fbx} dispose={null} />;
};

export default Modelnodes;
