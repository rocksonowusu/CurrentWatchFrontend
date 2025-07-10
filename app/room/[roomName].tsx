import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DeviceDetailModal from '../../components/devices/DeviceDetailModal';
import LightFanCard from '../../components/devices/LightFanCard';
import SocketCard from '../../components/devices/SocketCard';

// Initial mock data
const initialRoomDevices = {
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

type Device = {
  id: string;
  type: 'socket' | 'light' | 'fan';
  name: string;
  isOn: boolean;
  current?: number;
};

export default function RoomDetailScreen() {
  const { roomName } = useLocalSearchParams<{ roomName: string }>();
  
  // Convert to state so we can update it
  const [devices, setDevices] = useState<Device[]>(
    (initialRoomDevices[roomName as keyof typeof initialRoomDevices] || []) as Device[]
  );
  
  const onCount = devices.filter((d: Device) => d.isOn).length;
  const totalCurrent = devices.reduce((sum: number, d: Device) => sum + (d.isOn && d.current ? d.current : 0), 0);

  // State for modal and selected device
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Handler for toggling device state
  const handleToggleDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              isOn: !device.isOn,
              // For sockets, reset current to a default value when turning on, 0 when turning off
              ...(device.type === 'socket' && {
                current: !device.isOn ? (device.current || 2.0) : 0
              })
            }
          : device
      )
    );
    
    // Update selected device if it's the one being toggled
    if (selectedDevice && selectedDevice.id === deviceId) {
      setSelectedDevice(prevSelected => 
        prevSelected ? {
          ...prevSelected,
          isOn: !prevSelected.isOn,
          ...(prevSelected.type === 'socket' && {
            current: !prevSelected.isOn ? (prevSelected.current || 2.0) : 0
          })
        } : null
      );
    }
  };

  // Handler for card press (open modal)
  const handleCardPress = (device: Device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  // Handler for modal close
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDevice(null);
  };

  // Handler for modal toggle
  const handleModalToggle = () => {
    if (selectedDevice) {
      handleToggleDevice(selectedDevice.id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomName}</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Devices On: {onCount} / {devices.length}</Text>
        <Text style={styles.summaryText}>Total Current: {totalCurrent.toFixed(1)} A</Text>
      </View>
      <ScrollView
        style={styles.cardsList}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
      >
        {devices.map((device: Device) => (
          device.type === 'socket' ? (
            <SocketCard
              key={device.id}
              name={device.name}
              current={device.current ?? 0}
              isOn={device.isOn}
              onPress={() => handleCardPress(device)}
              onToggle={() => handleToggleDevice(device.id)} // Now actually toggles the device
            />
          ) : (
            <LightFanCard
              key={device.id}
              name={device.name}
              type={device.type}
              isOn={device.isOn}
              onToggle={() => handleToggleDevice(device.id)} // Now actually toggles the device
              onPress={() => handleCardPress(device)}
            />
          )
        ))}
      </ScrollView>
      <DeviceDetailModal
        device={selectedDevice}
        visible={modalVisible}
        onClose={handleModalClose}
        onToggle={handleModalToggle} // Now properly handles toggle from modal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 15,
    color: '#10B981',
    fontWeight: '600',
  },
  cardsList: {
    flex: 1,
  },
});