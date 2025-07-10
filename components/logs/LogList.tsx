import React from 'react';
import { Text, View } from 'react-native';
import { logComponentStyles } from '../../styles/componentsStyles/logComponentStyles';
import { Log } from '../../types/logs';
import LogItem from './LogItem';

interface LogsListProps {
  logs: Log[];
}

interface GroupedLogs {
  [key: string]: Log[];
}

export default function LogsList({ logs }: LogsListProps): React.ReactElement {
  // Group logs by date
  const groupedLogs: GroupedLogs = logs.reduce((groups, log) => {
    const logDate = new Date(log.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let dateKey: string;
    if (logDate.toDateString() === today.toDateString()) {
      dateKey = 'Today';
    } else if (logDate.toDateString() === yesterday.toDateString()) {
      dateKey = 'Yesterday';
    } else {
      dateKey = logDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(log);
    return groups;
  }, {} as GroupedLogs);

  // Sort groups by date (most recent first)
  const sortedDateKeys = Object.keys(groupedLogs).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <View style={logComponentStyles.logsListContainer}>
      {sortedDateKeys.map((dateKey) => (
        <View key={dateKey} style={logComponentStyles.logGroup}>
          <Text style={logComponentStyles.logGroupTitle}>{dateKey}</Text>
          {groupedLogs[dateKey]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
        </View>
      ))}
    </View>
  );
}