import React from 'react';
import { Text, View } from 'react-native';
import { logComponentStyles } from '../../styles/componentsStyles/logComponentStyles';
import { LogSummaryData } from '../../types/logs';

interface LogSummaryProps {
  data: LogSummaryData;
}

export default function LogSummary({ data }: LogSummaryProps): React.ReactElement {
  const criticalStats = [
    {
      title: 'Errors',
      value: data.errorCount,
      icon: '🔴',
      color: '#EF4444'
    },
    {
      title: 'Warnings',
      value: data.warningCount,
      icon: '🟡',
      color: '#F59E0B'
    }
  ];

  const otherStats = [
    { label: 'Info', value: data.infoCount },
    { label: 'Toggles', value: data.togglesCount },
    { label: 'SMS Sent', value: data.smsCount }
  ];

  return (
    <View style={logComponentStyles.summaryContainer}>
      {/* Main Header */}
      <View style={logComponentStyles.summaryHeader}>
        <View>
          <Text style={logComponentStyles.summaryTitle}>Today's Activity</Text>
          <Text style={logComponentStyles.summarySubtitle}>
            {data.totalLogs} total logs
          </Text>
        </View>
        <View style={logComponentStyles.summaryBadge}>
          <Text style={logComponentStyles.summaryBadgeText}>
            {data.errorCount + data.warningCount > 0 ? 'Issues Found' : 'All Good'}
          </Text>
        </View>
      </View>

      {/* Critical Issues */}
      {(data.errorCount > 0 || data.warningCount > 0) && (
        <View style={logComponentStyles.criticalSection}>
          <Text style={logComponentStyles.criticalTitle}>Critical Issues</Text>
          <View style={logComponentStyles.criticalGrid}>
            {criticalStats.map((stat, index) => (
              stat.value > 0 && (
                <View key={index} style={logComponentStyles.criticalCard}>
                  <Text style={logComponentStyles.criticalIcon}>{stat.icon}</Text>
                  <View style={logComponentStyles.criticalContent}>
                    <Text style={[logComponentStyles.criticalValue, { color: stat.color }]}>
                      {stat.value}
                    </Text>
                    <Text style={logComponentStyles.criticalLabel}>{stat.title}</Text>
                  </View>
                </View>
              )
            ))}
          </View>
        </View>
      )}

      {/* Other Stats - Compact Row */}
      <View style={logComponentStyles.statsRow}>
        {otherStats.map((stat, index) => (
          <View key={index} style={logComponentStyles.statItem}>
            <Text style={logComponentStyles.statValue}>{stat.value}</Text>
            <Text style={logComponentStyles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}