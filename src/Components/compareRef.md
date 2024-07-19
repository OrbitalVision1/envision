import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

const Lightnew = () => {
  const spotLightRef3 = useRef();

  const {
    spotOn3,
    spotIntensity3,
    spot3CastShadow,
    spotPosition3,
    SSB3,
    SSM3,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraLeft,
    shadowCameraRight,
    shadowCameraTop,
    shadowCameraBottom,
  } = useControls({
    "Spot Light 3": folder({
      spotOn3: true,
      spotIntensity3: { value: 1, min: 0, max: 10, step: 0.1 },
      spot3CastShadow: true,
      spotPosition3: { value: [3, 2, 3], step: 1 },
      SSB3: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM3: { value: 2048, min: 512, max: 4096, step: 512 },
    }),
  });

  useHelper(spotLightRef3, THREE.SpotLightHelper, "orange");

  return (
    <>
      {spotOn3 && (
        <>
          <spotLight
            ref={spotLightRef3}
            name="spotLight3"
            intensity={spotIntensity3}
            position={spotPosition3}
            castShadow={spot3CastShadow}
            shadow-bias={SSB3}
            shadow-mapSize-width={SSM3}
            shadow-mapSize-height={SSM3}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
          />
          <mesh position={spotPosition3}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        </>
      )}
    </>
  );
};

export default Lightnew;
