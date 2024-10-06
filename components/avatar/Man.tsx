import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei/native';
import ManA from '../../assets/models/man.glb';
import { Color } from 'three';
import { Alert } from 'react-native';


const Man = ({}) => {
  const [female, setFemale] = useState('')
  const handleClick = () => {
    setFemale('female')
  
  };
    const color2 = new Color( 0xff0000 );
  const { scene, materials } = useGLTF(ManA);
  // Modify the color of a specific material
  if (materials['blank']) {
      materials['blank'].color.set(color2); // Set material color to red
  }

  return (
    <group onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload(ManA);

export default Man;
