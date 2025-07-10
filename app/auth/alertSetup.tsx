// app/auth/alertSetup.tsx
import React, { useEffect, useRef, useState } from 'react';
import { alertSetupStyles } from '../../styles/auth_css/alertSetupStyles';
import {
  View,
  Text,
  StyleSheet,
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AlertSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [errors, setErrors] = useState({ phoneNumber: '' });

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
        toValue: 0.5, // 50% progress (step 3 of 6)
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const validatePhoneNumber = (phone: string) => {
    // Basic phone validation - adjust regex based on your requirements
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleTestAlert = async () => {
    if (!phoneNumber.trim()) {
      setErrors({ phoneNumber: 'Phone number is required to test alerts' });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrors({ phoneNumber: 'Please enter a valid phone number' });
      return;
    }

    setIsTesting(true);
    
    // Simulate API call for testing alert
    setTimeout(() => {
      setIsTesting(false);
      Alert.alert(
        'Test Alert Sent!',
        'Check your phone for a test SMS alert. If you don\'t receive it, please verify your phone number.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const handleContinue = () => {
    let newErrors = { phoneNumber: '' };
    let hasErrors = false;

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      hasErrors = true;
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
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
      // Pass data to next screen
      router.push({
        pathname: '/auth/roomSetup',
        params: { 
          ...params,
          phoneNumber 
        }
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
      router.back();
    });
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={alertSetupStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={alertSetupStyles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={alertSetupStyles.keyboardView}
        >
          {/* Background circles */}
          <View style={alertSetupStyles.backgroundCircles}>
            <Animated.View 
              style={[
                alertSetupStyles.circle,
                alertSetupStyles.circle1,
                { opacity: fadeAnim }
              ]} 
            />
            <Animated.View 
              style={[
                alertSetupStyles.circle,
                alertSetupStyles.circle2,
                { opacity: fadeAnim }
              ]} 
            />
          </View>

          {/* Header */}
          <Animated.View
            style={[
              alertSetupStyles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity 
              style={alertSetupStyles.backButton} 
              onPress={handleBack}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <Text style={alertSetupStyles.headerTitle}>Alert Setup</Text>
            
            <Text style={alertSetupStyles.stepIndicator}>3 of 6</Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View style={alertSetupStyles.progressContainer}>
            <View style={alertSetupStyles.progressTrack}>
              <Animated.View
                style={[
                  alertSetupStyles.progressFill,
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
            style={alertSetupStyles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                alertSetupStyles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Welcome Message */}
              <View style={alertSetupStyles.welcomeSection}>
                <View style={alertSetupStyles.iconContainer}>
                  <Ionicons name="notifications-circle" size={60} color="#10B981" />
                </View>
                <Text style={alertSetupStyles.title}>Stay Alert & Safe</Text>
                <Text style={alertSetupStyles.subtitle}>
                  Get instant SMS notifications when CurrentWatch detects electrical issues
                </Text>
              </View>

              {/* Form */}
              <View style={alertSetupStyles.formSection}>
                {/* Phone Number Input */}
                <View style={alertSetupStyles.inputGroup}>
                  {/* <Text style={alertSetupStyles.label}>Phone Number</Text> */}
                  <View style={[alertSetupStyles.inputContainer, errors.phoneNumber && alertSetupStyles.inputError]}>
                    <Ionicons name="call-outline" size={20} color="#6B7280" />
                    <TextInput
                      style={alertSetupStyles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9CA3AF"
                      value={phoneNumber}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                        if (errors.phoneNumber) {
                          setErrors(prev => ({ ...prev, phoneNumber: '' }));
                        }
                      }}
                      keyboardType="phone-pad"
                      returnKeyType="done"
                    />
                  </View>
                  {errors.phoneNumber ? (
                    <Text style={alertSetupStyles.errorText}>{errors.phoneNumber}</Text>
                  ) : null}
                  <Text style={alertSetupStyles.helperText}>
                    Include country code (e.g., +233 555-123-4567)
                  </Text>
                </View>

                {/* Test Alert Button */}
                <View style={alertSetupStyles.testSection}>
                  <TouchableOpacity
                    style={[
                      alertSetupStyles.testButton,
                      isTesting && alertSetupStyles.testButtonLoading,
                      !phoneNumber.trim() && alertSetupStyles.testButtonDisabled
                    ]}
                    onPress={handleTestAlert}
                    disabled={isTesting || !phoneNumber.trim()}
                    activeOpacity={0.8}
                  >
                    {isTesting ? (
                      <Animated.View style={alertSetupStyles.loadingContainer}>
                        <Ionicons name="hourglass" size={18} color="#1F2937" />
                        <Text style={alertSetupStyles.testButtonText}>Sending...</Text>
                      </Animated.View>
                    ) : (
                      <>
                        <Ionicons name="paper-plane-outline" size={18} color="#1F2937" />
                        <Text style={alertSetupStyles.testButtonText}>Send Test Alert</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  <Text style={alertSetupStyles.testHelperText}>
                    Test your phone number to ensure you'll receive alerts
                  </Text>
                </View>

                {/* Alert Info Cards */}
                <View style={alertSetupStyles.infoCards}>
                  <View style={alertSetupStyles.infoCard}>
                    <Ionicons name="warning" size={24} color="#F59E0B" />
                    <View style={alertSetupStyles.infoCardContent}>
                      <Text style={alertSetupStyles.infoCardTitle}>Instant Alerts</Text>
                      <Text style={alertSetupStyles.infoCardText}>
                        Get notified immediately when issues are detected
                      </Text>
                    </View>
                  </View>

                  <View style={alertSetupStyles.infoCard}>
                    <Ionicons name="shield-checkmark" size={24} color="#10B981" />
                    <View style={alertSetupStyles.infoCardContent}>
                      <Text style={alertSetupStyles.infoCardTitle}>24/7 Monitoring</Text>
                      <Text style={alertSetupStyles.infoCardText}>
                        Continuous protection even when you're away
                      </Text>
                    </View>
                  </View>
                  {/* <View style={alertSetupStyles.infoCard}>
                    <Ionicons name="settings" size={24} color="#3B82F6" />
                    <View style={alertSetupStyles.infoCardContent}>
                      <Text style={alertSetupStyles.infoCardTitle}>Customizable</Text>
                      <Text style={alertSetupStyles.infoCardText}>
                        Set different alert levels for different situations
                      </Text>
                    </View>
                  </View> */}
                </View>
              </View>
            </Animated.View>
          </ScrollView>

          {/* Continue Button */}
          <Animated.View
            style={[
              alertSetupStyles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                alertSetupStyles.continueButton,
                isLoading && alertSetupStyles.buttonLoading,
                !phoneNumber.trim() && alertSetupStyles.buttonDisabled
              ]}
              onPress={handleContinue}
              disabled={isLoading || !phoneNumber.trim()}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Animated.View style={alertSetupStyles.loadingContainer}>
                  <Ionicons name="hourglass" size={20} color="white" />
                  <Text style={alertSetupStyles.buttonText}>Processing...</Text>
                </Animated.View>
              ) : (
                <>
                  <Text style={alertSetupStyles.buttonText}>Continue</Text>
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