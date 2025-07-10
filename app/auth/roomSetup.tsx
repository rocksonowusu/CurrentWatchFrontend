// app/auth/roomSetup.tsx
import React, { useEffect, useRef, useState } from 'react';
import { roomSetupStyles } from '../../styles/auth_css/roomSetupStyles';
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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Room icons mapping
const roomIcons = {
  'Living Room': 'tv-outline',
  'Bedroom': 'bed-outline',
  'Kitchen': 'restaurant-outline',
  'Bathroom': 'water-outline',
  'Home Office': 'laptop-outline',
  'Garage': 'car-outline',
  'Basement': 'home-outline',
  'Attic': 'layers-outline',
};

// Default rooms
const defaultRooms = [
  { id: 'living-room', name: 'Living Room', icon: 'tv-outline', selected: true },
  { id: 'bedroom', name: 'Bedroom', icon: 'bed-outline', selected: true },
  { id: 'kitchen', name: 'Kitchen', icon: 'restaurant-outline', selected: true },
];

export default function RoomSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [rooms, setRooms] = useState(defaultRooms);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('home-outline');

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
        toValue: 0.66, // 66% progress (step 4 of 6)
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const toggleRoom = (roomId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, selected: !room.selected } : room
      )
    );
  };

  const addCustomRoom = () => {
    if (!newRoomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    const newRoom = {
      id: `custom-${Date.now()}`,
      name: newRoomName.trim(),
      icon: selectedIcon,
      selected: true,
    };

    setRooms(prevRooms => [...prevRooms, newRoom]);
    setNewRoomName('');
    setSelectedIcon('home-outline');
    setShowAddRoom(false);
  };

  const removeRoom = (roomId: string) => {
    setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  };

  const handleContinue = () => {
    const selectedRooms = rooms.filter(room => room.selected);
    
    if (selectedRooms.length === 0) {
      Alert.alert('No Rooms Selected', 'Please select at least one room to continue.');
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
        pathname: '/auth/devicePairing',
        params: { 
          ...params,
          rooms: JSON.stringify(selectedRooms)
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

  const iconOptions = [
    'home-outline', 'tv-outline', 'bed-outline', 'restaurant-outline',
    'water-outline', 'laptop-outline', 'car-outline', 'layers-outline',
    'library-outline', 'cafe-outline', 'fitness-outline', 'construct-outline'
  ];

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FFF9', '#FFFFFF']}
      style={roomSetupStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={roomSetupStyles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={roomSetupStyles.keyboardView}
        >
          {/* Background circles */}
          <View style={roomSetupStyles.backgroundCircles}>
            <Animated.View 
              style={[
                roomSetupStyles.circle,
                roomSetupStyles.circle1,
                { opacity: fadeAnim }
              ]} 
            />
            <Animated.View 
              style={[
                roomSetupStyles.circle,
                roomSetupStyles.circle2,
                { opacity: fadeAnim }
              ]} 
            />
          </View>

          {/* Header */}
          <Animated.View
            style={[
              roomSetupStyles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity 
              style={roomSetupStyles.backButton} 
              onPress={handleBack}
              disabled={isLoading}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <Text style={roomSetupStyles.headerTitle}>Room Setup</Text>
            
            <Text style={roomSetupStyles.stepIndicator}>4 of 6</Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View style={roomSetupStyles.progressContainer}>
            <View style={roomSetupStyles.progressTrack}>
              <Animated.View
                style={[
                  roomSetupStyles.progressFill,
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
              style={roomSetupStyles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[
                roomSetupStyles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Welcome Message */}
              <View style={roomSetupStyles.welcomeSection}>
                <View style={roomSetupStyles.iconContainer}>
                  <Ionicons name="home" size={60} color="#10B981" />
                </View>
                <Text style={roomSetupStyles.title}>Select Your Rooms</Text>
                <Text style={roomSetupStyles.subtitle}>
                  Choose which rooms you want to monitor with CurrentWatch
                </Text>
              </View>

              {/* Room Selection */}
              <View style={roomSetupStyles.roomSection}>
                {/* <Text style={roomSetupStyles.sectionTitle}>Select Rooms to Monitor</Text> */}
                <View style={roomSetupStyles.roomGrid}>
                  {rooms.map((room) => (
                    <View key={room.id} style={roomSetupStyles.roomItemWrapper}>
                      <TouchableOpacity
                        style={[
                          roomSetupStyles.roomItem,
                          room.selected && roomSetupStyles.roomItemSelected
                        ]}
                        onPress={() => toggleRoom(room.id)}
                        activeOpacity={0.8}
                      >
                        <View style={[
                          roomSetupStyles.roomIconContainer,
                          room.selected && roomSetupStyles.roomIconContainerSelected
                        ]}>
                          <Ionicons 
                            name={room.icon as any} 
                            size={28} 
                            color={room.selected ? '#FFFFFF' : '#6B7280'} 
                          />
                        </View>
                        <Text style={[
                          roomSetupStyles.roomName,
                          room.selected && roomSetupStyles.roomNameSelected
                        ]}>
                          {room.name}
                        </Text>
                        {room.selected && (
                          <View style={roomSetupStyles.checkMark}>
                            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                          </View>
                        )}
                      </TouchableOpacity>
                      
                      {/* Remove button for custom rooms */}
                      {room.id.startsWith('custom-') && (
                        <TouchableOpacity
                            style={roomSetupStyles.removeButton}
                          onPress={() => removeRoom(room.id)}
                        >
                          <Ionicons name="close" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>

                {/* Add Custom Room */}
                {!showAddRoom ? (
                  <TouchableOpacity
                    style={roomSetupStyles.addRoomButton}
                    onPress={() => setShowAddRoom(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add-circle-outline" size={24} color="#10B981" />
                    <Text style={roomSetupStyles.addRoomText}>Add Custom Room</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={roomSetupStyles.addRoomForm}>
                    <Text style={roomSetupStyles.addRoomTitle}>Add Custom Room</Text>
                    
                    {/* Room Name Input */}
                    <View style={roomSetupStyles.inputContainer}>
                      <Ionicons name="text-outline" size={20} color="#6B7280" />
                      <TextInput
                        style={roomSetupStyles.input}
                        placeholder="Enter room name"
                        placeholderTextColor="#9CA3AF"
                        value={newRoomName}
                        onChangeText={setNewRoomName}
                        returnKeyType="done"
                      />
                    </View>

                    {/* Icon Selection */}
                    <Text style={roomSetupStyles.iconSelectionTitle}>Choose Icon</Text>
                    <View style={roomSetupStyles.iconGrid}>
                      {iconOptions.map((icon) => (
                        <TouchableOpacity
                          key={icon}
                          style={[
                            roomSetupStyles.iconOption,
                            selectedIcon === icon && roomSetupStyles.iconOptionSelected
                          ]}
                          onPress={() => setSelectedIcon(icon)}
                        >
                          <Ionicons 
                            name={icon as any} 
                            size={24} 
                            color={selectedIcon === icon ? '#FFFFFF' : '#6B7280'} 
                          />
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Add Room Actions */}
                    <View style={roomSetupStyles.addRoomActions}>
                      <TouchableOpacity
                        style={roomSetupStyles.cancelButton}
                        onPress={() => {
                          setShowAddRoom(false);
                          setNewRoomName('');
                          setSelectedIcon('home-outline');
                        }}
                      >
                        <Text style={roomSetupStyles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={roomSetupStyles.addButton}
                        onPress={addCustomRoom}
                      >
                        <Text style={roomSetupStyles.addButtonText}>Add Room</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              {/* Selected Rooms Summary */}
              {rooms.filter(room => room.selected).length > 0 && (
                <View style={roomSetupStyles.summarySection}>
                  <Text style={roomSetupStyles.summaryTitle}>
                    Selected Rooms ({rooms.filter(room => room.selected).length})
                  </Text>
                  <View style={roomSetupStyles.summaryList}>
                    {rooms.filter(room => room.selected).map((room) => (
                      <View key={room.id} style={roomSetupStyles.summaryItem}>
                        <Ionicons name={room.icon as any} size={16} color="#10B981" />
                        <Text style={roomSetupStyles.summaryItemText}>{room.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </Animated.View>
          </ScrollView>

          {/* Continue Button */}
          <Animated.View
            style={[
              roomSetupStyles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                roomSetupStyles.continueButton,
                isLoading && roomSetupStyles.buttonLoading,
                rooms.filter(room => room.selected).length === 0 && roomSetupStyles.buttonDisabled
              ]}
              onPress={handleContinue}
              disabled={isLoading || rooms.filter(room => room.selected).length === 0}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Animated.View style={roomSetupStyles.loadingContainer}>
                  <Ionicons name="hourglass" size={20} color="white" />
                  <Text style={roomSetupStyles.buttonText}>Processing...</Text>
                </Animated.View>
              ) : (
                <>
                  <Text style={roomSetupStyles.buttonText}>
                    Continue ({rooms.filter(room => room.selected).length} rooms)
                  </Text>
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