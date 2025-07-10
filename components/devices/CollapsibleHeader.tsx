// CollapsibleHeader.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CollapsibleHeaderProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  deviceCount?: number;
  showExpandIcon?: boolean;
}

export default function CollapsibleHeader({ 
  title, 
  expanded, 
  onToggle, 
  deviceCount = 0,
  showExpandIcon = true
}: CollapsibleHeaderProps) {
  return (
    <TouchableOpacity 
      style={styles.header} 
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.roomTitle}>{title}</Text>
          <Text style={styles.deviceCount}>
            {deviceCount} device{deviceCount !== 1 ? 's' : ''}
          </Text>
        </View>
        {showExpandIcon && (
          <View style={styles.expandIcon}>
            <Text style={styles.expandText}>
              {expanded ? '−' : '+'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.3,
  },
  deviceCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});