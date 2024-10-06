import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { Suspense,useState } from 'react'
import { Color, AmbientLight, DirectionalLight } from 'three';
import { LinearGradient } from 'expo-linear-gradient'
import {Canvas} from '@react-three/fiber/native'
import Man from './Man'
import Woman from './Woman';

const Screen = () => {
const [continueGender, setContinueGender] = useState('')
  return (
    <LinearGradient  colors={[
      '#7EE7FC4D', 
      '#C09FF84D'
    ]}
    start={{ x: -0.135, y: 0.5 }}
    end={{ x: 1.0275, y: 0.5 }}
     style={styles.container}>
      <View style={styles.headerContainer}>
        <Text >התאמה מגדרית</Text>
      </View>
      <View style={styles.avatarContainer}>
      <TouchableOpacity style={styles.secContainer} onPress={()=>{setContinueGender('male')}}>
        <Canvas camera={{position: [-2,2.5,5], fov: 30}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={15} />
        <Suspense>
        <Man/>
        </Suspense>
      </Canvas>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secContainer} onPress={()=>{setContinueGender('female')}}>
      <Canvas camera={{position: [-2,2.5,5], fov: 30}}>
            <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={15} />
        <Suspense>
        <Woman/>
        </Suspense>
      </Canvas>
      </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
     width: "100%",
     height: "100%",
     alignItems: "center",
     justifyContent: "center",
    },
    secContainer: {
      width: "50%",
      height: "40%"
    }, 
    avatarContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
     headerContainer: {
      width: "100%",
      height: "20%",
     },
     headerText: {
      
     }
})