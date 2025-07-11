import { StyleSheet } from "react-native";

export const socketCardStyles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      marginVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardOn: {
      borderColor: 'rgba(16, 185, 129, 0.3)',
      elevation: 4,
      shadowOpacity: 0.15,
    },
    cardOff: {
      borderColor: 'rgba(107, 114, 128, 0.2)',
    },
    cardContent: {
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    deviceInfo: {
      alignItems: 'flex-start',
    },
    deviceName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
      marginBottom: 8,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    statusOnContainer: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    statusOffContainer: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    statusDotOn: {
      backgroundColor: '#10B981',
    },
    statusDotOff: {
      backgroundColor: '#6B7280',
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
    gaugeContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    gaugeWrapper: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gauge: {
      // No additional transform needed
    },
    gaugeCenterContent: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: 35, // Adjust to center in the semi-circle
    },
    currentValue: {
      fontSize: 24,
      fontWeight: '700',
    },
    currentActive: {
      color: '#1F2937',
    },
    currentInactive: {
      color: '#9CA3AF',
    },
    indicatorsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: -10,
    },
    leftIndicator: {
      alignItems: 'center',
    },
    rightIndicator: {
      alignItems: 'center',
    },
    waveIcon: {
      marginBottom: 4,
    },
    waveText: {
      fontSize: 16,
    },
    indicatorValue: {
      fontSize: 12,
      fontWeight: '600',
      color: '#374151',
    },
    indicatorLabel: {
      fontSize: 10,
      color: '#6B7280',
      marginTop: 2,
    },
    centerLabelContainer: {
      alignItems: 'center',
      marginVertical: 15,
    },
    amperageLabel: {
      fontSize: 12,
      color: '#6B7280',
      fontWeight: '500',
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(107, 114, 128, 0.1)',
    },
    powerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    powerLabel: {
      fontSize: 16,
      color: '#6B7280',
      fontWeight: '500',
      marginRight: 8,
    },
    powerValue: {
      fontSize: 18,
      fontWeight: '700',
    },
    toggleContainer: {
      // This container helps prevent event bubbling
    },
  });