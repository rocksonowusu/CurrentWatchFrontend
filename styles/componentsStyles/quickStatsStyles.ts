import { StyleSheet } from "react-native";
export const quickStatsStyles = StyleSheet.create({
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
    statsGrid: {
      gap: 12,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 12,
    },
    statCard: {
      flex: 1,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    statTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: '#6B7280',
      flex: 1,
    },
    statContent: {
      alignItems: 'flex-start',
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '900',
      letterSpacing: -0.5,
    },
    statUnit: {
      fontSize: 12,
      color: '#9CA3AF',
      fontWeight: '600',
      marginLeft: 4,
    },
  });