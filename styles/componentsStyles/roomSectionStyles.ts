import { StyleSheet } from "react-native";

export const roomSectionStyles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 1,
      borderWidth: 1,
      borderColor: '#F3F4F6',
    },
    
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    
    roomInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    
    titleSection: {
      flex: 1,
    },
    
    roomTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1F2937',
      marginBottom: 2,
    },
    
    deviceCount: {
      fontSize: 14,
      fontWeight: '500',
      color: '#6B7280',
    },
    
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    
    currentBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      gap: 4,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    
    currentText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1F2937',
    },
    
    activitySection: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: '#F9FAFB',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E5E7EB',
    },
    
    activityInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    
    statusIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    
    statusText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
    },
    
    activityPercentage: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1F2937',
    },
    
    activityBarContainer: {
      height: 8,
      backgroundColor: '#E5E7EB',
      borderRadius: 4,
      overflow: 'hidden',
    },
    
    activityBarBackground: {
      flex: 1,
      backgroundColor: '#E5E7EB',
      borderRadius: 4,
    },
    
    activityBarFill: {
      height: '100%',
      borderRadius: 4,
    },
    
  
  });