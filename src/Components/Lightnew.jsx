/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const Lightnew = (meshRef) => {
  const {
    anistropy,
    anistropyMap,
    anistropyRotation,
    attenuationColor,
    sheen,
    sheenRoughness,
    sheenColor,
    envMapIntensity,
    diaplaymentScale,
    opacity,
    ior,
    clearcoat,
    iridescence,
    iridescenceIOR,
    iridescenceThicknessRange,
    specularIntensity,
    // specularColor,
    // transmission,

    ambientIntensity,
    hemiIntensity,
    dirIntensity,
    dirIntensityLeft,
    dirIntensityRight,
    spotIntensity,
    spotDecay1,
    spotDistance1,
    pointIntensity,
    dirPosition,
    dirPositionLeft,
    shadowBiasL,
    dirPositionRight,
    spotOn1,
    shadowBiasS,
    shadowBiasS3,
    shadowBiasS4,
    shadowBiasS5,
    shadowBiasS1,
    spotPosition1,
    spotPosition2,
    spotPosition3,
    spotPosition4,
    spotPosition5,
    pointPosition,
    shadowBias,
    shadowMapSize,
    shadowCameraFar,
    shadowCameraNear,
    shadowCameraLeft,
    shadowCameraRight,
    shadowCameraTop,
    shadowCameraBottom,
    ambientOn,
    hemiOn,
    dirOn,
    dirOnLeft,
    dirOnRight,
    spotOn2,
    spotOn3,
    spotOn4,
    spotOn5,
    pointOn,
    dirCastShadow,
    dirLeftCastShadow,
    dirRightCastShadow,
    spot1CastShadow,
    spot2CastShadow,
    spot3CastShadow,
    spot4CastShadow,
    spot5CastShadow,
    pointCastShadow,
  } = useControls({
    ambientIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    hemiIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    dirIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
    dirIntensityLeft: { value: 1.5, min: 0, max: 10, step: 0.1 },
    shadowBiasL: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    dirOn: { value: true },
    dirOnLeft: { value: true },
    dirOnRight: { value: true },
    dirIntensityRight: { value: 1.5, min: 0, max: 10, step: 0.1 },
    spotIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    spotOn1: { value: true },
    shadowBiasS: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    spotPosition1: { value: [3, 2, 3], step: 1 },
    spotDecay1: { value: 0, min: 1, max: 10, step: 0.1 },
    spotDistance1: { value: 10, min: 1, max: 100, step: 1 },
    spotOn2: { value: true },
    spotPosition2: { value: [-3, 2, 3], step: 1 },
    shadowBiasS1: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    spotOn3: { value: true },
    shadowBiasS3: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    spotPosition3: { value: [3, 2, 3], step: 1 },
    spotOn4: { value: true },
    shadowBiasS4: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    spotPosition4: { value: [-6, 2, 3], step: 1 },
    spotOn5: { value: true },
    shadowBiasS5: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    spotPosition5: { value: [6, 2, 3], step: 1 },

    pointIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    dirPosition: { value: [2, 10, 2], step: 1 },
    dirPositionLeft: { value: [-10, 10, 0], step: 1 },
    dirPositionRight: { value: [10, 10, 0], step: 1 },
    pointPosition: { value: [25, 5, -5], step: 1 },
    shadowBias: { value: -0.002, min: -0.001, max: 0.1, step: 0.001 },
    shadowMapSize: { value: 2048, min: 512, max: 4096, step: 512 },
    shadowCameraFar: { value: 50, min: 0.1, max: 100, step: 0.1 },
    shadowCameraNear: { value: 0.5, min: 0.1, max: 50, step: 0.1 },
    shadowCameraLeft: { value: -10, min: -50, max: 0, step: 1 },
    shadowCameraRight: { value: 10, min: 0, max: 50, step: 1 },
    shadowCameraTop: { value: 10, min: 0, max: 50, step: 1 },
    shadowCameraBottom: { value: -10, min: -50, max: 0, step: 1 },
    ambientOn: { value: true },
    hemiOn: { value: true },

    pointOn: { value: true },
    dirCastShadow: { value: true },
    dirLeftCastShadow: { value: true },
    dirRightCastShadow: { value: true },
    spot1CastShadow: { value: true },
    spot2CastShadow: { value: true },
    spot3CastShadow: { value: true },
    spot4CastShadow: { value: true },
    spot5CastShadow: { value: true },
    pointCastShadow: { value: true },
    reset: () => {
      ambientIntensity.setValue(1);
      hemiIntensity.setValue(1);
      dirIntensity.setValue(2);
      dirIntensityLeft.setValue(1.5);
      dirIntensityRight.setValue(1.5);
      spotIntensity.setValue(1);
      spotDecay1.setValue(2);
      spotDistance1.setValue(2);
      pointIntensity.setValue(1);
      dirPosition.setValue([2, 10, 2]);
      dirPositionLeft.setValue([-10, 10, 0]);
      dirPositionRight.setValue([10, 10, 0]);
      spotPosition1.setValue([3, 2, 3]);
      spotPosition2.setValue([-3, 2, 3]);
      spotPosition3.setValue([3, 2, 3]);
      spotPosition4.setValue([-3, 2, 3]);
      spotPosition5.setValue([-3, 2, 3]);
      pointPosition.setValue([25, 5, -5]);
      shadowBias.setValue(-0.006);
      shadowMapSize.setValue(2048);
      shadowCameraFar.setValue(50);
      shadowCameraNear.setValue(0.5);
      shadowCameraLeft.setValue(-10);
      shadowCameraRight.setValue(10);
      shadowCameraTop.setValue(10);
      shadowCameraBottom.setValue(-10);
      ambientOn.setValue(true);
      hemiOn.setValue(true);
      dirOn.setValue(true);
      dirOnLeft.setValue(true);
      dirOnRight.setValue(true);
      spotOn1.setValue(true);
      spotOn2.setValue(true);
      spotOn3.setValue(true);
      spotOn4.setValue(true);
      spotOn5.setValue(true);
      pointOn.setValue(true);
    },
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
  // useHelper;
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
            shadowbias={shadowBiasL}
            shadowmapSizewidth={shadowMapSize}
            shadowmapSizeheight={shadowMapSize}
            shadowcamerafar={shadowCameraFar}
            shadowcameranear={shadowCameraNear}
            shadowcameraleft={shadowCameraLeft}
            shadowcameraright={shadowCameraRight}
            shadowcameratop={shadowCameraTop}
            shadowcamerabottom={shadowCameraBottom}
            angle={0.6}
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
            shadowbias={shadowBiasL}
            shadowmapSizewidth={shadowMapSize}
            shadowmapSizeheight={shadowMapSize}
            shadowcamerafar={shadowCameraFar}
            shadowcameranear={shadowCameraNear}
            shadowcameraleft={shadowCameraLeft}
            shadowcameraright={shadowCameraRight}
            shadowcameratop={shadowCameraTop}
            shadowcamerabottom={shadowCameraBottom}
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
            shadow-bias={shadowBiasL}
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
            intensity={3}
            decay={spotDecay1}
            distance={spotDistance1}
            position={spotPosition1}
            castShadow={spot1CastShadow}
            shadow-bias={shadowBiasS}
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
            intensity={3}
            decay={0}
            distance={10}
            position={spotPosition2}
            castShadow={spot2CastShadow}
            shadow-bias={shadowBiasS1}
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
            intensity={3}
            decay={0}
            distance={10}
            position={spotPosition3}
            castShadow={spot3CastShadow}
            shadow-bias={shadowBiasS3}
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
            intensity={0.3}
            decay={0}
            distance={10}
            position={spotPosition4}
            castShadow={spot4CastShadow}
            shadow-bias={shadowBiasS4}
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
            intensity={0.3}
            decay={0}
            distance={10}
            position={spotPosition5}
            castShadow={spot5CastShadow}
            shadow-bias={shadowBiasS5}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
            shadow-camera-fov={30}
            angle={0.6}
            penumbra={0}
          />
          <mesh position={spotPosition5}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="Skyblue" />
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
            shadowbias={shadowBias}
            shadow-mapSize-width={shadowMapSize}
            shadow-mapSize-height={shadowMapSize}
          />
          <mesh position={pointPosition}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="Navyblue" />
          </mesh>
        </>
      )}
    </>
  );
};

export default Lightnew;
// Revert me
