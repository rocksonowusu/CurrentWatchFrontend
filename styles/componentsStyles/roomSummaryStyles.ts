import { StyleSheet } from "react-native";
export const roomSummaryStyles = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginBottom: 16,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: '#1F2937',
      letterSpacing: -0.3,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: '#6B7280',
      fontWeight: '500',
    },
    flatListContent: {
      gap: 12,
    },
    row: {
      gap: 12,
    },
    roomCard: {
      flex: 1,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 0.4)',
      //backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    roomHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    roomIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      //backgroundColor: 'rgba(16, 185, 129, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    roomInfo: {
      flex: 1,
    },
    roomName: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 2,
    },
    deviceCount: {
      fontSize: 12,
      color: '#6B7280',
      fontWeight: '500',
    },
    alertBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    roomStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    currentContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    currentValue: {
      fontSize: 18,
      fontWeight: '800',
      color: '#10B981',
      letterSpacing: -0.3,
    },
    currentUnit: {
      fontSize: 12,
      color: '#059669',
      fontWeight: '600',
      marginLeft: 2,
    },
    statusIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statusText: {
      fontSize: 11,
      fontWeight: '600',
    },
  });