/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Wsample = ({ texture }) => {
  const fbx = useLoader(FBXLoader, "/src/assets/WSAMPLE.fbx");

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, texture]);
  return <primitive object={fbx} />;
};
export default Wsample;
