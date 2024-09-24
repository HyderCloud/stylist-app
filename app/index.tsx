import React, { useRef } from 'react';
import { useAuth } from './(auth)/AuthContext';
import { useAvatarAuth } from './(auth)/AuthAvatar';
import Home from '@/components/Home';
import SignIn from './(auth)/sign-in';
import Gender from './(auth)/avatar/Gender';



export default function ResizableScreen(): JSX.Element {
  const {authState, onLogout} = useAuth()
  const {avatarAuthState} = useAvatarAuth()
  if( authState?.authenticated && avatarAuthState?.avatarAuthenticated == null){
    return (
      <Home/>
  )
  } else if(authState?.authenticated){
    return(<Gender/>)
  }
  else
  return (
    <SignIn/>
  );
}
