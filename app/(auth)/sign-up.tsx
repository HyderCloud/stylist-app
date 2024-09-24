import { View, Text, TextInput, StyleSheet, Image, ImageBackground,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity,  
  Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState,  useEffect, useRef } from 'react';
import { Link } from 'expo-router';
import { API_URL, useAuth } from './AuthContext';
import { useRouter } from 'expo-router';
import axios from 'axios';

const sginUp = () => {
  const router = useRouter()
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const {onRegister, onLogin} = useAuth()

  const login = async ()=>{
    const result = await onLogin!(email, password);
    if(result && result.error) {
      alert(result.msg)
    }
  }

  const register = async ()=>{
    const result = await onRegister!(username, email, password);
    if(result && result.error) {
      alert(result.msg)
    } else {
      login()
    }
  }

  const onShowPass = ()=>{
    setShowPassword(!showPassword)
  }

  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      // Clean up the listeners on component unmount
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };

    }, []);

return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

          <View style={[{marginTop: "14%" }]}>
              <ImageBackground
                  source={require('@/assets/images/signlogo.png')}
                  style={styles.backgroundlogo}
                  resizeMode="cover"
              />
          </View>
        <ImageBackground
          source={require('@/assets/images/Backgroundlogin.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.headerView}>
            <Text style={styles.textHeader}>הרשמה</Text>
            <Text style={styles.textSemiHeader}>ברוכים הבאים, אשמח להכיר אתכם</Text>
          </View>

          <View style={styles.loginContainer}>
               {/* username Input */}
          <View>
              <Text style={styles.labelInput}> שם משתמש</Text>
              <View style={styles.inputStruct}>
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.0447917)', 
                    'rgba(255, 255, 255, 0.2)'
                  ]}
                  start={{ x: -0.135, y: 0.5 }}
                  end={{ x: 1.0275, y: 0.5 }}
                  style={styles.inputContainer}
                >
                  <TextInput onChangeText={(text: string)=>{setUsername(text)}} style={styles.input} placeholder="שם משתמש"/>
                  <Image style={{right: 20, position: 'absolute'}}  source={require("@/assets/images/person.png")}/>
                </LinearGradient>
              </View>
            </View>
            {/* Email Input */}
            <View>
              <Text style={styles.labelInput}> אימייל</Text>
              <View style={styles.inputStruct}>
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.0447917)', 
                    'rgba(255, 255, 255, 0.2)'
                  ]}
                  start={{ x: -0.135, y: 0.5 }}
                  end={{ x: 1.0275, y: 0.5 }}
                  style={styles.inputContainer}
                >
                  <TextInput onChangeText={(text: string)=>{setEmail(text)}} style={styles.input} placeholder='כתובת אי-מייל'/>
                  <Image style={{right: 20, position: 'absolute'}}  source={require("@/assets/images/mail.png")}/>
                </LinearGradient>
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text style={styles.labelInput}> סיסמה</Text>
              <View style={styles.inputStruct}>
                <LinearGradient
                  colors={[
                    'rgba(255, 255, 255, 0.0447917)', 
                    'rgba(255, 255, 255, 0.2)'
                  ]}
                  start={{ x: -0.135, y: 0.5 }}
                  end={{ x: 1.0275, y: 0.5 }}
                  style={styles.inputContainer}
                >
                  <TouchableOpacity style={{paddingLeft: 50}}  onPress={onShowPass}>
                  {showPassword?
                <Image source={require(`@/assets/images/eyeclose.png`)}/>:
                <Image source={require(`@/assets/images/openeye.png`)}/>
                    }
                  </TouchableOpacity>
                <TextInput style={[styles.input, {paddingRight: 80}]} placeholder="סיסמה" secureTextEntry={showPassword} 
                onChangeText={(text: string)=>{setPassword(text)}} />
                <Image style={{right: 20, position: 'absolute'}} source={require("@/assets/images/key.png")}/>
                </LinearGradient>
              </View>
            </View>
            <View><Text style={[styles.labelInput, {fontSize:12}]}>שכחת את הסיסמה?</Text></View>
            <View style={{marginTop: "3%", alignItems: "center"}}>
            <LinearGradient
                  colors={[
                    '#7EE7FC', 
                    '#C09FF8'
                  ]}
                  start={{ x: -0.135, y: 0.5 }}
                  end={{ x: 1.0275, y: 0.5 }}
                  style={styles.inputContainer}
                >
            <TouchableOpacity  style={styles.button}
      onPress={() => {
        register()
      }}
      activeOpacity={0.7} // Controls the opacity when pressed
    ><Text style={styles.buttonText}>הרשמה</Text></TouchableOpacity>
                </LinearGradient>
    <Text style={styles.registerText}>כבר נרשמת אלינו? <Link style={styles.linkText} href={"/(auth)/sign-in"}>התחבר/י</Link></Text>
            </View>
            <View style={[styles.row,{marginTop: 0, alignItems: "center"}]}>
              <Image source={require("@/assets/images/Rectangle3.png")}/>
              <Text style={styles.sginLable}>או להתחבר בעזרת</Text>
              <Image source={require("@/assets/images/Rectangle4.png")}/>
              </View>
              <View style={[styles.row2, {marginTop: "5%"}]}>
              <Image style={{marginRight: 50}} source={require("@/assets/images/facebook.png")}/>
              <Image source={require("@/assets/images/google.png")}/>
              </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>

)
}
export default sginUp

