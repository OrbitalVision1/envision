import React, { useEffect } from "react";
import { useFBX, useTexture } from "@react-three/drei";
import {
  Mesh,
  RepeatWrapping,
  MeshPhysicalMaterial,
  DoubleSide,
  SRGBColorSpace,
  Scene,
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

  const boxMaterial = new MeshPhysicalMaterial({
    map: floortexture.maptest,
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
          child.visible = false;
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
