import React from 'react';
import { View, Text } from 'react-native';
import { logComponentStyles } from '../../styles/componentsStyles/logComponentStyles';

export default function EmptyState(): React.ReactElement {
  return (
    <View style={logComponentStyles.emptyStateContainer}>
      <Text style={logComponentStyles.emptyStateIcon}>📋</Text>
      <Text style={logComponentStyles.emptyStateTitle}>No Logs Found</Text>
      <Text style={logComponentStyles.emptyStateMessage}>
        No activity logs match your current filters.{'\n'}
        Try adjusting your search criteria.
      </Text>
    </View>
  );
}