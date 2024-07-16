/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState, useRef } from "react";
import { MeshStandardMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";

const Shader = () => {
  const [material, setmMaterial] = useState(null);
  material = newCUstomaterial();
  return (
    <div>
      <CustomShaderMaterial basematerial={MeshStandardMaterial} 
      vertexShader = {}
      fragmentShader = {}
      uniforms = {}
      silent = {true}
   />

      <mesh>
        <boxGeometry />
      </mesh>
    </div>
  );
};

export default Shader;
