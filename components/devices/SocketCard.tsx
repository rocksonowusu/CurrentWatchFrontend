// SocketCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { socketCardStyles } from '../../styles/componentsStyles/SocketCardStyles';

interface SocketCardProps {
  name: string;
  current: number;
  isOn: boolean;
  onToggle: () => void;
  onPress: () => void;
}

export default function SocketCard({ 
  name, 
  current, 
  isOn, 
  onToggle, 
  onPress 
}: SocketCardProps) {
  // Calculate gauge parameters for semi-circle (180 degrees)
  const maxCurrent = 500; // 500mA max
  const percentage = Math.min((current / maxCurrent) * 100, 100);
  const radius = 50;
  const circumference = Math.PI * radius; // Half circle circumference
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  
  // Get color based on current level
  const getGaugeColor = () => {
    if (!isOn) return '#E5E7EB';
    if (percentage < 30) return '#10B981'; // Green
    if (percentage < 70) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const gaugeColor = getGaugeColor();

  return (
    <TouchableOpacity 
      style={[socketCardStyles.card, isOn ? socketCardStyles.cardOn : socketCardStyles.cardOff]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={socketCardStyles.cardContent}>
        {/* Header */}
        <View style={socketCardStyles.header}>
          <View style={socketCardStyles.deviceInfo}>
            <Text style={socketCardStyles.deviceName}>{name}</Text>
            <View style={[socketCardStyles.statusContainer, isOn ? socketCardStyles.statusOnContainer : socketCardStyles.statusOffContainer]}>
              <View style={[socketCardStyles.statusDot, isOn ? socketCardStyles.statusDotOn : socketCardStyles.statusDotOff]} />
              <Text style={[socketCardStyles.statusText, isOn ? socketCardStyles.statusTextOn : socketCardStyles.statusTextOff]}>
                {isOn ? 'ON' : 'OFF'}
              </Text>
            </View>
          </View>
        </View>

        {/* Semi-Circular Gauge */}
        <View style={socketCardStyles.gaugeContainer}>
          <View style={socketCardStyles.gaugeWrapper}>
            <Svg width={140} height={80} style={socketCardStyles.gauge}>
              {/* Background semi-circle with rounded ends */}
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference} 0`}
                strokeDashoffset="0"
                transform="rotate(-90 70 70)"
                opacity={0.3}
              />
              {/* Progress semi-circle */}
              <Circle
                cx="70"
                cy="70"
                r={radius}
                stroke={gaugeColor}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={isOn ? (circumference - (circumference * percentage) / 100) : circumference}
                transform="rotate(-90 70 70)"
              />
            </Svg>
            
            {/* Center content */}
            <View style={socketCardStyles.gaugeCenterContent}>
              <Text style={[socketCardStyles.currentValue, isOn ? socketCardStyles.currentActive : socketCardStyles.currentInactive]}>
                {isOn ? current.toFixed(0) : '0'} mA
              </Text>
            </View>
          </View>
        </View>

        {/* Min/Max indicators */}
        <View style={socketCardStyles.indicatorsContainer}>
          <View style={socketCardStyles.leftIndicator}>
            <View style={socketCardStyles.waveIcon}>
              <Text style={socketCardStyles.waveText}>⚡</Text>
            </View>
            <Text style={socketCardStyles.indicatorValue}>0 mA</Text>
            <Text style={socketCardStyles.indicatorLabel}>Low</Text>
          </View>
          
          <View style={socketCardStyles.rightIndicator}>
            <View style={socketCardStyles.waveIcon}>
              <Text style={socketCardStyles.waveText}>⚡</Text>
            </View>
            <Text style={socketCardStyles.indicatorValue}>{maxCurrent} mA</Text>
            <Text style={socketCardStyles.indicatorLabel}>High</Text>
          </View>
        </View>

        {/* Center Label */}
        <View style={socketCardStyles.centerLabelContainer}>
          <Text style={socketCardStyles.amperageLabel}>Amperage</Text>
        </View>

        {/* Power Info */}
        <View style={socketCardStyles.bottomSection}>
          <View style={socketCardStyles.powerInfo}>
            <Text style={socketCardStyles.powerLabel}>Power:</Text>
            <Text style={[socketCardStyles.powerValue, { color: gaugeColor }]}>
              {isOn ? ((current * 5) / 1000).toFixed(1) : '0.0'}W
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

