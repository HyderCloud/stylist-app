import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";

interface AuthProps {
    authState? : {token: String | null; authenticate: String | null;}
    onRegister?: (username: String, email: String, password: String) => Promise<any>;
    onLogin?: (email: String, password: String) => Promise<any>;
    onLogout?: () => Promise<any>;
    
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'https://api.developbetterapps.com'
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
            return await axios.post(`${API_URL}/users`, {username, email, password})
        } catch (error) {
            return {error: true, msg: (error as any).response.data.msg}
        }
    }

    const login = async (email: String, password: String)=>{
        try {
            const result = await axios.post(`${API_URL}/auth`, {email, password})
            console.log(result)
            setAuthState({
                token: result.data.token,
                authenticated: true
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
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
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}