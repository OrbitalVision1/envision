/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  TextureLoader,
  RepeatWrapping,
  MeshPhysicalMaterial,
  DoubleSide,
  SRGBColorSpace,
} from "three";
import { useControls } from "leva";

const Model = () => {
  const meshRef = useRef();

  const fbx = useLoader(FBXLoader, "/src/assets/WSAMPLE.fbx"); // Path to your FBX model

  // Load textures
  const colorMap = useLoader(TextureLoader, "/src/assets/Arctic_COL_LOW.jpg");
  const normalMap = useLoader(TextureLoader, "/src/assets/Arctic_NRM_LOW.jpg");
  const environmentMap = useLoader(
    TextureLoader,
    "/src/assets/barxat bump.jpg"
  );
  const metalnessMap = useLoader(TextureLoader, "/src/assets/dr_4.jpg");

  // Set color space (SRGBEncoding)
  [colorMap, normalMap, environmentMap, metalnessMap].forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
  });

  // Set wrapping and repeat
  [colorMap, normalMap, environmentMap, metalnessMap].forEach((texture) => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(4, 4); // Adjust repeat to better fit your model
  });

  const {
    anisotropy,
    anisotropyMap,
    anisotropyRotation,
    attenuationColor,
    sheen,
    sheenRoughness,
    sheenColor,
    reflectivity,
    envMapIntensity,
    bumpScale,
    displacementScale,
    opacity,
    ior,
    roughness,
    clearcoat,
    metalness,
    iridescence,
    iridescenceIOR,
    iridescenceThicknessRange,
    specularIntensity,
    specularColor,
    transmission,
    aoMapIntensity,
    displacementBias,
    castShadows,
  } = useControls({
    anisotropy: { value: 0, min: 1, max: 16 },
    anisotropyMap: { value: 0, min: 1, max: 16 },
    sheen: { value: 0, min: 0, max: 1 },
    sheenRoughness: { value: 0, min: 0, max: 1 },
    sheenColor: "#000000",
    shaderMaterial: { value: 0, min: 0, max: 1 },
    reflectivity: { value: 0.2, min: 0, max: 1 },
    anisotropyRotation: { value: 0, min: 0, max: 1 },
    attenuationColor: "#ffffff",
    envMapIntensity: { value: 0.5, min: 0, max: 1 },
    bumpScale: { value: 0.001, min: 0, max: 1 },
    displacementScale: { value: 0, min: 0, max: 0.5 },
    opacity: { value: 0, min: 0, max: 1 },
    ior: { value: 0, min: 1, max: 2 },
    roughness: { value: 0.9, min: 0, max: 1 },
    metalness: { value: 0.32, min: 0, max: 1 },

    clearcoat: { value: 0.0, min: 0, max: 1 },
    iridescence: { value: 0.2, min: 0, max: 1 },
    iridescenceIOR: { value: 0.2, min: 1, max: 2 },
    iridescenceThicknessRange: { value: [100, 3000], min: 0, max: 1 },
    specularIntensity: { value: 0.5, min: 0, max: 1 },
    specularColor: "#ffffff",
    transmission: 0.001,
    aoMapIntensity: 0.5,
    displacementBias: 0,
    castShadows: { value: true },
  });

  // Apply textures to the model materials
  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          console.log(child.name);
          child.material = new MeshPhysicalMaterial({
            map: colorMap,
            metalnessMap: metalnessMap,
            normalMap: normalMap,
            envMap: environmentMap,
            bumpMap: normalMap,
            color: "#999898",
            shadowSide: DoubleSide,
            clipShadows: true,
            sheen: sheen,
            reflectivity: reflectivity,
            bumpScale: bumpScale,
            side: DoubleSide,
            roughness: roughness,
            metalness: 0.32,
          });

          child.castShadow = castShadows;
          child.receiveShadow = castShadows;

          if (child.name === "Shadow_Rextangle003") {
            child.visible = false;
          } else {
            child.visible = true;
            child.receiveShadow = true;
          }
        }
      });
    }
  }, [
    fbx,
    colorMap,
    normalMap,
    environmentMap,
    metalnessMap,
    sheen,
    reflectivity,
    bumpScale,
    roughness,
    metalness,
    castShadows,
  ]);

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.y += 0.01; // Rotate for visual confirmation
    }
  });

  return (
    <>
      <primitive ref={meshRef} object={fbx} dispose={null} />
    </>
  );
};

export default Model;
