import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { welcomeStyles } from '../../styles/componentsStyles/welcomeStyles';

export default function WelcomeCard() {
  return (
    <View style={welcomeStyles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255, 255, 255, 0.95)']}
        style={welcomeStyles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={welcomeStyles.content}>
          <View style={welcomeStyles.textSection}>
            {/* <Text style={welcomeStyles.greeting}>Good Morning</Text> */}
            <Text style={welcomeStyles.name}>Welcome back, Rockson</Text>
            <Text style={welcomeStyles.subtitle}>
              Monitor & protect your electrical system
            </Text>
          </View>

          <View style={welcomeStyles.profileSection}>
            <View style={welcomeStyles.profileContainer}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={welcomeStyles.profileBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Replace with actual profile image */}
                <Ionicons name="person" size={28} color="#FFFFFF" />
              </LinearGradient>
              <View style={welcomeStyles.statusIndicator} />
            </View>
          </View>
        </View>

        {/* Decorative elements */}
        <View style={welcomeStyles.decorativeCircle1} />
        <View style={welcomeStyles.decorativeCircle2} />
      </LinearGradient>
    </View>
  );
}