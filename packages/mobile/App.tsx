import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import GameWorldScreen from './src/screens/GameWorldScreen';
import StudentDashboardScreen from './src/screens/StudentDashboardScreen';
import RecruiterDashboardScreen from './src/screens/RecruiterDashboardScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="GameWorld" component={GameWorldScreen} />
          <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} />
          <Stack.Screen name="RecruiterDashboard" component={RecruiterDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
