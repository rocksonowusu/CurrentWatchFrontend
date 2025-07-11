// LogsScreen.tsx
import React, { useState, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogSummary from '../../components/logs/LogSummary';
import LogFilter from '../../components/logs/LogFilter';
import LogsList from '../../components/logs/LogList';
import EmptyState from '../../components/logs/EmptyState';
import { Log, FilterType, DateFilterType } from '../../types/logs';
import { logsStyles } from '../../styles/screens_css/logsstyles';
import TestAlertButton from '../../components/logs/TestAlertButton'
// Sample log data
const SAMPLE_LOGS: Log[] = [
  {
    id: '1',
    timestamp: new Date('2024-12-15T10:30:00'),
    type: 'error',
    message: 'Socket turned off due to overload',
    room: 'Living Room',
    details: 'Power consumption exceeded 15A limit'
  },
  {
    id: '2',
    timestamp: new Date('2024-12-15T09:15:00'),
    type: 'info',
    message: 'Device manually turned on',
    room: 'Kitchen',
    details: 'Smart plug activated via app'
  },
  {
    id: '3',
    timestamp: new Date('2024-12-15T08:45:00'),
    type: 'warning',
    message: 'SMS alert sent',
    room: null,
    details: 'Overload notification sent to +1234567890'
  },
  {
    id: '4',
    timestamp: new Date('2024-12-14T22:30:00'),
    type: 'info',
    message: 'System restart completed',
    room: null,
    details: 'Automatic system maintenance'
  },
  {
    id: '5',
    timestamp: new Date('2024-12-14T20:15:00'),
    type: 'error',
    message: 'Device connection lost',
    room: 'Bedroom',
    details: 'WiFi connectivity issue detected'
  },
  {
    id: '6',
    timestamp: new Date('2024-12-14T18:00:00'),
    type: 'info',
    message: 'Scheduled toggle executed',
    room: 'Garage',
    details: 'Timer-based device activation'
  }
];

export default function LogsScreen(): React.ReactElement {
  const [selectedRoom, setSelectedRoom] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<FilterType>('All');
  const [selectedDate, setSelectedDate] = useState<DateFilterType>('All');

  // Filter logs based on selected filters
  const filteredLogs = useMemo((): Log[] => {
    return SAMPLE_LOGS.filter(log => {
      const roomMatch = selectedRoom === 'All' || log.room === selectedRoom;
      const typeMatch = selectedType === 'All' || log.type === selectedType;
      
      let dateMatch = true;
      if (selectedDate !== 'All') {
        const today = new Date();
        const logDate = new Date(log.timestamp);
        
        if (selectedDate === 'Today') {
          dateMatch = logDate.toDateString() === today.toDateString();
        } else if (selectedDate === 'Yesterday') {
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          dateMatch = logDate.toDateString() === yesterday.toDateString();
        } else if (selectedDate === 'Last 7 Days') {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          dateMatch = logDate >= weekAgo;
        }
      }
      
      return roomMatch && typeMatch && dateMatch;
    });
  }, [selectedRoom, selectedType, selectedDate]);

  // Calculate summary data for today's logs
  const summaryData = useMemo(() => {
    const today = new Date();
    const todayLogs = SAMPLE_LOGS.filter(log => 
      new Date(log.timestamp).toDateString() === today.toDateString()
    );

    return {
      totalLogs: todayLogs.length,
      errorCount: todayLogs.filter(log => log.type === 'error').length,
      warningCount: todayLogs.filter(log => log.type === 'warning').length,
      infoCount: todayLogs.filter(log => log.type === 'info').length,
      togglesCount: todayLogs.filter(log => 
        log.message.toLowerCase().includes('toggle') || 
        log.message.toLowerCase().includes('turned')
      ).length,
      smsCount: todayLogs.filter(log => 
        log.message.toLowerCase().includes('sms') || 
        log.message.toLowerCase().includes('alert sent')
      ).length,
    };
  }, []);

  // Get unique rooms for filter
  const availableRooms = useMemo((): string[] => {
    const rooms = SAMPLE_LOGS
      .map(log => log.room)
      .filter((room): room is string => room !== null);
    return ['All', ...Array.from(new Set(rooms))];
  }, []);

  return (
    <View style={logsStyles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={logsStyles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background decorative circles */}
        <View style={logsStyles.backgroundCircles}>
          <View style={[logsStyles.circle, logsStyles.circle1]} />
          <View style={[logsStyles.circle, logsStyles.circle2]} />
          <View style={[logsStyles.circle, logsStyles.circle3]} />
        </View>

        <SafeAreaView style={logsStyles.safeArea}>
          <ScrollView 
            style={logsStyles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={logsStyles.scrollContent}
          >
           
            <LogSummary data={summaryData} />
            <TestAlertButton />
            <LogFilter
              selectedRoom={selectedRoom}
              selectedType={selectedType}
              selectedDate={selectedDate}
              availableRooms={availableRooms}
              onRoomChange={setSelectedRoom}
              onTypeChange={setSelectedType}
              onDateChange={setSelectedDate}
            />

            {filteredLogs.length > 0 ? (
              <LogsList logs={filteredLogs} />
            ) : (
              <EmptyState />
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
