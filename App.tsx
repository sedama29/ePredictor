import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './app/main'; // Your App component
import Disclaimer from './app/disclamier'; // Your Disclaimer component]
import DrawerNavigator from './app/drawer'; 
import Home2 from './app/home'


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home2" component={Home2} options={{ headerShown: false }} />
        <Stack.Screen name="Disclaimer" component={Disclaimer} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
