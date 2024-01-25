import React, { useState } from 'react';
import { signInWithGoogle } from './Login'; // Ensure path is correct
import { useColorScheme, Image, View, Text, TouchableOpacity, Modal} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { styles } from './style/style_index';
import { useNavigation } from '@react-navigation/native';



function LoginPage(){
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSignIn = async () => {
    console.log('Sign-in button pressed');
    try {
      // Call signInWithGoogle and wait for it to complete
      await signInWithGoogle();
      console.log('Sign-in successful');
      navigation.navigate('DrawerNavigator'); // Navigate after successful sign-in
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };
  


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/BW_Logo.png')} style={styles.logo} />
      <Text style={styles.description}>
        The Enterococcus Predictor (ep), an AI-enabled system to predict the level of enterococcus
        bacteria for a geographical area, is currently in development. If you are a registered user,
        please use your Google account to log in. If you are having issues logging in,
        please contact info@enterococcus.today.
      </Text>
      <TouchableOpacity onPress={handleSignIn}>
        <Image source={require('../assets/images/btn_google_signin_dark_normal_web.png')} style={styles.logo2} />
      </TouchableOpacity>
      <Text style={styles.agreementText}>
                I agree to the {' '}
                <TouchableOpacity onPress={() => navigation.navigate('Disclaimer')}>
                    <Text style={styles.hyperlink}>Terms and Conditions</Text>
                </TouchableOpacity>
       </Text>
    </View>
  );
}

export default LoginPage;
