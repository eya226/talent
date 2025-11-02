import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import ApplicationTrackingDashboard from './src/screens/ApplicationTrackingDashboard';
import InterviewSimulatorScreen from './src/screens/InterviewSimulatorScreen';
import ResourceHubScreen from './src/screens/ResourceHubScreen';
import ProfileOnboardingScreen from './src/screens/ProfileOnboardingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Dashboard" component={ApplicationTrackingDashboard} />
      <Tab.Screen name="Simulator" component={InterviewSimulatorScreen} />
      <Tab.Screen name="Resources" component={ResourceHubScreen} />
      <Tab.Screen name="Profile" component={ProfileOnboardingScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
