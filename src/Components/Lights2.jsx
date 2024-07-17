import React, { useEffect } from "react";
import { useFBX, useTexture } from "@react-three/drei";
import {
  Mesh,
  RepeatWrapping,
  MeshPhysicalMaterial,
  DoubleSide,
  SRGBColorSpace,
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
    sheen,
    reflectivity,
    bumpScale,
    roughness,
    metalness: 0.32,
    side: DoubleSide,
    clipShadows: true,
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
    roughness: 0.98,
    metalness: 0.8,
    color: "#e6e6e6",
    transparent: true,
    side: FrontSide,
    flatShading: true,
    colorSpace: SRGBColorSpace,
  });

  const studMaterial = new MeshPhysicalMaterial({
    color: "#25231e",
    opacity: 1,
    transparent: true,
    blending: NormalBlending,
    envMapIntensity: 1,
    refractionRatio: 0.98,
    reflectivity: 1,
    roughness: 0.4,
    metalness: 0.5,
    specularColor: "#64532e",
    glossiness: 0.55,
    side: DoubleSide,
    colorSpace: SRGBColorSpace,
  });

  const woodleg = useTexture("src/assets/Antique Oak Diffuse 2.jpg");

  const woodMap = new MeshPhysicalMaterial({
    map: woodleg,
    wrapS: RepeatWrapping,
    wrapT: RepeatWrapping,
    colorSpace: SRGBColorSpace,
    side: DoubleSide,
    repeat: [1, 1],
  });

  const fbx = useFBX("src/assets/WSAMPLE.fbx");

  useEffect(() => {
    if (fbx) {
      fbx.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.name.includes("Shadow_Rextangle003")) {
            child.material = boxMaterial;
          } else if (child.name.includes("Westbury_Compact_Sofa_Stud")) {
            child.material = studMaterial;
          } else if (child.name.includes("Westbury_Compact_Sofa_Wood")) {
            child.material = woodMap;
          } else {
            child.material = customMaterial;
          }
        }
      });
      fbx.castShadow = true;
      fbx.receiveShadow = true;
    }
  }, [fbx, customMaterial, boxMaterial, woodMap, studMaterial]);

  return <primitive object={fbx} />;
};

export default Sofa1;
