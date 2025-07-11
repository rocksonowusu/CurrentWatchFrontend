import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { Alert, AlertType, useAlert } from '../../hooks/AlertContext';
import { alertNotificationStyle } from '../../styles/componentsStyles/alertNotificationStyle';
import { SafeAreaView } from 'react-native-safe-area-context'

const { width: screenWidth } = Dimensions.get('window');

const getIconForType = (type: AlertType) => {
  switch (type) {
    case 'short_circuit':
      return { name: 'flash', color: '#FF3B30' };
    case 'overload':
      return { name: 'warning', color: '#FF9500' };
    case 'device_off':
      return { name: 'power', color: '#8E8E93' };
    case 'success':
      return { name: 'checkmark-circle', color: '#34C759' };
    case 'warning':
      return { name: 'alert-circle', color: '#FFCC00' };
    case 'error':
      return { name: 'close-circle', color: '#FF3B30' };
    default:
      return { name: 'information-circle', color: '#007AFF' };
  }
};

const AlertNotification: React.FC = () => {
  const { alerts, hideAlert } = useAlert();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={alertNotificationStyle.container} pointerEvents="box-none">
      {alerts.map((alert:any) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onDismiss={hideAlert}
          isDark={isDark}
        />
      ))}
    </SafeAreaView>
  );
};

interface AlertItemProps {
  alert: Alert;
  onDismiss: (id: string) => void;
  isDark: boolean;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert, onDismiss, isDark }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const iconData = getIconForType(alert.type);

  useEffect(() => {
    // Slide down animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(alert.id);
    });
  };

  const getAlertStyles = (type: AlertType) => {
    const baseStyles = {
      borderLeftWidth: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    };

    switch (type) {
      case 'short_circuit':
        return {
          ...baseStyles,
          borderLeftColor: '#FF3B30',
          backgroundColor: isDark ? '#2C1B1B' : '#FFF5F5',
        };
      case 'overload':
        return {
          ...baseStyles,
          borderLeftColor: '#FF9500',
          backgroundColor: isDark ? '#2C2319' : '#FFFBF0',
        };
      case 'device_off':
        return {
          ...baseStyles,
          borderLeftColor: '#8E8E93',
          backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7',
        };
      case 'success':
        return {
          ...baseStyles,
          borderLeftColor: '#34C759',
          backgroundColor: isDark ? '#1B2C1B' : '#F0FFF4',
        };
      case 'warning':
        return {
          ...baseStyles,
          borderLeftColor: '#FFCC00',
          backgroundColor: isDark ? '#2C2B19' : '#FFFEF0',
        };
      case 'error':
        return {
          ...baseStyles,
          borderLeftColor: '#FF3B30',
          backgroundColor: isDark ? '#2C1B1B' : '#FFF5F5',
        };
      default:
        return {
          ...baseStyles,
          borderLeftColor: '#007AFF',
          backgroundColor: isDark ? '#1B1F2C' : '#F0F8FF',
        };
    }
  };

  return (
    <Animated.View
      style={[
        alertNotificationStyle.alertContainer,
        getAlertStyles(alert.type),
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={alertNotificationStyle.alertContent}
        onPress={handleDismiss}
        activeOpacity={0.8}
      >
        <View style={alertNotificationStyle.alertHeader}>
          <View style={alertNotificationStyle.iconContainer}>
            <Ionicons 
              name={iconData.name as any} 
              size={24} 
              color={iconData.color}
            />
          </View>
          <View style={alertNotificationStyle.alertTextContainer}>
            <Text style={[alertNotificationStyle.alertTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              {alert.title}
            </Text>
            <Text style={[alertNotificationStyle.alertMessage, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {alert.message}
            </Text>
          </View>
          <TouchableOpacity
            style={alertNotificationStyle.closeButton}
            onPress={handleDismiss}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name="close" 
              size={20} 
              color={isDark ? '#CCCCCC' : '#666666'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};



export default AlertNotification;