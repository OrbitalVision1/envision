import React, { useEffect } from "react";
import { Shadow, useFBX, useTexture } from "@react-three/drei";
import {
  Mesh,
  RepeatWrapping,
  MeshPhysicalMaterial,
  DoubleSide,
  SRGBColorSpace,
  ShadowMaterial,
  MeshBasicMaterial,
  NormalBlending,
  FrontSide,
  MeshPhongMaterial,
} from "three";
import { useControls } from "leva";

const Sofa1 = () => {
  const terrainTextures = useTexture({
    map: "https://data.expivi.net/teams/4145/media/file_62d7fe05a293f/Arctic_COL_LOW.jpg",
    metalnessMap:
      "https://data.expivi.net/teams/4145/media/file_623c3a07c457a/dr_4.jpg",
    envMap:
      "https://data.expivi.net/teams/4145/media/file_623c39c5612c7/barxat%20bump.jpg",
    bumpMap:
      "https://data.expivi.net/teams/4145/media/file_62d7fe16023a2/Arctic_NRM_LOW.jpg",
  });

  Object.values(terrainTextures).forEach((texture) => {
    if (texture) {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = SRGBColorSpace;
    }
  });

  const { anisotropy, sheen, reflectivity, bumpScale, roughness } = useControls(
    {
      anisotropy: { value: 0, min: 1, max: 16 },
      sheen: { value: 0, min: 0, max: 1 },
      reflectivity: { value: 0.2, min: 0, max: 1 },
      bumpScale: { value: 0.001, min: 0, max: 1 },
      roughness: { value: 0.9, min: 0, max: 1 },
    }
  );

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

  const floorTexture = useTexture(
    "https://data.expivi.net/teams/4145/media/file_6661a610ac91b/Shadow%20Sutton%20Bench%20Stool.jpg"
  );

  const boxMaterial = new MeshBasicMaterial({
    alphaMap: floorTexture,
    opacity: 0.6,
    blending: NormalBlending,
    envMapIntensity: 1,
    refractionRatio: 0.98,
    reflectivity: 1,
    bumpScale: 0,
    displacementScale: 1,
    displacementBias: 0,
    norrmalScale: 1,
    metalness: 0.8,
    roughness: 0.98,
    specularColor: "#111111",
    blosiness: 0.4,
    diffuseBias: 0.01,
    difuseScale: 1,
    difusePower: 1,
    difuseeColor: "#000000",
    reflectionBias: 0.01,
    reflectionScale: 1,
    reflectionPower: 1,
    aoMapIntensity: 1,
    lightMapIntensity: 1,
    emissiveColor: "#000000",
    emissiveIntensity: 1,
    side: FrontSide,
    flatShading: true,
    difuseColor: "#e6e6e6",
    transparent: true,
    castShadow: true,
    receiveShadow: true,
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
  }, [fbx, customMaterial, boxMaterial]);

  return <primitive object={fbx} />;
};

export default Sofa1;
