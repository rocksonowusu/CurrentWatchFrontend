// app/splash.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () =>{
      try{
         const hasSeen = await AsyncStorage.getItem('hasSeenOnboarding');
         if (hasSeen === 'true'){
          router.replace('/(tabs)/home');
         } else {
          router.replace('/auth/intro');
         }
      } catch (error){
        console.error('Error checking onboarding status:', error);
        router.replace('/auth/intro');
      }
    }
    
    const timeout = setTimeout(checkOnboardingStatus, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="flash" size={64} color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
