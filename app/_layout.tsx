import { View, Text , Image, TouchableOpacity,StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import {Drawer} from 'expo-router/drawer'
// import { DrawerToggleButton } from '@react-navigation/drawer'
import { useFonts } from 'expo-font'
import { SplashScreen, Redirect, router } from 'expo-router'
import DrawerToggleButton from '../components/DrawerButton'
import { AuthProvider, useAuth } from './(auth)/AuthContext'
import { AvatarAuthProvider, useAvatarAuth } from './(auth)/AuthAvatar'

SplashScreen.preventAutoHideAsync()
export default function _layout() {


    const [fontsLoad, error] = useFonts({
        "Heebo": require("../assets/fonts/Heebo.ttf"),
        "Heebo-Bold": require("../assets/fonts/Heebo-Bold.ttf"),
        "Mulish": require("../assets/fonts/Mulish.ttf"),
        "Inter": require('../assets/fonts/Inter.ttf')
    })

    useEffect(()=>{
        if(error) throw error
        if(fontsLoad) SplashScreen.hideAsync()
        },[fontsLoad, error])
        if(!fontsLoad && !error) return null
  return( <AvatarAuthProvider>
  <AuthProvider>
    <Layout/>
  </AuthProvider>
  </AvatarAuthProvider>
  )
}

export const Layout = ()=>{
    const { authState, onLogout} = useAuth()
    const { avatarAuthState} = useAvatarAuth()
return(
    <Drawer screenOptions={{
        swipeEnabled: authState?.authenticated && avatarAuthState?.avatarAuthenticated == null ? true : false,
        headerShown: authState?.authenticated && avatarAuthState?.avatarAuthenticated == null ? true : false,
        drawerPosition: 'right',
        headerStyle: {
            borderBottomWidth: 0, // Removes the bottom border
            shadowOpacity: 0, // Removes the shadow for iOS
            elevation: 0, // Removes the elevation for Android
            backgroundColor: "#010101",
            height:130
          },
        drawerStyle:{
            backgroundColor: "#010101",
        },
        drawerActiveTintColor: '#7EE7FC',
        drawerLabelStyle:{
            textAlign: 'right',
            color: "#ffff"
        },
        headerRight: () => (
           <DrawerToggleButton/>
          ),
        
        headerLeft: () => null,
      }}>
    <Drawer.Screen name='index' options={{
        drawerLabel: "בית",
        title: ""
    }}/>
        <Drawer.Screen name='tabs/index' options={{
            drawerLabel: "משתמש",
            title: ""
        }}/>
            <Drawer.Screen name='tabs/avatar' options={{
            drawerLabel: "האוואטר שלך",
            title: ""
        }}/>
                <Drawer.Screen name='tabs/sizes' options={{
            drawerLabel: "מידות",
            title: ""
        }}/>
                    <Drawer.Screen name='tabs/settings' options={{
            drawerLabel: "הגדרות",
            title: ""
        }}/>
                    <Drawer.Screen name='tabs/support' options={{
            drawerLabel: "תמיכה",
            title: ""
        }}/>
                     <Drawer.Screen name='(auth)/sign-in' options={{

            drawerLabel: ()=><TouchableOpacity style={styles.logoutcontainer} onPress={onLogout}>
                <Text style={styles.logout}>התנתקות</Text></TouchableOpacity>,
            title: ""
        }}/>
      </Drawer>
)
}

const styles = StyleSheet.create({
    logout: {
        color: '#fff'
    },
    logoutcontainer: {
        width: "100%"
    }
})
