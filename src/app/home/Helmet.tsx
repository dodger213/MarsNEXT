import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    PLATE: THREE.MeshStandardMaterial;
    Helmet: THREE.MeshStandardMaterial;
    body: THREE.MeshStandardMaterial;
  };
};

export function HelmetModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/helmet.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group
        name="Sketchfab_model"
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ name: "Sketchfab_model" }}
        scale={0.3}
      >
        <group
          name="99064e079be847d0a637e03f4ad04ab5fbx"
          userData={{ name: "99064e079be847d0a637e03f4ad04ab5.fbx" }}
        >
          <group name="RootNode" userData={{ name: "RootNode" }}>
            <group name="RETOPO_8001" userData={{ name: "RETOPO_8.001" }}>
              <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.PLATE}
                userData={{ name: "Object_4" }}
              />
            </group>
            <group
              name="preselection_secondary"
              position={[0, 2.4e-7, -1.2e-7]}
              userData={{ name: "preselection_secondary" }}
            >
              <mesh
                name="Object_7"
                castShadow
                receiveShadow
                geometry={nodes.Object_7.geometry}
                material={materials.Helmet}
                userData={{ name: "Object_7" }}
              />
              <mesh
                name="Object_6"
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.body}
                userData={{ name: "Object_6" }}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/helmet.glb");
