import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Floor = () => {
const floorRef = useRef();
const lightRef = useRef();

useFrame(({ scene }) => {
const spotLight3 = scene.children.find((child) => child.name === "spotLight3");
if (spotLight3 && floorRef.current) {
floorRef.current.receiveShadow = true;
spotLight3.target = floorRef.current;
}
});

return (
<mesh
ref={floorRef}
position={[0, 0, 0]}
rotation={[-Math.PI / 2, 0, 0]} >
<planeGeometry attach="geometry" args={[100, 100]} />
<shadowMaterial attach="material" opacity={0.5} />
</mesh>
);
};

export default Floor;
