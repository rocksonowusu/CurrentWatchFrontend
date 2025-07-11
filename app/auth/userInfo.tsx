// app/auth/userInfo.tsx
import React, { useEffect, useRef, useState } from 'react';
import { userInfoStyles } from '../../styles/auth_css/userInfoStyles';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UserInfoScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ fullName: '', email: '' });

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(progressAnim, {
        toValue: 0.33, // 33% progress (step 2 of 6)
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    let newErrors = { fullName: '', email: '' };
    let hasErrors = false;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      hasErrors = true;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      // Shake animation for errors
      const shakeAnim = new Animated.Value(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }

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
      // Pass user data to next screen
      router.replace({
        pathname: '/auth/alertSetup',
        params: { fullName, email }
      });
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
      router.replace('/auth/intro');
    });
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={userInfoStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={userInfoStyles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={userInfoStyles.keyboardView}
        >
          {/* Background circles */}
          <View style={userInfoStyles.backgroundCircles}>
            <Animated.View 
              style={[
                userInfoStyles.circle,
                userInfoStyles.circle1,
                { opacity: fadeAnim }
              ]} 
            />
            <Animated.View 
              style={[
                userInfoStyles.circle,
                userInfoStyles.circle2,
                { opacity: fadeAnim }
              ]} 
            />
          </View>

          {/* Header */}
          <Animated.View
            style={[
              userInfoStyles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity 
              style={userInfoStyles.backButton} 
              onPress={handleBack}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <Text style={userInfoStyles.headerTitle}>User Information</Text>
            
            <Text style={userInfoStyles.stepIndicator}>2 of 6</Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View style={userInfoStyles.progressContainer}>
            <View style={userInfoStyles.progressTrack}>
              <Animated.View
                style={[
                  userInfoStyles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </Animated.View>

          <ScrollView 
            style={userInfoStyles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                userInfoStyles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Welcome Message */}
                <View style={userInfoStyles.welcomeSection}>
                <View style={userInfoStyles.iconContainer}>
                  <Ionicons name="person-circle" size={60} color="#10B981" />
                </View>
                <Text style={userInfoStyles.title}>Tell us about yourself</Text>
                <Text style={userInfoStyles.subtitle}>
                  We'll use this information to personalize your CurrentWatch experience
                </Text>
              </View>

              {/* Form */}
              <View style={userInfoStyles.formSection}>
                {/* Full Name Input */}
                <View style={userInfoStyles.inputGroup}>
                  {/* <Text style={userInfoStyles.label}>Full Name</Text> */}
                  <View style={[userInfoStyles.inputContainer, errors.fullName && userInfoStyles.inputError]}>
                    <Ionicons name="person-outline" size={20} color="#6B7280" />
                    <TextInput
                      style={userInfoStyles.input}
                      placeholder="Enter your full name"
                      placeholderTextColor="#9CA3AF"
                      value={fullName}
                      onChangeText={(text) => {
                        setFullName(text);
                        if (errors.fullName) {
                          setErrors(prev => ({ ...prev, fullName: '' }));
                        }
                      }}
                      autoCapitalize="words"
                      returnKeyType="next"
                    />
                  </View>
                  {errors.fullName ? (
                    <Text style={userInfoStyles.errorText}>{errors.fullName}</Text>
                  ) : null}
                </View>

                {/* Email Input */}
                <View style={userInfoStyles.inputGroup}>
                  {/* <Text style={userInfoStyles.label}>Email Address</Text> */}
                  <View style={[userInfoStyles.inputContainer, errors.email && userInfoStyles.inputError]}>
                    <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    <TextInput
                      style={userInfoStyles.input}
                      placeholder="Enter your email address"
                      placeholderTextColor="#9CA3AF"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (errors.email) {
                          setErrors(prev => ({ ...prev, email: '' }));
                        }
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="done"
                      onSubmitEditing={handleContinue}
                    />
                  </View>
                  {errors.email ? (
                    <Text style={userInfoStyles.errorText}>{errors.email}</Text>
                  ) : null}
                  <Text style={userInfoStyles.helperText}>
                    We'll use this to identify you and send important notifications
                  </Text>
                </View>
              </View>
            </Animated.View>
          </ScrollView>

          {/* Continue Button */}
          <Animated.View
            style={[
              userInfoStyles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                userInfoStyles.continueButton,
                isLoading && userInfoStyles.buttonLoading,
                (!fullName.trim() || !email.trim()) && userInfoStyles.buttonDisabled
              ]}
              onPress={handleContinue}
              disabled={isLoading || !fullName.trim() || !email.trim()}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Animated.View style={userInfoStyles.loadingContainer}>
                  <Ionicons name="hourglass" size={20} color="white" />
                  <Text style={userInfoStyles.buttonText}>Processing...</Text>
                </Animated.View>
              ) : (
                <>
                  <Text style={userInfoStyles.buttonText}>Continue</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