const styles = StyleSheet.create(
  { 
    sginLable: {
      fontFamily: "Heebo-Bold",
      fontWeight: 500,
      fontSize: 11,
      color: "#B6B6B6",
    },
    row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},
      container: {
          flex: 1,
          width: '100%',
          backgroundColor: "#010101",
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
      },  
      background: {
          flex: 1,
          height: "100%",
          width: '100%', // Make sure the background covers the entire screen
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
        },
        backgroundlogo: {
          width: 300, // Make sure the background covers the entire screen
          height: 130,
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
        },
        headerView:{
          marginTop: 30,
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', 
        },
        textHeader: {
          fontFamily: "Heebo-Bold",
          fontWeight: 700,
          fontSize: 40,
          color: "#EFEFEF",
          lineHeight: 58
        },
        textSemiHeader: {
          marginTop: -10,
          fontFamily: "Heebo",
          fontWeight: 500,
          fontSize: 14,
          color: "#A4A4A4",
          lineHeight: 20
        },
        loginContainer:{
          marginTop: "12%",
          height: 420,
          width: "100%",
          justifyContent: 'center', // Center the content vertically
          alignItems: "flex-end", // Center the content horizontally
          textAlign: "right",
          paddingRight: 50,
          paddingLeft: 50,
        },
        labelInput: {
          textAlign: 'right',
          fontFamily: "Heebo",
          fontWeight: 500,
          fontSize: 14,
          color: "#A4A4A4",
          lineHeight: 20
        },
        inputContainer: {
          flexDirection: 'row', // Align items in a row
          alignItems: 'center',
          textAlign: "right",
          width: "100%",
          height: 55,
          borderRadius: 10,
          borderWidth: 0.2, // Border width of 0.2px
          borderColor: '#FFFFFF',
          overflow: 'hidden',
          marginTop: 7,
          marginBottom: 7,
          justifyContent: 'center',
        }, 
        inputStruct: {
          flexDirection: 'row', // Align items in a row
          alignItems: 'center',
          overflow: 'hidden',
          justifyContent: 'center',
        },
        input: {
          paddingRight: 50,
          alignItems: 'center',
          textAlign: "right",
          width:'100%',
          height: "100%",
          color: '#ffff'
        },
        button: {
          marginTop: -10,
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
        registerText: {
          fontFamily: "Heebo",
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 26.44,
          textAlign: "center",
          color: '#A4A4A4'
        },
        linkText: {
          color: "#7EE7FC"
        }
  }
)
