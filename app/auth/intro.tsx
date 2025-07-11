// app/(auth)/intro.tsx
import React, { useEffect, useRef, useState } from 'react';
import { entryStyle } from '../../styles/entryStyle';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Intro() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    
    const rotateLoop = Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    return () => {
      rotateLoop.stop();
      pulseLoop.stop();
    };
  }, []);

  const handleGetStarted = async () => {
    setIsLoading(true);
    //save onboarding status
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/auth/userInfo');
    });
  };

  const logoRotation = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={entryStyle.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={entryStyle.safeArea}>
         {/* Animated background circles */}
         <View style={entryStyle.backgroundCircles}>
          <Animated.View 
            style={[
              entryStyle.circle,
              entryStyle.circle1,
              { opacity: fadeAnim }
            ]} 
          />
          <Animated.View 
            style={[
              entryStyle.circle,
              entryStyle.circle2,
              { opacity: fadeAnim }
            ]} 
          />
          <Animated.View 
            style={[
              entryStyle.circle,
              entryStyle.circle3,
              { opacity: fadeAnim }
            ]} 
          />
        </View>

        <Animated.View
          style={[
            entryStyle.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo Section */}
          <View style={entryStyle.logoSection}>
            <Animated.View
              style={[
                entryStyle.logoContainer,
                {
                  transform: [
                    { rotate: logoRotation },
                    { scale: pulseAnim },
                  ],
                },
              ]}
            >
              <View style={entryStyle.logoBackground}>
                <Ionicons name="flash" size={56} color="#10B981" />
              </View>
            </Animated.View>
            
            <Animated.Text
              style={[
                entryStyle.appName,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              CurrentWatch
            </Animated.Text>
          </View>

          {/* Tagline */}
          <Animated.Text
            style={[
              entryStyle.tagline,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            Smart Monitoring & Protection
          </Animated.Text>

          {/* Subtitle */}
          <Animated.Text
            style={[
              entryStyle.subtitle,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            Real-time electrical monitoring for your safety
          </Animated.Text>

          {/* Get Started Button */}
          <Animated.View
            style={[
                entryStyle.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[entryStyle.button, isLoading && entryStyle.buttonLoading]}
              onPress={handleGetStarted}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={entryStyle.buttonText}>Get Started</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Loading Indicator */}
          {isLoading && (
            <Animated.View style={entryStyle.loadingContainer}>
              <Text style={entryStyle.loadingText}>Loading...</Text>
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
