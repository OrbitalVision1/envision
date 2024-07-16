/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Model = ({ texture }) => {
  const fbx = useLoader(FBXLoader, "/src/assets/Chelsea - Small Sofa.fbx");

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbx, texture]);
  return <primitive object={fbx} />;
};

export default Model;
