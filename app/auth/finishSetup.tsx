// app/auth/finishSetup.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { finishSetupStyles } from '../../styles/auth_css/finishSetup';

const { width, height } = Dimensions.get('window');

export default function FinishSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const checkScaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(checkScaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleEnterApp = () => {
    setIsLoading(true);
    
    // Exit animation before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to home screen
      router.replace('/(tabs)/home');
    });
  };

  const handleBack = () => {
    setIsLoading(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/auth/devicePairing');
    });
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={finishSetupStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={finishSetupStyles.safeArea}>
        {/* Background circles */}
        <View style={finishSetupStyles.backgroundCircles}>
          <Animated.View 
            style={[
              finishSetupStyles.circle,
              finishSetupStyles.circle1,
              { opacity: fadeAnim }
            ]} 
          />
          <Animated.View 
            style={[
              finishSetupStyles.circle,
              finishSetupStyles.circle2,
              { opacity: fadeAnim }
            ]} 
          />
        </View>

        {/* Header */}
        <Animated.View
          style={[
            finishSetupStyles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={finishSetupStyles.backButton}
            onPress={handleBack}
            disabled={isLoading}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={finishSetupStyles.headerTitle}>Setup Complete</Text>
          <Text style={finishSetupStyles.stepIndicator}>6 of 6</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            finishSetupStyles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Checkmark animation */}
          <Animated.View
            style={[
              finishSetupStyles.checkmarkContainer,
              { transform: [{ scale: checkScaleAnim }] }
            ]}
          >
            <View style={finishSetupStyles.checkmarkCircle}>
              <Ionicons name="checkmark" size={60} color="#FFFFFF" />
            </View>
          </Animated.View>

          {/* Title */}
            <Text style={finishSetupStyles.title}>Setup Complete!</Text>
          
          {/* Subtitle */}
          <Text style={finishSetupStyles.subtitle}>
            You're all set to start monitoring your energy usage with CurrentWatch.
          </Text>

          {/* Summary */}
          <View style={finishSetupStyles.summaryContainer}>
            <View style={finishSetupStyles.summaryItem}>
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text style={finishSetupStyles.summaryText}>
                {params.fullName || 'User Profile'}
              </Text>
            </View>
            
            <View style={finishSetupStyles.summaryItem}>
              <Ionicons name="home-outline" size={20} color="#6B7280" />
              <Text style={finishSetupStyles.summaryText}>
                {params.rooms ? JSON.parse(params.rooms as string).length : 0} rooms configured
              </Text>
            </View>
            
            <View style={finishSetupStyles.summaryItem}>
              <Ionicons name="hardware-chip-outline" size={20} color="#6B7280" />
              <Text style={finishSetupStyles.summaryText}>
                {params.devices ? JSON.parse(params.devices as string).filter((d: any) => d.status === 'paired').length : 0} devices paired
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Enter App Button */}
        <Animated.View
          style={[
            finishSetupStyles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              finishSetupStyles.continueButton,
              isLoading && finishSetupStyles.buttonLoading
            ]}
            onPress={handleEnterApp}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <View style={finishSetupStyles.loadingContainer}>
                <Ionicons name="hourglass" size={20} color="white" />
                <Text style={finishSetupStyles.buttonText}>Loading...</Text>
              </View>
            ) : (
              <>
                <Text style={finishSetupStyles.buttonText}>Enter CurrentWatch</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

