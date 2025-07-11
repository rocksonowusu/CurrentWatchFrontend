// app/auth/devicePairing.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { devicePairingStyles } from '../../styles/auth_css/devicePairingStyles';
import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Device types
const deviceTypes = [
  { id: 'socket', name: 'Socket', icon: 'plug-outline' },
  { id: 'light', name: 'Light', icon: 'bulb-outline' },
  { id: 'fan', name: 'Fan', icon: 'leaf-outline' },
];

interface Room {
  id: string;
  name: string;
  icon: string;
}

interface Device {
  id: string;
  roomId: string;
  roomName: string;
  name: string;
  type: string;
  deviceId: string;
  status: 'pending' | 'paired' | 'failed';
}

export default function DevicePairingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'socket',
    deviceId: '',
  });
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isPairing, setIsPairing] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parse rooms from params
    if (params.rooms) {
      const parsedRooms = JSON.parse(params.rooms as string);
      setRooms(parsedRooms);
    }

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
        toValue: 0.83, // 83% progress (step 5 of 6)
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [params.rooms]);

  const addDevice = () => {
    if (!newDevice.name.trim() || !newDevice.deviceId.trim() || !currentRoom) {
      Alert.alert('Error', 'Please fill in all device details');
      return;
    }

    const device: Device = {
      id: `device-${Date.now()}`,
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      name: newDevice.name.trim(),
      type: newDevice.type,
      deviceId: newDevice.deviceId.trim(),
      status: 'pending',
    };

    setDevices(prev => [...prev, device]);
    setNewDevice({ name: '', type: 'socket', deviceId: '' });
    setShowAddDevice(false);
    setCurrentRoom(null);

    // Simulate pairing process
    setTimeout(() => {
      setDevices(prev => 
        prev.map(d => 
          d.id === device.id 
            ? { ...d, status: Math.random() > 0.2 ? 'paired' : 'failed' }
            : d
        )
      );
    }, 2000);
  };

  const removeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  const retryPairing = (deviceId: string) => {
    setDevices(prev => 
      prev.map(d => 
        d.id === deviceId ? { ...d, status: 'pending' } : d
      )
    );

    setTimeout(() => {
      setDevices(prev => 
        prev.map(d => 
          d.id === deviceId 
            ? { ...d, status: Math.random() > 0.3 ? 'paired' : 'failed' }
            : d
        )
      );
    }, 2000);
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setShowQRScanner(false);
    const mockDeviceId = `CW${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setNewDevice(prev => ({ ...prev, deviceId: mockDeviceId }));
  };

  const handleContinue = () => {
    const pairedDevices = devices.filter(d => d.status === 'paired');
    
    if (devices.length === 0) {
      Alert.alert(
        'No Devices Added',
        'You can add devices later from the app settings. Continue to finish setup?',
        [
          { text: 'Add Devices', style: 'cancel' },
          { text: 'Continue', onPress: proceedToFinish }
        ]
      );
      return;
    }

    if (pairedDevices.length === 0) {
      Alert.alert(
        'No Devices Paired',
        'None of your devices are successfully paired. You can retry pairing or continue to finish setup.',
        [
          { text: 'Retry All', onPress: retryAllDevices },
          { text: 'Continue Anyway', onPress: proceedToFinish }
        ]
      );
      return;
    }

    proceedToFinish();
  };

  const retryAllDevices = () => {
    const failedDevices = devices.filter(d => d.status === 'failed');
    failedDevices.forEach(device => retryPairing(device.id));
  };

  const proceedToFinish = () => {
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
      // Pass data to finish screen
      router.replace({
        pathname: '/auth/finishSetup',
        params: { 
          ...params,
          devices: JSON.stringify(devices)
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
      router.replace('/auth/roomSetup');
    });
  };

  const getDeviceTypeIcon = (type: string) => {
    const deviceType = deviceTypes.find(dt => dt.id === type);
    return deviceType ? deviceType.icon : 'hardware-chip-outline';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paired': return '#10B981';
      case 'failed': return '#EF4444';
      default: return '#F59E0B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paired': return 'checkmark-circle';
      case 'failed': return 'close-circle';
      default: return 'hourglass';
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={devicePairingStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={devicePairingStyles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={devicePairingStyles.keyboardView}
        >
          {/* Background circles */}
          <View style={devicePairingStyles.backgroundCircles}>
            <Animated.View 
              style={[
                devicePairingStyles.circle,
                devicePairingStyles.circle1,
                { opacity: fadeAnim }
              ]} 
            />
            <Animated.View 
              style={[
                devicePairingStyles.circle,
                devicePairingStyles.circle2,
                { opacity: fadeAnim }
              ]} 
            />
          </View>

          {/* Header */}
          <Animated.View
            style={[
              devicePairingStyles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity 
              style={devicePairingStyles.backButton} 
              onPress={handleBack}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <Text style={devicePairingStyles.headerTitle}>Device Pairing</Text>
            
            <Text style={devicePairingStyles.stepIndicator}>5 of 6</Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View style={devicePairingStyles.progressContainer}>
            <View style={devicePairingStyles.progressTrack}>
              <Animated.View
                style={[
                  devicePairingStyles.progressFill,
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
            style={devicePairingStyles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                devicePairingStyles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Welcome Message */}
              <View style={devicePairingStyles.welcomeSection}>
                <View style={devicePairingStyles.iconContainer}>
                  <Ionicons name="link" size={60} color="#10B981" />
                </View>
                <Text style={devicePairingStyles.title}>Pair Your Devices</Text>
                <Text style={devicePairingStyles.subtitle}>
                  Connect CurrentWatch devices to monitor your electrical usage
                </Text>
              </View>

              {/* Rooms and Devices */}
              <View style={devicePairingStyles.devicesSection}>
                {rooms.map((room) => (
                  <View key={room.id} style={devicePairingStyles.roomSection}>
                    <View style={devicePairingStyles.roomHeader}>
                      <View style={devicePairingStyles.roomInfo}>
                        <Ionicons name={room.icon as any} size={24} color="#10B981" />
                        <Text style={devicePairingStyles.roomTitle}>{room.name}</Text>
                      </View>
                      <TouchableOpacity
                        style={devicePairingStyles.addDeviceButton}
                        onPress={() => {
                          setCurrentRoom(room);
                          setShowAddDevice(true);
                        }}
                      >
                        <Ionicons name="add" size={20} color="#10B981" />
                        <Text style={devicePairingStyles.addDeviceText}>Add Device</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Devices in this room */}
                    <View style={devicePairingStyles.devicesList}>
                      {devices
                        .filter(device => device.roomId === room.id)
                        .map((device) => (
                          <View key={device.id} style={devicePairingStyles.deviceItem}>
                            <View style={devicePairingStyles.deviceInfo}>
                              <View style={devicePairingStyles.deviceIconContainer}>
                                <Ionicons 
                                  name={getDeviceTypeIcon(device.type) as any} 
                                  size={24} 
                                  color="#6B7280" 
                                />
                              </View>
                              <View style={devicePairingStyles.deviceDetails}>
                                <Text style={devicePairingStyles.deviceName}>{device.name}</Text>
                                <Text style={devicePairingStyles.deviceId}>ID: {device.deviceId}</Text>
                              </View>
                            </View>
                            
                            <View style={devicePairingStyles.deviceActions}>
                              <View style={[devicePairingStyles.statusIndicator, { backgroundColor: getStatusColor(device.status) }]}>
                                <Ionicons 
                                  name={getStatusIcon(device.status) as any} 
                                  size={16} 
                                  color="#FFFFFF" 
                                />
                              </View>
                              
                              {device.status === 'failed' && (
                                <TouchableOpacity
                                  style={devicePairingStyles.retryButton}
                                  onPress={() => retryPairing(device.id)}
                                >
                                  <Ionicons name="refresh" size={16} color="#F59E0B" />
                                </TouchableOpacity>
                              )}
                              
                              <TouchableOpacity
                                style={devicePairingStyles.removeDeviceButton}
                                onPress={() => removeDevice(device.id)}
                              >
                                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                      
                      {devices.filter(device => device.roomId === room.id).length === 0 && (
                        <View style={devicePairingStyles.noDevicesContainer}>
                          <Text style={devicePairingStyles.noDevicesText}>No devices added yet</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              {/* Device Summary */}
              {devices.length > 0 && (
                <View style={devicePairingStyles.summarySection}>
                  <Text style={devicePairingStyles.summaryTitle}>Pairing Summary</Text>
                  <View style={devicePairingStyles.summaryStats}>
                    <View style={devicePairingStyles.statItem}>
                      <Text style={devicePairingStyles.statNumber}>{devices.length}</Text>
                      <Text style={devicePairingStyles.statLabel}>Total</Text>
                    </View>
                    <View style={devicePairingStyles.statItem}>
                      <Text style={[devicePairingStyles.statNumber, { color: '#10B981' }]}>
                        {devices.filter(d => d.status === 'paired').length}
                      </Text>
                      <Text style={devicePairingStyles.statLabel}>Paired</Text>
                    </View>
                    <View style={devicePairingStyles.statItem}>
                      <Text style={[devicePairingStyles.statNumber, { color: '#EF4444' }]}>
                        {devices.filter(d => d.status === 'failed').length}
                      </Text>
                      <Text style={devicePairingStyles.statLabel}>Failed</Text>
                    </View>
                  </View>
                </View>
              )}
            </Animated.View>
          </ScrollView>

          {/* Continue Button */}
          <Animated.View
            style={[
              devicePairingStyles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                devicePairingStyles.continueButton,
                isLoading && devicePairingStyles.buttonLoading
              ]}
              onPress={handleContinue}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Animated.View style={devicePairingStyles.loadingContainer}>
                  <Ionicons name="hourglass" size={20} color="white" />
                  <Text style={devicePairingStyles.buttonText}>Processing...</Text>
                </Animated.View>
              ) : (
                <>
                  <Text style={devicePairingStyles.buttonText}>
                    {devices.length > 0 ? `Continue (${devices.filter(d => d.status === 'paired').length} paired)` : 'Skip for Now'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Add Device Modal */}
      <Modal
        visible={showAddDevice}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddDevice(false)}
      >
        <SafeAreaView style={devicePairingStyles.modalContainer}>
          <View style={devicePairingStyles.modalHeader}>
            <Text style={devicePairingStyles.modalTitle}>Add Device to {currentRoom?.name}</Text>
            <TouchableOpacity
              style={devicePairingStyles.modalCloseButton}
              onPress={() => setShowAddDevice(false)}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={devicePairingStyles.modalContent}>
            {/* Device Name */}
            <View style={devicePairingStyles.inputGroup}>
              <Text style={devicePairingStyles.label}>Device Name</Text>
              <View style={devicePairingStyles.inputContainer}>
                <Ionicons name="text-outline" size={20} color="#6B7280" />
                <TextInput
                  style={devicePairingStyles.input}
                  placeholder="e.g., Living Room Fan"
                  placeholderTextColor="#9CA3AF"
                  value={newDevice.name}
                  onChangeText={(text) => setNewDevice(prev => ({ ...prev, name: text }))}
                />
              </View>
            </View>

            {/* Device Type */}
            <View style={devicePairingStyles.inputGroup}>
              <Text style={devicePairingStyles.label}>Device Type</Text>
              <View style={devicePairingStyles.deviceTypeGrid}>
                {deviceTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      devicePairingStyles.deviceTypeOption,
                      newDevice.type === type.id && devicePairingStyles.deviceTypeOptionSelected
                    ]}
                    onPress={() => setNewDevice(prev => ({ ...prev, type: type.id }))}
                  >
                    <Ionicons 
                      name={type.icon as any} 
                      size={24} 
                      color={newDevice.type === type.id ? '#FFFFFF' : '#6B7280'} 
                    />
                    <Text style={[
                      devicePairingStyles.deviceTypeText,
                      newDevice.type === type.id && devicePairingStyles.deviceTypeTextSelected
                    ]}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Device ID */}
            <View style={devicePairingStyles.inputGroup}>
              <Text style={devicePairingStyles.label}>Device ID</Text>
              <View style={devicePairingStyles.deviceIdContainer}>
                <View style={devicePairingStyles.inputContainer}>
                  <Ionicons name="hardware-chip-outline" size={20} color="#6B7280" />
                  <TextInput
                    style={devicePairingStyles.input}
                    placeholder="Enter device ID"
                    placeholderTextColor="#9CA3AF"
                    value={newDevice.deviceId}
                    onChangeText={(text) => setNewDevice(prev => ({ ...prev, deviceId: text.toUpperCase() }))}
                    autoCapitalize="characters"
                  />
                </View>
                <TouchableOpacity
                  style={devicePairingStyles.qrButton}
                  onPress={() => setShowQRScanner(true)}
                >
                  <Ionicons name="qr-code-outline" size={20} color="#10B981" />
                </TouchableOpacity>
              </View>
              <Text style={devicePairingStyles.helperText}>
                Find the device ID on your CurrentWatch device or scan the QR code
              </Text>
            </View>
          </ScrollView>

          <View style={devicePairingStyles.modalActions}>
            <TouchableOpacity
              style={devicePairingStyles.cancelButton}
              onPress={() => setShowAddDevice(false)}
            >
              <Text style={devicePairingStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                devicePairingStyles.addButton,
                (!newDevice.name.trim() || !newDevice.deviceId.trim()) && devicePairingStyles.addButtonDisabled
              ]}
              onPress={addDevice}
              disabled={!newDevice.name.trim() || !newDevice.deviceId.trim()}
            >
              <Text style={devicePairingStyles.addButtonText}>Add Device</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* QR Scanner Modal */}
      <Modal
        visible={showQRScanner}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowQRScanner(false)}
      >
        <SafeAreaView style={devicePairingStyles.qrContainer}>
          <View style={devicePairingStyles.qrHeader}>
            <Text style={devicePairingStyles.qrTitle}>Scan QR Code</Text>
            <TouchableOpacity
              style={devicePairingStyles.qrCloseButton}
              onPress={() => setShowQRScanner(false)}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
            <View style={devicePairingStyles.qrContent}>
            <View style={devicePairingStyles.qrFrame}>
              <View style={devicePairingStyles.qrCorner} />
              <View style={[devicePairingStyles.qrCorner, devicePairingStyles.qrCornerTopRight]} />
              <View style={[devicePairingStyles.qrCorner, devicePairingStyles.qrCornerBottomLeft]} />
              <View style={[devicePairingStyles.qrCorner, devicePairingStyles.qrCornerBottomRight]} />
            </View>
            <Text style={devicePairingStyles.qrInstructions}>
              Position the QR code within the frame
            </Text>
            <TouchableOpacity
              style={devicePairingStyles.qrScanButton}
              onPress={handleQRScan}
            >
              <Text style={devicePairingStyles.qrScanButtonText}>Simulate Scan</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </LinearGradient>
  );
}

