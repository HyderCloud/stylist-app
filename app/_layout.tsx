import { View, Text , Image} from 'react-native'
import React, { useEffect } from 'react'
import {Drawer} from 'expo-router/drawer'
// import { DrawerToggleButton } from '@react-navigation/drawer'
import { useFonts } from 'expo-font'
import { SplashScreen, Redirect } from 'expo-router'
import DrawerToggleButton from '../components/DrawerButton'
import { AuthProvider, useAuth } from './(auth)/AuthContext'

SplashScreen.preventAutoHideAsync()
export default function _layout() {
    const { authState, onLogout} = useAuth()
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
  return( <AuthProvider>
    <Layout/>
  </AuthProvider>)
}

export const Layout = ()=>{
    const { authState, onLogout} = useAuth()
return(
    <Drawer screenOptions={{
        headerShown: authState?.authenticate ? true : false,
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
            drawerLabel: "לוגין",
            title: ""
        }}/>
                    <Drawer.Screen name='(auth)/sign-up' options={{
            drawerLabel: "לוגין",
            title: ""
        }}/>
      </Drawer>
)
}
