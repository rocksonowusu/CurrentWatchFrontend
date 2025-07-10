import { Platform, StyleSheet } from "react-native";
export const tabNavigatorStyles = StyleSheet.create({
    background: {
      flex: 1,
    },
    tabBar: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 25 : 20,
      left: 16,
      right: 16,
      height: Platform.OS === 'ios' ? 88 : 70,
      borderRadius: 24,
      borderTopWidth: 0,
      marginHorizontal: 25,

      elevation: 12,
      shadowColor: '#059669',
      shadowOffset: { 
        width: 0, 
        height: Platform.OS === 'ios' ? -6 : -4 
      },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      paddingBottom: Platform.OS === 'ios' ? 20 : 8,
      paddingTop: 8,
      backgroundColor: 'transparent',
    },
    tabBarBackground: {
      flex: 1,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 0.3)',
      backdropFilter: 'blur(20px)',
    },
    tabItem: {
      paddingVertical: 4,
      borderRadius: 16,
      marginHorizontal: 2,
    },
    tabLabel: {
      fontSize: 11,
      fontWeight: '600',
      marginTop: 2,
      textAlign: 'center',
    },
  });