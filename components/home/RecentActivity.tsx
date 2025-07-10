import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { recentActivityStyles } from '../../styles/componentsStyles/recentActivityStyles';

// Mock data for recent activities
const activitiesData = [
  {
    id: '1',
    type: 'alert',
    title: 'High current detected',
    description: 'Kitchen microwave exceeded 3.5kW',
    timestamp: '2 mins ago',
    icon: 'warning',
    iconColor: '#EF4444',
    iconBgColor: 'rgba(239, 68, 68, 0.1)',
  },
  {
    id: '2',
    type: 'device',
    title: 'Device disconnected',
    description: 'Living room smart TV went offline',
    timestamp: '5 mins ago',
    icon: 'power',
    iconColor: '#F59E0B',
    iconBgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: '3',
    type: 'notification',
    title: 'SMS alert sent',
    description: 'Notification sent to +233 24 123 4567',
    timestamp: '8 mins ago',
    icon: 'chatbubble',
    iconColor: '#3B82F6',
    iconBgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: '4',
    type: 'system',
    title: 'System backup completed',
    description: 'Daily data backup finished successfully',
    timestamp: '15 mins ago',
    icon: 'checkmark-circle',
    iconColor: '#10B981',
    iconBgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: '5',
    type: 'device',
    title: 'New device added',
    description: 'Bedroom air conditioner connected',
    timestamp: '1 hour ago',
    icon: 'add-circle',
    iconColor: '#10B981',
    iconBgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: '6',
    type: 'alert',
    title: 'Current spike resolved',
    description: 'Kitchen current back to normal levels',
    timestamp: '2 hours ago',
    icon: 'checkmark-circle',
    iconColor: '#10B981',
    iconBgColor: 'rgba(16, 185, 129, 0.1)',
  },
];

interface ActivityItemProps {
  activity: {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    icon: string;
    iconColor: string;
    iconBgColor: string;
  };
  isLast: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast }) => {
  return (
    <View style={recentActivityStyles.activityItem}>
      <View style={recentActivityStyles.activityContent}>
        <View style={[recentActivityStyles.activityIconContainer, { backgroundColor: activity.iconBgColor }]}>
          <Ionicons name={activity.icon as any} size={16} color={activity.iconColor} />
        </View>
        
        <View style={recentActivityStyles.activityDetails}>
          <View style={recentActivityStyles.activityHeader}>
            <Text style={recentActivityStyles.activityTitle}>{activity.title}</Text>
            <Text style={recentActivityStyles.activityTimestamp}>{activity.timestamp}</Text>
          </View>
          <Text style={recentActivityStyles.activityDescription}>{activity.description}</Text>
        </View>
      </View>
      
      {!isLast && <View style={recentActivityStyles.activityDivider} />}
    </View>
  );
};

export default function RecentActivity() {
  return (
    <View style={recentActivityStyles.container}>
      <View style={recentActivityStyles.header}>
        <Text style={recentActivityStyles.title}>Recent Activity</Text>
        <Text style={recentActivityStyles.subtitle}>Latest system events</Text>
      </View>
      
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(240,253,244,0.8)']}
        style={recentActivityStyles.activityCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          style={recentActivityStyles.scrollView}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {activitiesData.map((activity, index) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              isLast={index === activitiesData.length - 1}
            />
          ))}
        </ScrollView>
        
        <View style={recentActivityStyles.footer}>
          <Text style={recentActivityStyles.viewAllText}>View all activities</Text>
          <Ionicons name="chevron-forward" size={14} color="#10B981" />
        </View>
      </LinearGradient>
    </View>
  );
}

