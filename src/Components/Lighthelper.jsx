/* eslint-disable react/no-unknown-property */
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const LightHelpers = () => {
  const dirLightRef = useRef();
  const spotLightRef = useRef();
  const pointLightRef = useRef();

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(spotLightRef, THREE.SpotLightHelper, "green");
  useHelper(pointLightRef, THREE.PointLightHelper, 1, "blue");

  return (
    <>
      <directionalLight
        ref={dirLightRef}
        intensity={0.5}
        position={[0, 10, 0]}
        castShadow
      />
      <spotLight
        ref={spotLightRef}
        intensity={0.5}
        position={[2.5, 1.5, 3]}
        castShadow
      />
      <pointLight ref={pointLightRef} intensity={0.5} position={[0, 5, -5]} />
    </>
  );
};

export default LightHelpers;
