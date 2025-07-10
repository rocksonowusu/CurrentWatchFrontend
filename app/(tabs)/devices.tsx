import RoomSection from '@/components/devices/RoomSection';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { deviceStyles } from '../../styles/screens_css/deviceStyles';

export default function Devices() {
  return (
    <View style={deviceStyles.container}>
      <View style={deviceStyles.backgroundCircles}>
        <View style={[deviceStyles.circle, deviceStyles.circle1]} />
        <View style={[deviceStyles.circle, deviceStyles.circle2]} />
        <View style={[deviceStyles.circle, deviceStyles.circle3]} />
      </View>
      {/* Fixed Header */}
      <View style={deviceStyles.headerContainer}>
        <Text style={deviceStyles.header}>Devices</Text>
        <Text style={deviceStyles.subtitle}>Manage and monitor all your connected devices by room.</Text>
      </View>
      {/* Scrollable Room List */}
      <ScrollView
        style={deviceStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={deviceStyles.scrollContent}
      >
        <RoomSection roomName="Living Room" />
        <RoomSection roomName="Bedroom" />
        <RoomSection roomName="Kitchen" />
        <RoomSection roomName="Bathroom" />
      </ScrollView>
    </View>
  );
}

