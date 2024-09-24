import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { router } from 'expo-router';


interface AuthProps {
    avatarAuthState? : {avatarToken: string | null , avatarAuthenticated: boolean | null; };
    onAvatarGender?: (gender: String) => Promise<any>;
    onAvatarBody?: (body: String) => Promise<any>;
    onAvatarBodyColor?: (bodyColor: String) => Promise<any>;
    onAvatarHair?: ( hair: String) => Promise<any>;
    onAvatarHairColor?: ( hairColor: String ) => Promise<any>;
    onAvatarBeard?: ( beard: String | null) => Promise<any>;
    onAvatarBeardColor?: ( beardColor: String | null) => Promise<any>;
    onAvatarEyes?: ( eyes: String) => Promise<any>;
    onAvatarAuth?: (gender: String,body: String,bodyColor: String,hair: String,
        hairColor: String ,beard: String | null, beardColor: String | null, eyes: String)=> Promise<any>
}
const avatarToken_KEY = 'my-jwt'
export const API_URL = 'http://192.168.7.14:9020'
const AuthContext = createContext<AuthProps>({})

export const useAvatarAuth = ()=>{
    return useContext(AuthContext)
}

export const AvatarAuthProvider = ({children}:any) => {
    const [avatarAuthState, setAuthState] = useState<{
        avatarToken: string|null,
        avatarAuthenticated: boolean | null
    }>({
        avatarToken: null,
        avatarAuthenticated: null
    })

    useEffect(()=>{
        const loadavatarToken = async ()=>{
            const token = await SecureStore.getItemAsync(avatarToken_KEY)
            if(token){
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                setAuthState({
                    avatarToken:token,
                    avatarAuthenticated: true
                })
            }
        }
        loadavatarToken()
    },[])


    const avatarGender = async (gender: String)=>{
        try {
            router.push('/(auth)/avatar')
            return await axios.post(`${API_URL}/avatar`, {gender})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarBody = async (body: String)=>{
        try {
            router.push('/(auth)/avatar?part=body')
            return await axios.post(`${API_URL}/avatar/body`, {body})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarBodyColor = async (bodyColor: String)=>{
        try {
            router.push('/(auth)/avatar?part=bodyColor')
            return await axios.post(`${API_URL}/bodyColor`, {bodyColor})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarHair = async (hair: String)=>{
        try {
            router.push('/(auth)/avatar?part=hair')
            return await axios.post(`${API_URL}/avatar/hair`, {hair})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarHairColor = async (hairColor: String)=>{
        try {
            router.push('/(auth)/avatar?part=hairColor')
            return await axios.post(`${API_URL}/avatar/hairColor`, {hairColor})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarBeard = async (beard: String|null)=>{
        try {
            router.push('/(auth)/avatar?part=beard')
            return await axios.post(`${API_URL}/avatar/beard`, {beard})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarBeardColor = async (beardColor: String| null)=>{
        try {
            router.push('/(auth)/avatar?part=beardColor')
            return await axios.post(`${API_URL}/avatar/beardColor`, {beardColor})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const avatarEyes = async (eyes: String)=>{
        try {
            router.push('/(auth)/avatar?part=eyes')
            return await axios.post(`${API_URL}/avatar/eyes`, {eyes})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const login = async (gender: String,body: String,bodyColor: String,hair: String,
        hairColor: String ,beard: String | null, beardColor: String | null, eyes: String)=>{
        try {
            const result = await axios.post(`${API_URL}/avatar/auth`, {gender, body, bodyColor, hair,hairColor, beard, beardColor, eyes})
            console.log(result.data.token)
            setAuthState({
                avatarToken: result.data.token,
                avatarAuthenticated: true
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(avatarToken_KEY, result.data.token)
            router.push('/');
            return result
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const value2 = {
        onAvatarGender: avatarGender,
        onAvatarBody: avatarBody,
        onAvatarBodyColor: avatarBodyColor,
        onAvatarHair: avatarHair,
        onAvatarHairColor: avatarHairColor,
        onAvatarBeard: avatarBeard,
        onAvatarBeardColor: avatarBeardColor,
        onAvatarEyes: avatarEyes,
        onAvatarAuth: login,
        avatarAuthState
    }
    return <AuthContext.Provider value={value2}>{children}</AuthContext.Provider>

    }