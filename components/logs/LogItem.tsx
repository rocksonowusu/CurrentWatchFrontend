import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logComponentStyles } from '../../styles/componentsStyles/logComponentStyles';
import { Log } from '../../types/logs';

interface LogItemProps {
  log: Log;
}

export default function LogItem({ log }: LogItemProps): React.ReactElement {
  const getLogIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      case 'success': return 'checkmark-circle';
      case 'debug': return 'bug';
      case 'sms': return 'chatbubble-ellipses';
      case 'toggle': return 'toggle';
      default: return 'document-text';
    }
  };

  const getLogColor = (type: string): string => {
    switch (type) {
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#10B981';
      case 'success': return '#22C55E';
      case 'debug': return '#8B5CF6';
      case 'sms': return '#3B82F6';
      case 'toggle': return '#F97316';
      default: return '#6B7280';
    }
  };

  const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <TouchableOpacity style={logComponentStyles.logItem}>
      <View style={logComponentStyles.logItemHeader}>
        <View style={logComponentStyles.logItemLeft}>
          <View style={[
            logComponentStyles.logIconContainer,
            { backgroundColor: getLogColor(log.type) + '15' }
          ]}>
            <Ionicons 
              name={getLogIcon(log.type)} 
              size={18} 
              color={getLogColor(log.type)} 
            />
          </View>
          
          <View style={logComponentStyles.logContent}>
            <Text style={logComponentStyles.logMessage}>{log.message}</Text>
            <View style={logComponentStyles.logMeta}>
              <Text style={logComponentStyles.logTime}>
                {formatTime(log.timestamp)}
              </Text>
              {log.room && (
                <>
                  <Text style={logComponentStyles.logMetaSeparator}>•</Text>
                  <View style={logComponentStyles.roomTag}>
                    <Text style={logComponentStyles.roomTagText}>{log.room}</Text>
                  </View>
                </>
              )}
            </View>
            {log.details && (
              <Text style={logComponentStyles.logDetails}>{log.details}</Text>
            )}
          </View>
        </View>

        <View style={[
          logComponentStyles.logTypeIndicator,
          { backgroundColor: getLogColor(log.type) }
        ]} />
      </View>
    </TouchableOpacity>
  );
}