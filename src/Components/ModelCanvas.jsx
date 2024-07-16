/* eslint-disable react/no-unknown-property */
import { OrbitControls, SoftShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import Model from "./Model"; //  Model component
import { Leva } from "leva";
// import { Light } from "@mui/icons-material";
// import Meshes from "./Meshes";
// import ColorSwatches from "./ColorSwatches";
// import { Mode } from "@mui/icons-material";

// import Lights from "./Lights"; //Lights component
import Lightnew from "./Lightnew";
import Sofa1 from "./Lights2";

const ModelCanvas = () => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //     width: "85vw",
    //     margin: "0 auto",
    //   }}
    // >
    // <Canvas
    //   frameloop="demand"
    //   style={{ width: 800, height: 600 }}
    //   shadows
    //   dpr={[1, 2]}
    //   camera={{ position: [-2, 2, 4], fov: 25 }}
    //   onCreated={({ gl }) => {
    //     gl.outputEncoding = THREE.sRGBEncoding;
    //     gl.shadowMap.enabled = true;
    //     gl.shadowMap.type = THREE.PCFSoftShadowMap;
    //   }}
    // >
    //     <Suspense fallback={null}>
    //       <Environment preset="city" />
    //       {/* <Lights /> */}
    //       {/* <Lightnew /> */}
    //       <OrbitControls />
    //       <gridHelper args={[10, 10]} />
    //       <axesHelper args={[5]} />
    //       {/* <Model /> */}
    //       {/* <mesh
    //         receiveShadow
    //        position={[0, -0.5, 0]}
    //         rotation={[-Math.PI / 2, 0, 0]}
    //       >
    //        <planeGeometry attach="geometry" args={[100, 100]} />
    //        <shadowMaterial
    //       < attach="material" opacity={0.5} />
    //       </mesh> */}
    //       <Meshes />
    //     </Suspense>
    //   </Canvas>
    //   <Leva collapsed />

    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "85vw",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: 1 }}>
        <Canvas
          frameloop="demand"
          style={{ width: 800, height: 600 }}
          receiveShadow
          shadows
          transparent
          dpr={[1, 2]}
          camera={{ position: [-2, 2, 4], fov: 25 }}
          onCreated={({ gl }) => {
            gl.outputEncoding = THREE.sRGBEncoding;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          {/* Ambient light to brighten the entire scene */}
          <ambientLight intensity={1} />
          <SoftShadows />

          {/* <Model /> */}
          <Sofa1 />
          {/* <Lights /> */}
          <Lightnew />

          {/* Meshes - Point lights to create additional light sources */}
          {/* <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <pointLight position={[0, 10, 0]} intensity={1} /> */}

          {/* Meshes - Swatches Model component */}
          {/* <Meshes />
          <mesh
            receiveShadow
            position={[0, -1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.5} />
          </mesh> */}
          {/* Controls to allow for model rotation and zooming */}
          <OrbitControls />
        </Canvas>
      </div>
      <Leva collapsed />
      {/* Color swatches component for changing colors */}
      {/* <div style={{ background: "#eee", padding: "10px" }}>
        <ColorSwatches />
      </div> */}
    </div>
  );
};

export default ModelCanvas;
