import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Floor = () => {
  const floorRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (floorRef.current) {
      floorRef.current.material.onBeforeCompile = (shader) => {
        shader.uniforms.ignoreShadow = { value: false };

        shader.fragmentShader = `
          uniform bool ignoreShadow;
          ${shader.fragmentShader}
        `;

        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <shadowmap_fragment>",
          `
            #include <shadowmap_fragment>
            if (ignoreShadow) discard;
          `
        );

        floorRef.current.material.userData.shader = shader;
      };

      floorRef.current.material.needsUpdate = true;
    }
  }, []);

  useEffect(() => {
    const shader = floorRef.current.material.userData.shader;
    if (shader) {
      scene.traverse((child) => {
        if (child.isLight && child.userData.isDirectionalLight) {
          shader.uniforms.ignoreShadow.value = true;
        }
      });
    }
  }, [scene]);

  return (
    <mesh
      ref={floorRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial opacity={0.5} transparent />
    </mesh>
  );
};

export default Floor;
