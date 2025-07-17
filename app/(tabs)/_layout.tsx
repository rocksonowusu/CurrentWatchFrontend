// app/tabs/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { tabNavigatorStyles } from '../../styles/screens_css/tabNavigatorStyles';


export default function TabsLayout() {
  return (
    // <LinearGradient
    //   colors={['#FFFFFF', '#F0FDF4', '#FFFFFF']}
    //   style={tabNavigatorStyles.background}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#059669',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: tabNavigatorStyles.tabBar,
          tabBarLabelStyle: tabNavigatorStyles.tabLabel,
          tabBarItemStyle: tabNavigatorStyles.tabItem,
          tabBarBackground: () => (
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(240,253,244,0.95)']}
              style={tabNavigatorStyles.tabBarBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="devices"
          options={{
            title: 'Devices',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'hardware-chip' : 'hardware-chip-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="logs"
          options={{
            title: 'Logs',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'document-text' : 'document-text-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? 'settings' : 'settings-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    // </LinearGradient>
  );
}

