/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

const Lightnew = () => {
  const {

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
    spotOn2,
    spotIntensity2,
    spot2CastShadow,
    spotPosition2,
    spotOn3,
    spotIntensity3,
    spot3CastShadow,
    spotPosition3,
    spotOn4,
    spotIntensity4,
    spot4CastShadow,
    spotPosition4,
    spotOn5,
    spotIntensity5,
    spot5CastShadow,
    spotPosition5,
    pointOn,
    pointIntensity,
    pointCastShadow,
    pointPosition,
    shadowBias,
    shadowMapSize,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraLeft,
    shadowCameraRight,
    shadowCameraTop,
    shadowCameraBottom,
  } = useControls({
    "Ambient Light": folder({
      ambientOn: true,
      ambientIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    }),
    "Hemisphere Light": folder({
      hemiOn: true,
      hemiIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    }),
    "Directional Light": folder({
      dirOn: true,
      dirIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
      dirCastShadow: true,
      dirPosition: { value: [2, 10, 2], step: 1 },
    }),
    "Directional Light Left": folder({
      dirOnLeft: true,
      dirIntensityLeft: { value: 1.5, min: 0, max: 10, step: 0.1 },
      dirLeftCastShadow: true,
      dirPositionLeft: { value: [-10, 10, 0], step: 1 },
    }),
    "Directional Light Right": folder({
      dirOnRight: true,
      dirIntensityRight: { value: 1.5, min: 0, max: 10, step: 0.1 },
      dirRightCastShadow: true,
      dirPositionRight: { value: [10, 10, 0], step: 1 },
    }),
    "Spot Light 1": folder({
      spotOn1: true,
      spotIntensity1: { value: 1, min: 0, max: 10, step: 0.1 },
      spot1CastShadow: true,
      spotPosition1: { value: [3, 2, 3], step: 1 },
    }),
    "Spot Light 2": folder({
      spotOn2: true,
      spotIntensity2: { value: 1, min: 0, max: 10, step: 0.1 },
      spot2CastShadow: true,
      spotPosition2: { value: [-3, 2, 3], step: 1 },
    }),
    "Spot Light 3": folder({
      spotOn3: true,
      spotIntensity3: { value: 1, min: 0, max: 10, step: 0.1 },
      spot3CastShadow: true,
      spotPosition3: { value: [3, 2, 3], step: 1 },
    }),
    "Spot Light 4": folder({
      spotOn4: true,
      spotIntensity4: { value: 1, min: 0, max: 10, step: 0.1 },
      spot4CastShadow: true,
      spotPosition4: { value: [-6, 2, 3], step: 1 },
    }),
    "Spot Light 5": folder({
      spotOn5: true,
      spotIntensity5: { value: 1, min: 0, max: 10, step: 0.1 },
      spot5CastShadow: true,
      spotPosition5: { value: [6, 2, 3], step: 1 },
    }),
    "Point Light": folder({
      pointOn: true,
      pointIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
      pointCastShadow: true,
      pointPosition: { value: [25, 5, -5], step: 1 },
    }),
    "Shadow Settings": folder({
      shadowBias: { value: -0.002, min: -0.006, max: 0.1, step: 0.001 },
      shadowMapSize: { value: 2048, min: 512, max: 4096, step: 512 },
      shadowCameraFar: { value: 50, min: 0.1, max: 100, step: 0.1 },
      shadowCameraNear: { value: 0.5, min: 0.1, max: 50, step: 0.1 },
      shadowCameraLeft: { value: -10, min: -50, max: 0, step: 1 },
      shadowCameraRight: { value: 10, min: 0, max: 50, step: 1 },
      shadowCameraTop: { value: 10, min: 0, max: 50, step: 1 },
      shadowCameraBottom: { value: -10, min: -50, max: 0, step: 1 },
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

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(dirLightLeftRef, THREE.DirectionalLightHelper, 1, "blue");
  useHelper(dirLightRightRef, THREE.DirectionalLightHelper, 1, "green");
  useHelper(spotLightRef1, THREE.SpotLightHelper, "yellow");
  useHelper(spotLightRef2, THREE.SpotLightHelper, "purple");
  useHelper(spotLightRef3, THREE.SpotLightHelper, "orange");
  useHelper(spotLightRef4, THREE.SpotLightHelper, "magenta");
  useHelper(spotLightRef5, THREE.SpotLightHelper, "skyblue");
  useHelper(pointLightRef, THREE.PointLightHelper, 1, "darkblue");

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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-near={shadowCameraNear}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-near={shadowCameraNear}
            shadow-camera-left={shadowCameraLeft}
            shadow-camera-right={shadowCameraRight}
            shadow-camera-top={shadowCameraTop}
            shadow-camera-bottom={shadowCameraBottom}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-far={shadowCameraFar}
            shadow-camera-near={shadowCameraNear}
            shadow-camera-left={shadowCameraLeft}
            shadow-camera-right={shadowCameraRight}
            shadow-camera-top={shadowCameraTop}
            shadow-camera-bottom={shadowCameraBottom}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
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
      {spotOn4 && (
        <>
          <spotLight
            ref={spotLightRef4}
            intensity={spotIntensity4}
            position={spotPosition4}
            castShadow={spot4CastShadow}
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
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
            shadow-bias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
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
