import { StyleSheet } from "react-native";
export const recentActivityStyles = StyleSheet.create({
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
    activityCard: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      maxHeight: 300,
    },
    scrollView: {
      maxHeight: 240,
    },
    activityItem: {
      paddingHorizontal: 16,
    },
    activityContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 12,
    },
    activityIconContainer: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      marginTop: 2,
    },
    activityDetails: {
      flex: 1,
    },
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    activityTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1F2937',
      flex: 1,
      marginRight: 8,
    },
    activityTimestamp: {
      fontSize: 11,
      color: '#9CA3AF',
      fontWeight: '500',
    },
    activityDescription: {
      fontSize: 12,
      color: '#6B7280',
      fontWeight: '500',
      lineHeight: 16,
    },
    activityDivider: {
      height: 1,
      backgroundColor: 'rgba(229, 231, 235, 0.3)',
      marginLeft: 40,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(229, 231, 235, 0.3)',
    },
    viewAllText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#10B981',
      marginRight: 4,
    },
  });