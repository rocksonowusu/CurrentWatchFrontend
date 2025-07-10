// LightFanCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { lightfanCardStyles } from '../../styles/componentsStyles/lightfanCardStyles';

interface LightFanCardProps {
  name: string;
  type: 'light' | 'fan';
  isOn: boolean;
  onPress: () => void;
}

export default function LightFanCard({ 
  name, 
  type, 
  isOn, 
  onPress 
}: LightFanCardProps) {
  const getIcon = () => {
    if (type === 'light') {
      return isOn ? '💡' : '🔆';
    }
    return isOn ? '🌀' : '⭕';
  };

  return (
    <TouchableOpacity 
      style={[lightfanCardStyles.card, isOn ? lightfanCardStyles.cardOn : lightfanCardStyles.cardOff]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={lightfanCardStyles.cardContent}>
        <View style={lightfanCardStyles.deviceHeader}>
          <View style={[lightfanCardStyles.iconContainer, isOn ? lightfanCardStyles.iconContainerOn : lightfanCardStyles.iconContainerOff]}>
            <Text style={lightfanCardStyles.deviceIcon}>{getIcon()}</Text>
          </View>
          
          <View style={lightfanCardStyles.deviceInfo}>
            <Text style={lightfanCardStyles.deviceName}>{name}</Text>
            <Text style={lightfanCardStyles.deviceType}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <Text style={lightfanCardStyles.powerDetail}>Power: 10W</Text>
          </View>
          
          <View style={lightfanCardStyles.statusSection}>
            <View style={[lightfanCardStyles.statusIndicator, isOn ? lightfanCardStyles.statusOn : lightfanCardStyles.statusOff]}>
              <Text style={[lightfanCardStyles.statusText, isOn ? lightfanCardStyles.statusTextOn : lightfanCardStyles.statusTextOff]}>
                {isOn ? 'ON' : 'OFF'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

