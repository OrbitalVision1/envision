import React, { useEffect } from "react";
import { useFBX, useTexture } from "@react-three/drei";
import {
  Mesh,
  RepeatWrapping,
  MeshPhysicalMaterial,
  DoubleSide,
  SRGBColorSpace,
} from "three";
import { useControls } from "leva";
import { blue } from "@mui/material/colors";

const Sofa1 = () => {
  const terrainTextures = useTexture({
    map: "https://data.expivi.net/teams/4145/media/file_62d7fe05a293f/Arctic_COL_LOW.jpg",
    // roughnessMap: "/Specchio bump map_LOW.jpg",
    metalnessMap:
      "https://data.expivi.net/teams/4145/media/file_623c3a07c457a/dr_4.jpg",
    envMap:
      "https://data.expivi.net/teams/4145/media/file_623c39c5612c7/barxat%20bump.jpg",
    bumpMap:
      "https://data.expivi.net/teams/4145/media/file_62d7fe16023a2/Arctic_NRM_LOW.jpg",
  });

  const floortexture = useTexture({
    maptest: "/src/assets/Shadow Sutton Bench Stool (1).jpg",
  });

  Object.values(terrainTextures).forEach((texture) => {
    if (texture) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = SRGBColorSpace;
    }
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
    // thickness,
    transmission,
    aoMapIntensity,
    displacementBias,
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
    // thickness: 0.1,
    transmission: 0.001,
    aoMapIntensity: 0.5,
    displacementBias: 0,
  });

  const customMaterial = new MeshPhysicalMaterial({
    map: terrainTextures.map,
    metalnessMap: terrainTextures.metalnessMap,
    normalMap: terrainTextures.bumpMap,
    envMap: terrainTextures.envMap,
    bumpMap: terrainTextures.bumpMap,
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

  const boxMaterial = new MeshPhysicalMaterial({
    map: floortexture.map,
  });

  const fbx = useFBX("src/assets/WSAMPLE.fbx");

  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = customMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
        const hideelement = child.name.includes("Shadow_Rextangle003");
        if (hideelement) {
          child.visible = true;
          child.material = boxMaterial;
        } else {
          child.visible = true;
        }
      });
      fbx.castShadow = true;
      fbx.receiveShadow = true;
    }
  }, [fbx, customMaterial]);

  return <primitive object={fbx} />;
};

export default Sofa1;
