import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei/native';
import women from '../../assets/models/women.glb';
import { Color } from 'three';

const Woman = () => {
    const color2 = new Color( 0xff0000 );
  const { scene, materials } = useGLTF(women);
  // Modify the color of a specific material
  if (materials['blank']) {
      materials['blank'].color.set(color2); // Set material color to red
  }

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload(women);
export default Woman