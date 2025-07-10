import { StyleSheet } from "react-native";

export const deviceStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
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
      top: 300,
      left: -50,
      backgroundColor: 'rgba(34, 197, 94, 0.05)',
    },
    headerContainer: {
      paddingTop: 30,
      paddingHorizontal: 24,
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
    scrollView: {
      flex: 1,
      paddingHorizontal: 0,
    },
    scrollContent: {
      paddingVertical: 12,
      paddingBottom: 120,
    },
  });
  