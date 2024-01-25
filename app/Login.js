import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  androidClientId: '356887618684-kqhnoprqu48sapnsh2ja8fvoacm7qr3n.apps.googleusercontent.com',
  webClientId: '356887618684-lh9e5e0c312u63hh1rbdmifc4ntset64.apps.googleusercontent.com',
});


export const signInWithGoogle = async () => {
  try {
    const userInfo = await GoogleSignin[Platform.OS === 'android' ? 'signIn' : 'signInSilently']();
    console.log('User Info:', userInfo);
    await GoogleSignin.revokeAccess();
    return userInfo; 
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error; 
  }
};

