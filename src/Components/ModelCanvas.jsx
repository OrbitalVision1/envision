import {
  OrbitControls,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva } from "leva";
import Lightnew from "./Lightnew";
import Sofa1 from "./Lights2";
import Floor from "./Floor";

const ModelCanvas = () => {
  return (
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
      <ambientLight intensity={0.5 * Math.PI} />

      <div style={{ flex: 1 }}>
        <Canvas
          frameloop="demand"
          style={{ width: 800, height: 600 }}
          dpr={[1, 2]}
          shadows
          camera={{ position: [-4.5, 1.5, 4], fov: 25 }}
          onCreated={({ gl }) => {
            gl.outputEncoding = THREE.sRGBEncoding;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.setClearColor("#ffffff");
          }}
        >
          <ambientLight intensity={1} />
          <mesh castShadow>
            <Sofa1 />
            <Lightnew />
            <OrbitControls />
          </mesh>

          {/* <Floor /> */}
        </Canvas>
      </div>
      <Leva collapsed />
    </div>
  );
};

export default ModelCanvas;
