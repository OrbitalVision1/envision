/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

const Lightnew = ({ modelRef }) => {
  const {
    ambientOn,
    ambientIntensity,
    hemiOn,
    hemiIntensity,
    dirOn,
    dirIntensity,
    dirCastShadow,
    dirPosition,
    dirOnLeft,
    dirIntensityLeft,
    dirLeftCastShadow,
    dirPositionLeft,
    dirOnRight,
    dirIntensityRight,
    dirRightCastShadow,
    dirPositionRight,
    spotOn1,
    spotIntensity1,
    spot1CastShadow,
    spotPosition1,
    spotAngle1,
    spotPenumbra1,
    spotOn2,
    spotIntensity2,
    spot2CastShadow,
    spotPosition2,
    spotAngle2,
    spotPenumbra2,
    spotOn3,
    spotIntensity3,
    spot3CastShadow,
    spotPosition3,
    spotAngle3,
    spotPenumbra3,
    spotOn4,
    spotIntensity4,
    spot4CastShadow,
    spotPosition4,
    spotAngle4,
    spotPenumbra4,
    spotOn5,
    spotIntensity5,
    spot5CastShadow,
    spotPosition5,
    spotAngle5,
    spotPenumbra5,
    pointOn,
    pointIntensity,
    pointCastShadow,
    pointPosition,
    DSB,
    DLSB,
    DRSB,
    SSB1,
    SSB2,
    SSB3,
    SSB4,
    SSB5,
    PSB,
    DSM,
    DLSM,
    DRSM,
    SSM1,
    SSM2,
    SSM3,
    SSM4,
    SSM5,
    PSM,
    CameraNearS1,
    CameraFarS1,
    CameraNearS2,
    CameraFarS2,
    CameraNearS3,
    CameraFarS3,
    CameraNearS4,
    CameraFarS4,
    CameraNearS5,
    CameraFarS5,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraLeft,
    shadowCameraRight,
    shadowCameraTop,
    shadowCameraBottom,
  } = useControls({
    "Ambient Light": folder({
      ambientOn: true,
      ambientIntensity: { value: 1.0, min: 0, max: 10, step: 0.1 },
    }),
    "Hemisphere Light": folder({
      hemiOn: true,
      hemiIntensity: { value: 1.8, min: 0, max: 10, step: 0.1 },
    }),
    "Directional Light": folder({
      dirOn: true,
      dirIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
      dirCastShadow: true,
      dirPosition: { value: [3, 12, -13], step: 1 },
      DSB: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      DSM: { value: 2048, min: 512, max: 4096, step: 512 },
    }),
    "Directional Light Left": folder({
      dirOnLeft: true,
      dirIntensityLeft: { value: 1.5, min: 0, max: 10, step: 0.1 },
      dirLeftCastShadow: true,
      dirPositionLeft: { value: [-10, 15, 0], step: 1 },
      DLSB: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      DLSM: { value: 2048, min: 512, max: 4096, step: 512 },
    }),
    "Directional Light Right": folder({
      dirOnRight: true,
      dirIntensityRight: { value: 1.5, min: 0, max: 10, step: 0.1 },
      dirRightCastShadow: true,
      dirPositionRight: { value: [10, 15, 0], step: 1 },
      DRSB: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      DRSM: { value: 2048, min: 512, max: 4096, step: 512 },
    }),
    "Spot Light 1": folder({
      spotOn1: true,
      spotIntensity1: { value: 3, min: 0, max: 10, step: 0.5 },
      spot1CastShadow: true,
      spotPosition1: { value: [3, 2, 3], step: 1 },
      spotAngle1: { value: 0.3, min: 0, max: Math.PI / 2, step: 0.1 },
      spotPenumbra1: { value: 0.0, min: 0, max: 1, step: 0.1 },
      SSB1: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM1: { value: 2048, min: 512, max: 4096, step: 512 },
      CameraNearS1: { value: 1, min: 0.1, max: 50, step: 0.1 },
      CameraFarS1: { value: 10, min: 0.1, max: 100, step: 0.1 },
    }),
    "Spot Light 2": folder({
      spotOn2: true,
      spotIntensity2: { value: 3, min: 0, max: 10, step: 0.5 },
      spot2CastShadow: true,
      spotPosition2: { value: [-3, 2, 3], step: 1 },
      spotAngle2: { value: 0.3, min: 0, max: Math.PI / 2, step: 0.1 },
      spotPenumbra2: { value: 0.0, min: 0, max: 1, step: 0.1 },
      SSB2: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM2: { value: 2048, min: 512, max: 4096, step: 512 },
      CameraNearS2: { value: 1, min: 0.1, max: 50, step: 0.1 },
      CameraFarS2: { value: 10, min: 0.1, max: 100, step: 0.1 },
    }),
    "Spot Light 3": folder({
      spotOn3: true,
      spotIntensity3: { value: 3, min: 0, max: 10, step: 0.5 },
      spot3CastShadow: true,
      spotPosition3: { value: [3, 2, 3], step: 1 },
      spotAngle3: { value: 0.15, min: 0, max: Math.PI / 2, step: 0.1 },
      spotPenumbra3: { value: 0.0, min: 0, max: 1, step: 0.1 },
      SSB3: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM3: { value: 2048, min: 512, max: 4096, step: 512 },
      CameraNearS3: { value: 1, min: 0.1, max: 50, step: 0.1 },
      CameraFarS3: { value: 10, min: 0.1, max: 100, step: 0.1 },
    }),
    "Spot Light 4": folder({
      spotOn4: true,
      spotIntensity4: { value: 3, min: 0, max: 10, step: 0.5 },
      spot4CastShadow: true,
      spotPosition4: { value: [-6, 2, 3], step: 1 },
      spotAngle4: { value: 0.45, min: 0, max: Math.PI / 2, step: 0.1 },
      spotPenumbra4: { value: 0.0, min: 0, max: 1, step: 0.1 },
      SSB4: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM4: { value: 2048, min: 512, max: 4096, step: 512 },
      CameraNearS4: { value: 1, min: 0.1, max: 50, step: 0.1 },
      CameraFarS4: { value: 10, min: 0.1, max: 100, step: 0.1 },
    }),
    "Spot Light 5": folder({
      spotOn5: true,
      spotIntensity5: { value: 3.0, min: 0, max: 10, step: 0.5 },
      spot5CastShadow: true,
      spotPosition5: { value: [6, 2, 3], step: 1 },
      spotAngle5: { value: 0.45, min: 0, max: Math.PI / 2, step: 0.1 },
      spotPenumbra5: { value: 0.0, min: 0, max: 1, step: 0.1 },
      SSB5: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      SSM5: { value: 2048, min: 512, max: 4096, step: 512 },
      CameraNearS5: { value: 1, min: 0.1, max: 50, step: 0.1 },
      CameraFarS5: { value: 10, min: 0.1, max: 100, step: 0.1 },
    }),
    "Point Light": folder({
      pointOn: true,
      pointIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
      pointCastShadow: true,
      pointPosition: { value: [25, 5, -5], step: 1 },
      PSB: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      PSM: { value: 2048, min: 512, max: 4096, step: 512 },
    }),
  });

  const dirLightRef = useRef();
  const dirLightLeftRef = useRef();
  const dirLightRightRef = useRef();
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const spotLightRef3 = useRef();
  const spotLightRef4 = useRef();
  const spotLightRef5 = useRef();
  const pointLightRef = useRef();

  // useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, "red");
  // useHelper(dirLightLeftRef, THREE.DirectionalLightHelper, 1, "blue");
  // useHelper(dirLightRightRef, THREE.DirectionalLightHelper, 1, "green");
  // useHelper(spotLightRef1, THREE.SpotLightHelper, "yellow");
  // useHelper(spotLightRef2, THREE.SpotLightHelper, "purple");
  // useHelper(spotLightRef3, THREE.SpotLightHelper, "orange");
  // useHelper(spotLightRef4, THREE.SpotLightHelper, "magenta");
  // useHelper(spotLightRef5, THREE.SpotLightHelper, "skyblue");
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, "darkblue");

  return (
    <>
      {ambientOn && <ambientLight intensity={ambientIntensity} />}
      {hemiOn && <hemisphereLight intensity={hemiIntensity} />}
      {dirOn && (
        <>
          <directionalLight
            ref={dirLightRef}
            intensity={dirIntensity}
            position={dirPosition}
            castShadow={dirCastShadow}
            shadow-bias={DSB}
            shadow-mapSize-width={DSM}
            shadow-mapSize-height={DSM}
            shadow-camera-near={shadowCameraNear}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-left={shadowCameraLeft}
            shadow-camera-right={shadowCameraRight}
            shadow-camera-top={shadowCameraTop}
            shadow-camera-bottom={shadowCameraBottom}
          />
          <mesh position={dirPosition}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
        </>
      )}
      {dirOnLeft && (
        <>
          <directionalLight
            ref={dirLightLeftRef}
            intensity={dirIntensityLeft}
            position={dirPositionLeft}
            castShadow={dirLeftCastShadow}
            shadow-bias={DLSB}
            shadow-mapSize-width={DLSM}
            shadow-mapSize-height={DLSM}
            shadow-camera-near={shadowCameraNear}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-left={shadowCameraLeft}
            shadow-camera-right={shadowCameraRight}
            shadow-camera-top={shadowCameraTop}
            shadow-camera-bottom={shadowCameraBottom}
            distance={5}
          />
          <mesh position={dirPositionLeft}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        </>
      )}
      {dirOnRight && (
        <>
          <directionalLight
            ref={dirLightRightRef}
            intensity={dirIntensityRight}
            position={dirPositionRight}
            castShadow={dirRightCastShadow}
            shadow-bias={DRSB}
            shadow-mapSize-width={DRSM}
            shadow-mapSize-height={DRSM}
            shadow-camera-near={shadowCameraNear}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-left={shadowCameraLeft}
            shadow-camera-right={shadowCameraRight}
            shadow-camera-top={shadowCameraTop}
            shadow-camera-bottom={shadowCameraBottom}
            distance={5}
          />
          <mesh position={dirPositionRight}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="green" />
          </mesh>
        </>
      )}
      {spotOn1 && (
        <>
          <spotLight
            ref={spotLightRef1}
            intensity={spotIntensity1}
            position={spotPosition1}
            castShadow={spot1CastShadow}
            angle={spotAngle1}
            penumbra={spotPenumbra1}
            shadow-bias={SSB1}
            shadow-mapSize-width={SSM1}
            shadow-mapSize-height={SSM1}
            shadow-camera-near={CameraNearS1}
            shadow-camera-far={CameraFarS1}
            distance={20}
            decay={0}
          />
          <mesh position={spotPosition1}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="yellow" />
          </mesh>
        </>
      )}
      {spotOn2 && (
        <>
          <spotLight
            ref={spotLightRef2}
            intensity={spotIntensity2}
            position={spotPosition2}
            castShadow={spot2CastShadow}
            angle={spotAngle2}
            penumbra={spotPenumbra2}
            shadow-bias={SSB2}
            shadow-mapSize-width={SSM2}
            shadow-mapSize-height={SSM2}
            shadow-camera-near={CameraNearS2}
            shadow-camera-far={CameraFarS2}
            distance={20}
            decay={0}
          />
          <mesh position={spotPosition2}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="purple" />
          </mesh>
        </>
      )}
      {spotOn3 && (
        <>
          <spotLight
            ref={spotLightRef3}
            intensity={spotIntensity3}
            position={spotPosition3}
            castShadow={spot3CastShadow}
            angle={spotAngle3}
            // angle={0.15}
            penumbra={spotPenumbra3}
            shadow-bias={SSB3}
            shadow-mapSize-width={SSM3}
            shadow-mapSize-height={SSM3}
            shadow-camera-near={CameraNearS3}
            shadow-camera-far={CameraFarS3}
            decay={0}
            distance={30}
          />
          <mesh position={spotPosition3}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="orange" />
          </mesh>
        </>
      )}
      {spotOn4 && (
        <>
          <spotLight
            ref={spotLightRef4}
            intensity={3}
            position={spotPosition4}
            castShadow={spot4CastShadow}
            angle={spotAngle4}
            // angle={0.45}
            penumbra={spotPenumbra4}
            shadow-bias={SSB4}
            shadow-mapSize-width={SSM4}
            shadow-mapSize-height={SSM4}
            shadow-camera-near={CameraNearS4}
            shadow-camera-far={CameraFarS4}
            distance={30}
            decay={0}
          />
          <mesh position={spotPosition4}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="magenta" />
          </mesh>
        </>
      )}
      {spotOn5 && (
        <>
          <spotLight
            ref={spotLightRef5}
            intensity={spotIntensity5}
            position={spotPosition5}
            castShadow={spot5CastShadow}
            angle={spotAngle5}
            // angle={0.45}
            penumbra={spotPenumbra5}
            shadow-bias={SSB5}
            shadow-mapSize-width={SSM5}
            shadow-mapSize-height={SSM5}
            shadow-camera-near={CameraNearS5}
            shadow-camera-far={CameraFarS5}
            decay={0}
            distance={30}
          />
          <mesh position={spotPosition5}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="skyblue" />
          </mesh>
        </>
      )}
      {pointOn && (
        <>
          <pointLight
            ref={pointLightRef}
            intensity={pointIntensity}
            position={pointPosition}
            castShadow={pointCastShadow}
            shadow-bias={PSB}
            shadow-mapSize-width={PSM}
            shadow-mapSize-height={PSM}
          />
          <mesh position={pointPosition}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        </>
      )}
    </>
  );
};

export default Lightnew;
