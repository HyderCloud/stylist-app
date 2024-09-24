import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { router } from 'expo-router';


interface AuthProps {
    authState? : { token: String | null; authenticated: boolean | null; };
    onRegister?: (username: String, email: String, password: String) => Promise<any>;
    onLogin?: (email: String , password: String) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'http://192.168.7.18:9020'
const AuthContext = createContext<AuthProps>({})

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:any) => {
    const [authState, setAuthState] = useState<{
        token: String|null,
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null
    })

    useEffect(()=>{
        const loadToken = async ()=>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if(token){
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                setAuthState({
                    token:token,
                    authenticated: true
                })
            }
        }
        loadToken()
    },[])

    const register = async (username: String,email: String, password: String)=>{
        try {
            return await axios.post(`${API_URL}/register`, {username, email, password})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }


    const login = async (email: String, password: String)=>{
        try {
            console.log("hi")
            const result = await axios.post(`${API_URL}/auth`, {email, password})
            console.log(result.data.token)
            setAuthState({
                token: result.data.token,
                authenticated: true
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
            router.push('/');
            return result
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const logout = async ()=>{
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        axios.defaults.headers.common["Authorization"] = ''
        setAuthState({
            token: null,
            authenticated: false,
        })
        router.push('/(auth)/sign-in');
    }

    const value2 = {
        onRegister: register,
        onLogin: login,
        // onAvatr: avatar,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value2}>{children}</AuthContext.Provider>
}