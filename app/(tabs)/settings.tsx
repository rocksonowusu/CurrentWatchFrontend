import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { settingsStyles } from '../../styles/screens_css/settingsStyle';


interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  currentUsage: number;
}

interface AlertData {
  id: string;
  message: string;
  timestamp: string;
  type: 'overload' | 'warning' | 'error';
}

const SettingsScreen: React.FC = () => {
  const [userEmail] = useState('user@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isDeviceManagerExpanded, setIsDeviceManagerExpanded] = useState(false);
  
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Living Room Socket', status: 'online', currentUsage: 2.5 },
    { id: '2', name: 'Kitchen Outlet', status: 'online', currentUsage: 1.8 },
    { id: '3', name: 'Bedroom Socket', status: 'offline', currentUsage: 0 },
  ]);
  
  const [maxCurrentPerSocket, setMaxCurrentPerSocket] = useState(15);
  const [globalSafetyThreshold, setGlobalSafetyThreshold] = useState(80);
  
  const [activeAlert, setActiveAlert] = useState<AlertData | null>({
    id: '1',
    message: 'High current detected in Living Room Socket',
    timestamp: '2 minutes ago',
    type: 'overload'
  });
  
  const [masterToggle, setMasterToggle] = useState(true);

  const router = useRouter();

  const handleUpdatePhone = () => {
    setIsEditingPhone(false);
    Alert.alert('Success', 'Phone number updated successfully');
  };

  const handleAddDevice = () => {
    Alert.alert(
      'Add Device',
      'Choose method to add device:',
      [
        { text: 'Scan QR Code', onPress: () => console.log('Scan QR') },
        { text: 'Enter Device ID', onPress: () => console.log('Enter ID') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleRemoveDevice = (deviceId: string, deviceName: string) => {
    Alert.alert(
      'Remove Device',
      `Are you sure you want to remove "${deviceName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setDevices(devices.filter(d => d.id !== deviceId));
            Alert.alert('Success', 'Device removed successfully');
          }
        }
      ]
    );
  };

  const handleResetToDefaults = () => {
    Alert.alert(
      'Reset to Defaults',
      'This will reset all threshold settings to default values. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => {
            setMaxCurrentPerSocket(15);
            setGlobalSafetyThreshold(80);
            Alert.alert('Success', 'Settings reset to defaults');
          }
        }
      ]
    );
  };

  const handleDismissAlert = () => {
    setActiveAlert(null);
  };

  const handleEmergencyShutdown = () => {
    Alert.alert(
      'Emergency Shutdown',
      'This will turn off all connected devices immediately. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Turn Off All',
          style: 'destructive',
          onPress: () => {
            setMasterToggle(false);
            Alert.alert('Emergency Shutdown', 'All devices have been turned off');
          }
        }
      ]
    );
  };

  const handleManualReset = () => {
    Alert.alert(
      'Manual System Reset',
      'This will reset the system state and clear all alerts. Use only during system emergency.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset System',
          style: 'destructive',
          onPress: () => {
            setActiveAlert(null);
            setMasterToggle(true);
            Alert.alert('System Reset', 'System has been reset successfully');
          }
        }
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace('/auth/intro');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={settingsStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={settingsStyles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background decorative circles */}
        <View style={settingsStyles.backgroundCircles}>
          <View style={[settingsStyles.circle, settingsStyles.circle1]} />
          <View style={[settingsStyles.circle, settingsStyles.circle2]} />
          <View style={[settingsStyles.circle, settingsStyles.circle3]} />
        </View>
        
        <SafeAreaView style={settingsStyles.safeArea}>
          <ScrollView 
            style={settingsStyles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={settingsStyles.scrollContent}
          >
            <View style={settingsStyles.headerContainer}>
              <Text style={settingsStyles.header}>Settings</Text>
              <Text style={settingsStyles.subtitle}>Manage your account and settings.</Text>
            </View>

            {/* Active Alert Banner */}
            {activeAlert && (
              <View style={settingsStyles.alertBanner}>
                <View style={settingsStyles.alertContent}>
                  <Ionicons name="warning" size={24} color="#fff" />
                  <View style={settingsStyles.alertText}>
                    <Text style={settingsStyles.alertMessage}>{activeAlert.message}</Text>
                    <Text style={settingsStyles.alertTimestamp}>{activeAlert.timestamp}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleDismissAlert} style={settingsStyles.dismissButton}>
                  <Ionicons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {/* Redesigned User Info Card */}
            <View style={settingsStyles.userCard}>
              <View style={settingsStyles.profileSection}>
                <View style={settingsStyles.profileImageContainer}>
                  <Ionicons name="person" size={32} color="#059669" />
                </View>
                <View style={settingsStyles.profileInfo}>
                  <Text style={settingsStyles.userName}>John Doe</Text>
                  <Text style={settingsStyles.userRole}>Account Owner</Text>
                </View>
              </View>
              
              <View style={settingsStyles.userDetails}>
                <View style={settingsStyles.detailRow}>
                  <View style={settingsStyles.detailIcon}>
                    <Ionicons name="mail" size={16} color="#059669" />
                  </View>
                  <View style={settingsStyles.detailContent}>
                    <Text style={settingsStyles.detailLabel}>Email Address</Text>
                    <Text style={settingsStyles.detailValue}>{userEmail}</Text>
                  </View>
                </View>
                
                <View style={settingsStyles.detailRow}>
                  <View style={settingsStyles.detailIcon}>
                    <Ionicons name="call" size={16} color="#059669" />
                  </View>
                  <View style={settingsStyles.detailContent}>
                    <Text style={settingsStyles.detailLabel}>Phone Number</Text>
                    {isEditingPhone ? (
                      <View style={settingsStyles.phoneEditContainer}>
                        <TextInput
                          style={settingsStyles.phoneInput}
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          placeholder="Enter phone number"
                        />
                        <TouchableOpacity onPress={handleUpdatePhone} style={settingsStyles.saveButton}>
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={settingsStyles.phoneContainer}>
                        <Text style={settingsStyles.detailValue}>{phoneNumber}</Text>
                        <TouchableOpacity onPress={() => setIsEditingPhone(true)} style={settingsStyles.editButton}>
                          <Ionicons name="pencil" size={14} color="#059669" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Collapsible Device Manager */}
            <View style={settingsStyles.card}>
              <TouchableOpacity
                style={[
                  settingsStyles.collapsibleHeader,
                  { paddingBottom: isDeviceManagerExpanded ? 16 : 0 }
                ]}
                onPress={() => setIsDeviceManagerExpanded(!isDeviceManagerExpanded)}
              >
                <View style={settingsStyles.cardHeader}>
                  <Ionicons name="hardware-chip" size={24} color="#059669" />
                  <Text style={settingsStyles.cardTitle}>Device Manager</Text>
                </View>
                <Ionicons 
                  name={isDeviceManagerExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#6b7280" 
                />
              </TouchableOpacity>
              
              {isDeviceManagerExpanded && (
                <View style={settingsStyles.deviceContent}>
                  <View style={settingsStyles.deviceList}>
                    {devices.map((device) => (
                      <View key={device.id} style={settingsStyles.deviceItem}>
                        <View style={settingsStyles.deviceInfo}>
                          <Text style={settingsStyles.deviceName}>{device.name}</Text>
                          <View style={settingsStyles.deviceStatus}>
                            <View style={[
                              settingsStyles.statusDot,
                              { backgroundColor: device.status === 'online' ? '#059669' : '#ef4444' }
                            ]} />
                            <Text style={settingsStyles.statusText}>
                              {device.status} • {device.currentUsage}A
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleRemoveDevice(device.id, device.name)}
                          style={settingsStyles.removeButton}
                        >
                          <Ionicons name="trash" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity style={settingsStyles.addButton} onPress={handleAddDevice}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={settingsStyles.addButtonText}>Add New Device</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Threshold Settings */}
            <View style={settingsStyles.card}>
              <View style={settingsStyles.cardHeader}>
                <Ionicons name="settings" size={24} color="#059669" />
                <Text style={settingsStyles.cardTitle}>Threshold Settings</Text>
              </View>
              <View style={settingsStyles.thresholdSettings}>
                <View style={settingsStyles.settingRow}>
                  <Text style={settingsStyles.settingLabel}>Max Current per Socket (A)</Text>
                  <TextInput
                    style={settingsStyles.settingInput}
                    value={maxCurrentPerSocket.toString()}
                    onChangeText={(text) => setMaxCurrentPerSocket(parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={settingsStyles.settingRow}>
                  <Text style={settingsStyles.settingLabel}>Global Safety Threshold (%)</Text>
                  <TextInput
                    style={settingsStyles.settingInput}
                    value={globalSafetyThreshold.toString()}
                    onChangeText={(text) => setGlobalSafetyThreshold(parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={settingsStyles.resetButton} onPress={handleResetToDefaults}>
                  <Ionicons name="refresh" size={16} color="#059669" />
                  <Text style={settingsStyles.resetButtonText}>Reset to Defaults</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Emergency Section */}
            <View style={settingsStyles.emergencyCard}>
              <View style={settingsStyles.cardHeader}>
                <Ionicons name="warning" size={24} color="#ef4444" />
                <Text style={[settingsStyles.cardTitle, settingsStyles.emergencyTitle]}>Emergency Controls</Text>
              </View>
              <Text style={settingsStyles.emergencyWarning}>
                ⚠️ Use only during system emergency
              </Text>
              
              <View style={settingsStyles.emergencyControls}>
                <View style={settingsStyles.masterToggleContainer}>
                  <View style={settingsStyles.toggleInfo}>
                    <Text style={settingsStyles.toggleLabel}>Master Power</Text>
                    <Text style={settingsStyles.toggleDescription}>
                      {masterToggle ? 'All devices enabled' : 'All devices disabled'}
                    </Text>
                  </View>
                  <Switch
                    value={masterToggle}
                    onValueChange={setMasterToggle}
                    trackColor={{ false: '#767577', true: '#059669' }}
                    thumbColor={masterToggle ? '#fff' : '#f4f3f4'}
                  />
                </View>

                <TouchableOpacity
                  style={settingsStyles.emergencyButton}
                  onPress={handleEmergencyShutdown}
                >
                  <Ionicons name="power" size={20} color="#fff" />
                  <Text style={settingsStyles.emergencyButtonText}>Turn Off All Devices</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[settingsStyles.emergencyButton, settingsStyles.resetSystemButton]}
                  onPress={handleManualReset}
                >
                  <Ionicons name="refresh-circle" size={20} color="#fff" />
                  <Text style={settingsStyles.emergencyButtonText}>Manual System Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={settingsStyles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={23} color="#000" />
              <Text style={settingsStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
          
          
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SettingsScreen;