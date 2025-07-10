import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

const { height } = Dimensions.get("window");

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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background decorative circles */}
        <View style={styles.backgroundCircles}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
        
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Settings</Text>
              <Text style={styles.subtitle}>Manage your account and settings.</Text>
            </View>

            {/* Active Alert Banner */}
            {activeAlert && (
              <View style={styles.alertBanner}>
                <View style={styles.alertContent}>
                  <Ionicons name="warning" size={24} color="#fff" />
                  <View style={styles.alertText}>
                    <Text style={styles.alertMessage}>{activeAlert.message}</Text>
                    <Text style={styles.alertTimestamp}>{activeAlert.timestamp}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleDismissAlert} style={styles.dismissButton}>
                  <Ionicons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {/* Redesigned User Info Card */}
            <View style={styles.userCard}>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Ionicons name="person" size={32} color="#059669" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userRole}>Account Owner</Text>
                </View>
              </View>
              
              <View style={styles.userDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}>
                    <Ionicons name="mail" size={16} color="#059669" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Email Address</Text>
                    <Text style={styles.detailValue}>{userEmail}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}>
                    <Ionicons name="call" size={16} color="#059669" />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Phone Number</Text>
                    {isEditingPhone ? (
                      <View style={styles.phoneEditContainer}>
                        <TextInput
                          style={styles.phoneInput}
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          placeholder="Enter phone number"
                        />
                        <TouchableOpacity onPress={handleUpdatePhone} style={styles.saveButton}>
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.phoneContainer}>
                        <Text style={styles.detailValue}>{phoneNumber}</Text>
                        <TouchableOpacity onPress={() => setIsEditingPhone(true)} style={styles.editButton}>
                          <Ionicons name="pencil" size={14} color="#059669" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Collapsible Device Manager */}
            <View style={styles.card}>
              <TouchableOpacity
                style={[
                  styles.collapsibleHeader,
                  { paddingBottom: isDeviceManagerExpanded ? 16 : 0 }
                ]}
                onPress={() => setIsDeviceManagerExpanded(!isDeviceManagerExpanded)}
              >
                <View style={styles.cardHeader}>
                  <Ionicons name="hardware-chip" size={24} color="#059669" />
                  <Text style={styles.cardTitle}>Device Manager</Text>
                </View>
                <Ionicons 
                  name={isDeviceManagerExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#6b7280" 
                />
              </TouchableOpacity>
              
              {isDeviceManagerExpanded && (
                <View style={styles.deviceContent}>
                  <View style={styles.deviceList}>
                    {devices.map((device) => (
                      <View key={device.id} style={styles.deviceItem}>
                        <View style={styles.deviceInfo}>
                          <Text style={styles.deviceName}>{device.name}</Text>
                          <View style={styles.deviceStatus}>
                            <View style={[
                              styles.statusDot,
                              { backgroundColor: device.status === 'online' ? '#059669' : '#ef4444' }
                            ]} />
                            <Text style={styles.statusText}>
                              {device.status} • {device.currentUsage}A
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleRemoveDevice(device.id, device.name)}
                          style={styles.removeButton}
                        >
                          <Ionicons name="trash" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add New Device</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Threshold Settings */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="settings" size={24} color="#059669" />
                <Text style={styles.cardTitle}>Threshold Settings</Text>
              </View>
              <View style={styles.thresholdSettings}>
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Max Current per Socket (A)</Text>
                  <TextInput
                    style={styles.settingInput}
                    value={maxCurrentPerSocket.toString()}
                    onChangeText={(text) => setMaxCurrentPerSocket(parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Global Safety Threshold (%)</Text>
                  <TextInput
                    style={styles.settingInput}
                    value={globalSafetyThreshold.toString()}
                    onChangeText={(text) => setGlobalSafetyThreshold(parseInt(text) || 0)}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={handleResetToDefaults}>
                  <Ionicons name="refresh" size={16} color="#059669" />
                  <Text style={styles.resetButtonText}>Reset to Defaults</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Emergency Section */}
            <View style={styles.emergencyCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="warning" size={24} color="#ef4444" />
                <Text style={[styles.cardTitle, styles.emergencyTitle]}>Emergency Controls</Text>
              </View>
              <Text style={styles.emergencyWarning}>
                ⚠️ Use only during system emergency
              </Text>
              
              <View style={styles.emergencyControls}>
                <View style={styles.masterToggleContainer}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>Master Power</Text>
                    <Text style={styles.toggleDescription}>
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
                  style={styles.emergencyButton}
                  onPress={handleEmergencyShutdown}
                >
                  <Ionicons name="power" size={20} color="#fff" />
                  <Text style={styles.emergencyButtonText}>Turn Off All Devices</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.emergencyButton, styles.resetSystemButton]}
                  onPress={handleManualReset}
                >
                  <Ionicons name="refresh-circle" size={20} color="#fff" />
                  <Text style={styles.emergencyButtonText}>Manual System Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  backgroundCircles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
    backgroundColor: 'rgba(0, 201, 87, 0.08)',
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: -75,
    left: -75,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.3,
    left: -50,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  alertBanner: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 0,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertText: {
    marginLeft: 12,
    flex: 1,
  },
  alertMessage: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  alertTimestamp: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  dismissButton: {
    padding: 4,
  },
  // Redesigned User Card Styles
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#dcfce7',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  userDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  phoneEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#059669',
    borderRadius: 6,
    padding: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  // Regular card styles (with elevation removed from user card)
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  deviceContent: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  deviceList: {
    gap: 12,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  thresholdSettings: {
    gap: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
    flex: 1,
  },
  settingInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    width: 80,
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 8,
    marginTop: 8,
  },
  resetButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#fef2f2',
  },
  emergencyTitle: {
    color: '#ef4444',
  },
  emergencyWarning: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 6,
  },
  emergencyControls: {
    gap: 16,
  },
  masterToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  toggleDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
  },
  resetSystemButton: {
    backgroundColor: '#dc2626',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SettingsScreen;