import { StyleSheet } from "react-native";

export const lightfanCardStyles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      marginVertical: 6,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
    },
    cardOn: {
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    cardOff: {
      borderColor: 'rgba(107, 114, 128, 0.2)',
    },
    cardContent: {
      padding: 16,
    },
    deviceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainerOn: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    iconContainerOff: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
    },
    deviceIcon: {
      fontSize: 24,
    },
    deviceInfo: {
      flex: 1,
      marginLeft: 16,
    },
    deviceName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 2,
    },
    deviceType: {
      fontSize: 13,
      color: '#6B7280',
      fontWeight: '500',
      marginBottom: 2,
    },
    powerDetail: {
      fontSize: 13,
      color: '#10B981',
      fontWeight: '600',
    },
    statusSection: {
      alignItems: 'flex-end',
    },
    statusIndicator: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    statusOn: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    statusOff: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    statusTextOn: {
      color: '#10B981',
    },
    statusTextOff: {
      color: '#6B7280',
    },
  });