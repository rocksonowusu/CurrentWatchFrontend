import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { roomSectionStyles } from '../../styles/componentsStyles/roomSectionStyles';

interface RoomSectionProps {
  roomName: string;
}

type Device = {
  id: string;
  type: 'socket' | 'light' | 'fan';
  name: string;
  isOn: boolean;
  current?: number;
};

// Helper function to get room icon
function getRoomIcon(roomName: string): keyof typeof Ionicons.glyphMap {
  const roomType = roomName.toLowerCase();
  
  if (roomType.includes('living') || roomType.includes('lounge')) {
    return 'home';
  } else if (roomType.includes('bedroom') || roomType.includes('bed')) {
    return 'bed';
  } else if (roomType.includes('kitchen')) {
    return 'restaurant';
  } else if (roomType.includes('bathroom') || roomType.includes('bath')) {
    return 'water';
  } else if (roomType.includes('office') || roomType.includes('study')) {
    return 'briefcase';
  } else if (roomType.includes('garage')) {
    return 'car';
  } else if (roomType.includes('garden') || roomType.includes('yard')) {
    return 'leaf';
  } else if (roomType.includes('dining')) {
    return 'restaurant-outline';
  } else {
    return 'home-outline';
  }
}



const roomDevices: { [key: string]: Device[] } = {
  'Living Room': [
    { id: '1', type: 'socket', name: 'TV Socket', current: 2.5, isOn: true },
    { id: '2', type: 'socket', name: 'Sound System', current: 1.8, isOn: true },
    { id: '3', type: 'light', name: 'Ceiling Light', isOn: false },
    { id: '4', type: 'fan', name: 'Ceiling Fan', isOn: true },
  ],
  'Bedroom': [
    { id: '5', type: 'socket', name: 'Phone Charger', current: 1.1, isOn: true },
    { id: '6', type: 'socket', name: 'Laptop Charger', current: 3.2, isOn: false },
    { id: '7', type: 'light', name: 'Bed Light', isOn: false },
    { id: '8', type: 'light', name: 'Reading Light', isOn: true },
  ],
  'Kitchen': [
    { id: '9', type: 'socket', name: 'Microwave', current: 8.5, isOn: false },
    { id: '10', type: 'socket', name: 'Coffee Maker', current: 4.2, isOn: true },
    { id: '11', type: 'light', name: 'Under Cabinet', isOn: true },
  ],
  'Bathroom': [
    { id: '12', type: 'socket', name: 'Hair Dryer', current: 0, isOn: false },
    { id: '13', type: 'light', name: 'Mirror Light', isOn: false },
    { id: '14', type: 'fan', name: 'Exhaust Fan', isOn: false },
  ],
};

export default function RoomSection({ roomName }: RoomSectionProps) {
  const router = useRouter();
  const devices = roomDevices[roomName] || [];
  const roomIcon = getRoomIcon(roomName);

  const handleHeaderPress = () => {
    router.push(`/room/${roomName}` as any);
  };

  const onCount = devices.filter((d: Device) => d.isOn).length;
  const totalCurrent = devices.reduce((sum: number, d: Device) => sum + (d.isOn && d.current ? d.current : 0), 0);
  const activityPercentage = devices.length > 0 ? (onCount / devices.length) * 100 : 0;

  return (
    <Pressable style={roomSectionStyles.container} onPress={handleHeaderPress}>
      {/* Header Section */}
      <View style={roomSectionStyles.header}>
        <View style={roomSectionStyles.roomInfo}>
        <View style={[roomSectionStyles.iconContainer, { backgroundColor: onCount > 0 ? '#DCFCE7' : '#F3F4F6' }]}>
          <Ionicons 
            name={roomIcon} 
            size={24} 
            color={onCount > 0 ? '#059669' : '#9CA3AF'} 
          />
        </View>
          <View style={roomSectionStyles.titleSection}>
            <Text style={roomSectionStyles.roomTitle}>{roomName}</Text>
            <Text style={roomSectionStyles.deviceCount}>
              {devices.length} device{devices.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        
        <View style={roomSectionStyles.headerRight}>
          <View style={roomSectionStyles.currentBadge}>
            <Ionicons name="flash" size={12} color="#1F2937" />
            <Text style={roomSectionStyles.currentText}>
              {totalCurrent.toFixed(1)}A
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>

      {/* Activity Overview */}
      <View style={roomSectionStyles.activitySection}>
        <View style={roomSectionStyles.activityInfo}>
          <View style={roomSectionStyles.statusIndicator}>
            <View style={[roomSectionStyles.statusDot, { backgroundColor: onCount > 0 ? '#059669' : '#E5E7EB' }]} />
            <Text style={roomSectionStyles.statusText}>
              {onCount} of {devices.length} active
            </Text>
          </View>
          <Text style={roomSectionStyles.activityPercentage}>
            {Math.round(activityPercentage)}%
          </Text>
        </View>
        
        <View style={roomSectionStyles.activityBarContainer}>
          <View style={roomSectionStyles.activityBarBackground}>
            <View 
              style={[
                roomSectionStyles.activityBarFill, 
                { 
                  width: `${activityPercentage}%`,
                  backgroundColor: activityPercentage > 75 ? '#22C55E' : 
                                  activityPercentage > 50 ? '#EAB308' : 
                                  activityPercentage > 25 ? '#F97316' : '#E5E7EB'
                }
              ]} 
            />
          </View>
        </View>
      </View>


    </Pressable>
  );
}



