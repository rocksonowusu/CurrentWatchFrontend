import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const logsStyles = StyleSheet.create({
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
    paddingBottom: 100,
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
});
