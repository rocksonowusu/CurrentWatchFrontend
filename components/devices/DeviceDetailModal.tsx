// DeviceDetailsModal.tsx
import { LinearGradient } from 'expo-linear-gradient'; // or react-native-linear-gradient
import React from 'react';
import { deviceDetailModalStyles } from '../../styles/componentsStyles/deviceDetailModalStyles';
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DeviceDetailsModalProps {
  device: any;
  visible: boolean;
  onClose: () => void;
  onToggle: () => void; // Add toggle function prop
}



export default function DeviceDetailsModal({
  device,
  visible,
  onClose,
  onToggle,
}: DeviceDetailsModalProps) {
  if (!device) return null;

  const renderPowerIcon = () => (
    <View style={[deviceDetailModalStyles.powerIcon, device.isOn ? deviceDetailModalStyles.powerIconOn : deviceDetailModalStyles.powerIconOff]}>
      <Text style={deviceDetailModalStyles.powerIconText}>⚡</Text>
    </View>
  );

  const renderMetricCard = (title: string, value: string, unit: string, color: string) => (
    <View style={deviceDetailModalStyles.metricCard}>
      <View style={[deviceDetailModalStyles.metricIconContainer, { backgroundColor: color + '15' }]}>
        <View style={[deviceDetailModalStyles.metricIcon, { backgroundColor: color }]} />
      </View>
      <Text style={deviceDetailModalStyles.metricTitle}>{title}</Text>
      <View style={deviceDetailModalStyles.metricValueContainer}>
        <Text style={deviceDetailModalStyles.metricValue}>{value}</Text>
        <Text style={deviceDetailModalStyles.metricUnit}>{unit}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />
      <View style={deviceDetailModalStyles.modalOverlay}>
        <View style={deviceDetailModalStyles.backdrop} />
        
        <View style={deviceDetailModalStyles.modalContent}>
          {/* Handle Bar */}
          <View style={deviceDetailModalStyles.handleBar} />
          
          {/* Header */}
          <View style={deviceDetailModalStyles.modalHeader}>
            <View style={deviceDetailModalStyles.headerLeft}>
              {renderPowerIcon()}
              <View style={deviceDetailModalStyles.headerText}>
                <Text style={deviceDetailModalStyles.deviceName}>{device.name}</Text>
                <Text style={deviceDetailModalStyles.deviceType}>
                  {device.type.charAt(0).toUpperCase() + device.type.slice(1)} Device
                </Text>
              </View>
            </View>
            
            <TouchableOpacity onPress={onClose} style={deviceDetailModalStyles.closeButton}>
              <Text style={deviceDetailModalStyles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={deviceDetailModalStyles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Status Card */}
            <View style={deviceDetailModalStyles.statusCard}>
              <LinearGradient
                colors={device.isOn ? ['#10B981', '#059669'] : ['#6B7280', '#4B5563']}
                style={deviceDetailModalStyles.statusGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={deviceDetailModalStyles.statusContent}>
                  <Text style={deviceDetailModalStyles.statusLabel}>Current Status</Text>
                  <Text style={deviceDetailModalStyles.statusValue}>
                    {device.isOn ? 'ACTIVE' : 'INACTIVE'}
                  </Text>
                  <Text style={deviceDetailModalStyles.statusTime}>Last updated: Just now</Text>
                </View>
                <View style={deviceDetailModalStyles.statusIndicator}>
                  <View style={[deviceDetailModalStyles.statusDot, device.isOn && deviceDetailModalStyles.statusDotActive]} />
                </View>
              </LinearGradient>
            </View>
            
            {/* Metrics Grid */}
            {device.type === 'socket' && (
              <View style={deviceDetailModalStyles.metricsGrid}>
                {renderMetricCard(
                  'Current Draw',
                  device.isOn ? device.current.toFixed(1) : '0.0',
                  'A',
                  '#10B981'
                )}
                {renderMetricCard(
                  'Power Usage',
                  device.isOn ? (device.current * 230).toFixed(0) : '0',
                  'W',
                  '#10B981'
                )}
                {/* {renderMetricCard(
                  'Daily Runtime',
                  '6.5',
                  'hrs',
                  '#10B981'
                )}
                {renderMetricCard(
                  'Efficiency',
                  '94',
                  '%',
                  '#10B981'
                )} */}
              </View>
            )}
            
            {/* Quick Stats */}
            <View style={deviceDetailModalStyles.quickStats}>
              <Text style={deviceDetailModalStyles.sectionTitle}>Quick Statistics</Text>
              <View style={deviceDetailModalStyles.statsContainer}>
                <View style={deviceDetailModalStyles.statItem}>
                  <Text style={deviceDetailModalStyles.statValue}>24</Text>
                  <Text style={deviceDetailModalStyles.statLabel}>Days Active</Text>
                </View>
                <View style={deviceDetailModalStyles.statDivider} />
                <View style={deviceDetailModalStyles.statItem}>
                  <Text style={deviceDetailModalStyles.statValue}>156</Text>
                  <Text style={deviceDetailModalStyles.statLabel}>Total Hours</Text>
                </View>
                <View style={deviceDetailModalStyles.statDivider} />
                <View style={deviceDetailModalStyles.statItem}>
                  <Text style={deviceDetailModalStyles.statValue}>2.4</Text>
                  <Text style={deviceDetailModalStyles.statLabel}>Avg Daily kWh</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          
          {/* Toggle Button */}
          <View style={deviceDetailModalStyles.modalFooter}>
            <TouchableOpacity 
              style={[deviceDetailModalStyles.toggleButton, device.isOn ? deviceDetailModalStyles.toggleOn : deviceDetailModalStyles.toggleOff]}
              onPress={onToggle}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={device.isOn ? ['#EF4444', '#DC2626'] : ['#10B981', '#059669']}
                style={deviceDetailModalStyles.toggleButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={deviceDetailModalStyles.buttonIcon}>
                  <Text style={deviceDetailModalStyles.toggleButtonIconText}>
                  {device.isOn ? '🔌' : '⚡'}
                  </Text>
                </View>
                <Text style={deviceDetailModalStyles.toggleButtonText}>
                  {device.isOn ? 'Turn Off Device' : 'Turn On Device'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

