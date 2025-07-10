import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import { quickStatsStyles } from '../../styles/componentsStyles/quickStatsStyles';

// Mock data for quick stats
const statsData = [
  {
    id: '1',
    title: 'Devices Online',
    value: '24',
    unit: 'of 28',
    icon: 'hardware-chip',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: '2',
    title: 'Daily Alerts',
    value: '3',
    unit: 'today',
    icon: 'warning',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: '3',
    title: 'SMS Sent',
    value: '12',
    unit: 'today',
    icon: 'chatbubble',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: '4',
    title: 'Peak Current',
    value: '4.2',
    unit: 'kW',
    icon: 'flash',
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
];

interface StatCardProps {
  stat: {
    id: string;
    title: string;
    value: string;
    unit: string;
    icon: string;
    color: string;
    bgColor: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.8)', 'rgba(240,253,244,0.8)']}
      style={quickStatsStyles.statCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={quickStatsStyles.statHeader}>
        <View style={[quickStatsStyles.iconContainer, { backgroundColor: stat.bgColor }]}>
          <Ionicons name={stat.icon as any} size={18} color={stat.color} />
        </View>
        <Text style={quickStatsStyles.statTitle}>{stat.title}</Text>
      </View>
      
      <View style={quickStatsStyles.statContent}>
        <View style={quickStatsStyles.valueContainer}>
          <Text style={[quickStatsStyles.statValue, { color: stat.color }]}>{stat.value}</Text>
          <Text style={quickStatsStyles.statUnit}>{stat.unit}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default function QuickStats() {
  return (
    <View style={quickStatsStyles.container}>
      <View style={quickStatsStyles.header}>
        <Text style={quickStatsStyles.title}>Quick Stats</Text>
        <Text style={quickStatsStyles.subtitle}>System overview</Text>
      </View>
      
      <View style={quickStatsStyles.statsGrid}>
        <View style={quickStatsStyles.statsRow}>
          <StatCard stat={statsData[2]} />
          <StatCard stat={statsData[3]} />
        </View>
      </View>
    </View>
  );
}

