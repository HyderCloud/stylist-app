import { View, Text, StyleSheet, TouchableOpacity, ImageBackground , Alert } from 'react-native'
import React, { Suspense,useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {Canvas} from '@react-three/fiber/native'
import Man from '../../../components/avatar/Man'
import Woman from '../../../components/avatar/Woman';

const Gender = () => {
    const [gender, setGender] = useState("")
    const [genderStyleMale, setGenderStyleMale] = useState(false)
    const [genderStyleFeMale, setGenderStyleFeMale] = useState(false)
    

    const handleClick = () => {
        Alert.alert('View clicked!', 'You pressed the view.');
      };
  return (
    <View style={styles.container}>
    <LinearGradient  colors={[
        '#7EE7FC4D', 
        '#C09FF84D'
      ]}
      start={{ x: -0.135, y: 0.5 }}
      end={{ x: 1.0275, y: 0.5 }}
       style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>התאמה מגדרית</Text>
          <Text style={styles.headerTextSec}>בחרו את האווטאר שתואם את המגדר שלכם</Text>
        </View>
        <View style={styles.avatarContainer}>
        <View 
        style={[styles.secContainer,
            {}
        ]}>
            {/* men */}
          <Canvas camera={{position: [-2,2.5,5], fov: 30}} > 
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={15} />
          <Suspense>
          <Man/>
          </Suspense>
        </Canvas>
        </View>
        <View 
        style={[styles.secContainer,
            {}
        ]}>
            {/* women */}
        <Canvas camera={{position: [-2,2.5,5], fov: 30}} onMagicTap={handleClick}>
              <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={15} />
          <Suspense>
          <Woman/>
          </Suspense>
        </Canvas>
        </View>
        </View>
        <View>
 <LinearGradient
 colors={[
   '#7EE7FC', 
   '#C09FF8'
  ]}
  start={{ x: -0.135, y: 0.5 }}
  end={{ x: 1.0275, y: 0.5 }}
  style={styles.inputContainer}
>
  <TouchableOpacity style={styles.button} 
><Text style={styles.buttonText}>המשך</Text></TouchableOpacity>
</LinearGradient>
        </View>
      </LinearGradient>
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
    container: {
     width: "100%",
     height: "100%",
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "#000",
    },
    secContainer: {
      marginTop: '5%',
      width: "50%",
      height: "100%",
      borderRadius: 25,
    }, 
    avatarContainer: {
      width: "100%",
      height: "50%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
     headerContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
     },
     headerText: {
      color: "#fff",
      fontFamily: "Heebo-Bold",
      fontWeight: 700,
      fontSize: 40,
      lineHeight: 58.75,
     },
     headerTextSec: {
        color: "#A4A4A4",
        fontFamily: "Heebo",
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 19.09,
       },
       button: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height: "100%",
        color: '#ffff'
      },
      buttonText : {
        fontFamily: "Heebo",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 26.44,
        textAlign: "center",
        color: '#fff'

      },
      inputContainer: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center',
        textAlign: "right",
        width: "80%",
        height: 55,
        borderRadius: 10,
        borderWidth: 0.2, // Border width of 0.2px
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        marginTop: 13,
        marginBottom: 13,
        justifyContent: 'center',
     
      },
})