import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { roomSummaryStyles } from '../../styles/componentsStyles/roomSummaryStyles';

// Mock data for rooms
const roomsData = [
  {
    id: '1',
    name: 'Living Room',
    currentDraw: 2.4,
    activeDevices: 5,
    hasAlert: false,
    icon: 'tv-outline'
  },
  {
    id: '2',
    name: 'Kitchen',
    currentDraw: 3.8,
    activeDevices: 8,
    hasAlert: true,
    icon: 'restaurant-outline'
  },
  // {
  //   id: '3',
  //   name: 'Bedroom',
  //   currentDraw: 1.2,
  //   activeDevices: 3,
  //   hasAlert: false,
  //   icon: 'bed-outline'
  // },
  // {
  //   id: '4',
  //   name: 'Office',
  //   currentDraw: 2.1,
  //   activeDevices: 4,
  //   hasAlert: false,
  //   icon: 'desktop-outline'
  // },
];

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    currentDraw: number;
    activeDevices: number;
    hasAlert: boolean;
    icon: string;
  };
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.8)', 'rgba(240,253,244,0.8)']}
      style={roomSummaryStyles.roomCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={roomSummaryStyles.roomHeader}>
        <View style={roomSummaryStyles.roomIconContainer}>
          <Ionicons name={room.icon as any} size={20} color="#10B981" />
        </View>
        <View style={roomSummaryStyles.roomInfo}>
          <Text style={roomSummaryStyles.roomName}>{room.name}</Text>
          <Text style={roomSummaryStyles.deviceCount}>{room.activeDevices} devices</Text>
        </View>
        {room.hasAlert && (
          <View style={roomSummaryStyles.alertBadge}>
            <Ionicons name="warning" size={14} color="#EF4444" />
          </View>
        )}
      </View>
      
      <View style={roomSummaryStyles.roomStats}>
        <View style={roomSummaryStyles.currentContainer}>
          <Text style={roomSummaryStyles.currentValue}>{room.currentDraw}</Text>
          <Text style={roomSummaryStyles.currentUnit}>kW</Text>
        </View>
        <View style={roomSummaryStyles.statusIndicator}>
          <View style={[roomSummaryStyles.statusDot, { backgroundColor: room.hasAlert ? '#EF4444' : '#22C55E' }]} />
          <Text style={[roomSummaryStyles.statusText, { color: room.hasAlert ? '#EF4444' : '#059669' }]}>
            {room.hasAlert ? 'Alert' : 'Normal'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default function RoomSummary() {
  return (
    <View style={roomSummaryStyles.container}>
      <View style={roomSummaryStyles.header}>
        <Text style={roomSummaryStyles.title}>Room Summary</Text>
        <Text style={roomSummaryStyles.subtitle}>{roomsData.length} rooms monitored</Text>
      </View>
      
      <FlatList
        data={roomsData}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={roomSummaryStyles.row}
        contentContainerStyle={roomSummaryStyles.flatListContent}
      />
    </View>
  );
}

