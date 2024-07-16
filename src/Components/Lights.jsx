/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const Lights = () => {
  const {
    ambientOn,
    ambientIntensity,
    hemiOn,
    hemiIntensity,
    dirOn,
    dirIntensity,
    dirPosition,
    dirCastShadow,
    dirCsOn,
    dirOnLeft,
    dirIntensityLeft,
    dirPositionLeft,
    dirLeftCastShadow,
    dirLCsOn,
    dirOnRight,
    dirIntensityRight,
    dirPositionRight,
    dirRightCastShadow,
    dirRCsOn,
    spotOn1,
    spotIntensity,
    spotDecay,
    spotDistance,
    spotPosition1,
    spot1CastShadow,
    s1CsON,
    spotOn2,
    spotPosition2,
    spot2CastShadow,
    s2CsON,
    pointOn,
    pointIntensity,
    pointPosition,
    pointCastShadow,
    pCsOn,
    shadowBias,
    shadowMapSize,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraLeft,
    shadowCameraRight,
    shadowCameraTop,
    shadowCameraBottom,
  } = useControls({
    Ambient: {
      ambientOn: { value: true, label: "Ambient Light On" },
      ambientIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Ambient Intensity",
      },
    },
    Hemisphere: {
      hemiOn: { value: true, label: "Hemisphere Light On" },
      hemiIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Hemisphere Intensity",
      },
    },
    Directional: {
      dirOn: { value: true, label: "Directional Light On" },
      dirIntensity: {
        value: 2,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Directional Intensity",
      },
      dirPosition: { value: [2, 10, 2], label: "Directional Position" },
      dirCastShadow: { value: true, label: "Directional Cast Shadow" },
      dirCsOn: { value: true, label: "Directional CS On" },
    },
    DirectionalLeft: {
      dirOnLeft: { value: true, label: "Directional Left Light On" },
      dirIntensityLeft: {
        value: 1.5,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Directional Left Intensity",
      },
      dirPositionLeft: {
        value: [-10, 10, 0],
        label: "Directional Left Position",
      },
      dirLeftCastShadow: { value: true, label: "Directional Left Cast Shadow" },
      dirLCsOn: { value: true, label: "Directional Left CS On" },
    },
    DirectionalRight: {
      dirOnRight: { value: true, label: "Directional Right Light On" },
      dirIntensityRight: {
        value: 1.5,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Directional Right Intensity",
      },
      dirPositionRight: {
        value: [10, 10, 0],
        label: "Directional Right Position",
      },
      dirRightCastShadow: {
        value: true,
        label: "Directional Right Cast Shadow",
      },
      dirRCsOn: { value: true, label: "Directional Right CS On" },
    },
    Spot1: {
      spotOn1: { value: true, label: "Spot Light 1 On" },
      spotPosition1: { value: [3, 2, 3], label: "Spot 1 Position" },
      spot1CastShadow: { value: true, label: "Spot Light 1 Cast Shadow" },
      s1CsON: { value: true, label: "Spot Light 1 CS On" },
    },
    Spot2: {
      spotOn2: { value: true, label: "Spot Light 2 On" },
      spotPosition2: { value: [-3, 2, 3], label: "Spot 2 Position" },
      spot2CastShadow: { value: true, label: "Spot Light 2 Cast Shadow" },
      s2CsON: { value: true, label: "Spot Light 2 CS On" },
    },
    SpotSettings: {
      spotIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Spot Intensity",
      },
      spotDecay: { value: 2, min: 1, max: 10, step: 0.1, label: "Spot Decay" },
      spotDistance: {
        value: 10,
        min: 1,
        max: 100,
        step: 1,
        label: "Spot Distance",
      },
    },
    Point: {
      pointOn: { value: true, label: "Point Light On" },
      pointPosition: { value: [25, 5, -5], label: "Point Light Position" },
      pointCastShadow: { value: true, label: "Point Light Cast Shadow" },
      pCsOn: { value: true, label: "Point Light CS On" },
      pointIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Point Intensity",
      },
    },

    shadowBias: {
      value: -0.1,
      min: -0.1,
      max: 0.1,
      step: 0.001,
    },
    shadowMapSize: {
      value: 2048,
      min: 512,
      max: 4096,
      step: 512,
      label: "Shadow Map Size",
    },
    shadowCameraFar: {
      value: 50,
      min: 0.1,
      max: 100,
      step: 0.1,
      label: "Shadow Camera Far",
    },
    shadowCameraNear: {
      value: 0.5,
      min: 0.1,
      max: 50,
      step: 0.1,
      label: "Shadow Camera Near",
    },
    shadowCameraLeft: {
      value: -10,
      min: -50,
      max: 0,
      step: 1,
      label: "Shadow Camera Left",
    },
    shadowCameraRight: {
      value: 10,
      min: 0,
      max: 50,
      step: 1,
      label: "Shadow Camera Right",
    },
    shadowCameraTop: {
      value: 10,
      min: 0,
      max: 50,
      step: 1,
      label: "Shadow Camera Top",
    },
    shadowCameraBottom: {
      value: -10,
      min: -50,
      max: 0,
      step: 1,
      label: "Shadow Camera Bottom",
    },
  });

  const dirLightRef = useRef();
  const dirLightLeftRef = useRef();
  const dirLightRightRef = useRef();
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const pointLightRef = useRef();

  useHelper(dirLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(dirLightLeftRef, THREE.DirectionalLightHelper, 1, "blue");
  useHelper(dirLightRightRef, THREE.DirectionalLightHelper, 1, "green");
  useHelper(spotLightRef1, THREE.SpotLightHelper, "yellow");
  useHelper(spotLightRef2, THREE.SpotLightHelper, "purple");
  useHelper(pointLightRef, THREE.PointLightHelper, 1, "orange");

  return (
    <>
      {ambientOn && <ambientLight intensity={ambientIntensity} />}
      {hemiOn && (
        <hemisphereLight intensity={hemiIntensity} groundColor={0xffffff} />
      )}
      {dirOn && (
        <directionalLight
          ref={dirLightRef}
          intensity={dirIntensity}
          position={dirPosition}
          castShadow
          shadow-bias={-0.001}
          shadow-intensity={3}
          shadow-mapSize-width={shadowMapSize}
          shadow-mapSize-height={shadowMapSize}
          shadow-camera-far={shadowCameraFar}
          shadow-camera-near={shadowCameraNear}
          shadow-camera-left={shadowCameraLeft}
          shadow-camera-right={shadowCameraRight}
          shadow-camera-top={shadowCameraTop}
          shadow-camera-bottom={shadowCameraBottom}
          shadow-depth={10}
        />
      )}
      {dirOnLeft && (
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
      )}
      {dirOnRight && (
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
      )}
      {spotOn1 && (
        <spotLight
          ref={spotLightRef1}
          intensity={spotIntensity}
          decay={spotDecay}
          distance={spotDistance}
          position={spotPosition1}
          castShadow={spot1CastShadow}
          shadow-bias={shadowBias}
          shadow-mapSize-width={shadowMapSize}
          shadow-mapSize-height={shadowMapSize}
          shadow-camera-fov={30}
          angle={0.6}
          penumbra={0}
        />
      )}
      {spotOn2 && (
        <spotLight
          ref={spotLightRef2}
          intensity={spotIntensity}
          decay={spotDecay}
          distance={spotDistance}
          position={spotPosition2}
          castShadow={spot2CastShadow}
          shadow-bias={shadowBias}
          shadow-mapSize-width={shadowMapSize}
          shadow-mapSize-height={shadowMapSize}
          shadow-camera-fov={30}
          angle={0.6}
          penumbra={0}
        />
      )}
      {pointOn && (
        <pointLight
          ref={pointLightRef}
          intensity={pointIntensity}
          position={pointPosition}
          castShadow={pointCastShadow}
          shadow-bias={shadowBias}
          shadow-mapSize-width={shadowMapSize}
          shadow-mapSize-height={shadowMapSize}
        />
      )}
    </>
  );
};

export default Lights;
