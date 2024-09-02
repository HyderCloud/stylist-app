import React, { useRef } from 'react';
import { useAuth } from './(auth)/AuthContext';
import { Redirect } from 'expo-router';
import Home from '@/components/Home';
import SignIn from './(auth)/sign-in';



export default function ResizableScreen(): JSX.Element {
  const {authState, onLogout} = useAuth()
  
  if( authState?.authenticate){
    return (
      <Home/>
  )
  }else
  return (
    <SignIn/>
  );
}
