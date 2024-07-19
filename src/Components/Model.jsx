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
  MeshBasicMaterial,
  NormalBlending,
  FrontSide,
} from "three";
import { useControls } from "leva";

const Model = () => {
  const meshRef = useRef();

  const fbx = useLoader(FBXLoader, "/src/assets/WSAMPLE.fbx");

  // Load textures
  const colorMap = useLoader(TextureLoader, "/src/assets/Arctic_COL_LOW.jpg");
  const normalMap = useLoader(TextureLoader, "/src/assets/Arctic_NRM_LOW.jpg");
  const environmentMap = useLoader(
    TextureLoader,
    "/src/assets/barxat bump.jpg"
  );
  const metalnessMap = useLoader(TextureLoader, "/src/assets/dr_4.jpg");
  const woodMap = useLoader(
    TextureLoader,
    "/src/assets/Antique Oak Diffuse 2.jpg"
  );
  const studMap = useLoader(
    TextureLoader,
    "/src/assets/Antique Oak Diffuse 2.jpg"
  );

  const floorTexture = useLoader(
    TextureLoader,
    "/src/assets/Shadow Sutton Bench Stool (1).jpg"
  );

  // Set color space (SRGBEncoding) and wrapping for all textures
  [colorMap, normalMap, environmentMap, metalnessMap, studMap].forEach(
    (texture) => {
      texture.colorSpace = SRGBColorSpace;
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
    }
  );

  // Leva controls for material properties and shadow toggle
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

  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          let materialProps = {
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
            metalness: metalness,
          };

          // Apply material to Wood mesh
          if (child.name === "Westbury_Compact_Sofa_Wood") {
            materialProps.map = woodMap;
          }

          // Apply material to Stud mesh
          if (child.name === "Westbury_Compact_Sofa_Stud") {
            materialProps = {
              color: "#25231e",
              opacity: 1,
              transparent: true,
              blending: NormalBlending,
              envMap: environmentMap,
              envMapIntensity: 1,
              refractionRatio: 0.98,
              reflectivity: 1,
              bumpScale: 0,
              displacementScale: 1,
              displacementBias: 0,
              normalScale: 1,
              metalness: 0.5,
              roughness: 0.9,
              specularColor: "#64532e",
              glossiness: 0.55,
              clearcoat: 0,
              coatRoughness: 0,
              diffuseBias: 0.01,
              diffuseScale: 1,
              diffusePower: 1,
              diffuseColor: "#000000",
              reflectionBias: 0.01,
              reflectionScale: 1,
              reflectionPower: 1,
              aoMapIntensity: 1,
              emissive: "#000000",
              emissiveIntensity: 1,
              fog: true,
              lights: true,
              // shading: THREE.SmoothShading,
              side: DoubleSide,
            };
          }

          // Apply floor texture to Shadow_Rextangle003
          if (child.name === "Shadow_Rextangle003") {
            child.material = new MeshBasicMaterial({
              alphaMap: floorTexture,
              transparent: true,
              opacity: 1.5,
              blending: NormalBlending,
              side: FrontSide,
            });
            child.receiveShadow = true;
          } else {
            child.material = new MeshPhysicalMaterial(materialProps);
            child.castShadow = castShadows;
            child.receiveShadow = castShadows;
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
    woodMap,
    sheen,
    reflectivity,
    bumpScale,
    roughness,
    metalness,
    castShadows,
    floorTexture,
  ]);

  useFrame(() => {
    if (meshRef.current) {
      // Update material properties in real-time
      meshRef.current.traverse((child) => {
        if (child.isMesh && child.material.isMeshPhysicalMaterial) {
          child.material.sheen = sheen;
          child.material.reflectivity = reflectivity;
          child.material.bumpScale = bumpScale;
          child.material.roughness = roughness;
          child.material.metalness = metalness;
          child.material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <>
      <primitive ref={meshRef} object={fbx} />
    </>
  );
};

export default Model;
