// components/logs/LogFilter.tsx
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import { logComponentStyles } from '../../styles/componentsStyles/logComponentStyles';
import { DateFilterType, FilterType } from '../../types/logs';

interface LogFilterProps {
  selectedRoom: string;
  selectedType: FilterType;
  selectedDate: DateFilterType;
  availableRooms: string[];
  onRoomChange: (room: string) => void;
  onTypeChange: (type: FilterType) => void;
  onDateChange: (date: DateFilterType) => void;
}

interface DropdownState {
  room: boolean;
  type: boolean;
  date: boolean;
}

export default function LogFilter({
  selectedRoom,
  selectedType,
  selectedDate,
  availableRooms,
  onRoomChange,
  onTypeChange,
  onDateChange
}: LogFilterProps): React.ReactElement {
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    room: false,
    type: false,
    date: false
  });

  const logTypes: FilterType[] = ['All', 'error', 'warning', 'info'];
  const dateOptions: DateFilterType[] = ['All', 'Today', 'Yesterday', 'Last 7 Days'];

  const closeAllDropdowns = () => {
    setDropdownOpen({ room: false, type: false, date: false });
  };

  const toggleDropdown = (type: keyof DropdownState) => {
    setDropdownOpen(prev => ({
      room: false,
      type: false,
      date: false,
      [type]: !prev[type]
    }));
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#10B981';
      default: return '#10B981';
    }
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'error': return '🔴';
      case 'warning': return '🟡';
      case 'info': return '🟢';
      default: return '📋';
    }
  };

  const renderDropdown = (
    title: string,
    options: string[],
    selectedValue: string,
    onSelect: (value: any) => void,
    isOpen: boolean,
    onToggle: () => void,
    showIcons?: boolean
  ) => (
    <View style={logComponentStyles.dropdownContainer}>
      <Text style={logComponentStyles.dropdownLabel}>{title}</Text>
      <TouchableOpacity
        style={[
          logComponentStyles.dropdownButton,
          isOpen && logComponentStyles.dropdownButtonOpen
        ]}
        onPress={onToggle}
      >
        <View style={logComponentStyles.dropdownButtonContent}>
          {showIcons && (
            <Text style={logComponentStyles.dropdownIcon}>
              {getTypeIcon(selectedValue)}
            </Text>
          )}
          <Text style={logComponentStyles.dropdownButtonText}>
            {selectedValue}
          </Text>
        </View>
        <Text style={[
          logComponentStyles.dropdownArrow,
          isOpen && logComponentStyles.dropdownArrowOpen
        ]}>
          ▼
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeAllDropdowns}
      >
        <TouchableOpacity
          style={logComponentStyles.dropdownOverlay}
          activeOpacity={1}
          onPress={closeAllDropdowns}
        >
          <View style={logComponentStyles.dropdownModal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    logComponentStyles.dropdownOption,
                    selectedValue === item && logComponentStyles.dropdownOptionSelected
                  ]}
                  onPress={() => {
                    onSelect(item);
                    closeAllDropdowns();
                  }}
                >
                  <View style={logComponentStyles.dropdownOptionContent}>
                    {showIcons && (
                      <Text style={logComponentStyles.dropdownOptionIcon}>
                        {getTypeIcon(item)}
                      </Text>
                    )}
                    <Text style={[
                      logComponentStyles.dropdownOptionText,
                      selectedValue === item && logComponentStyles.dropdownOptionTextSelected
                    ]}>
                      {item}
                    </Text>
                  </View>
                  {selectedValue === item && (
                    <Text style={logComponentStyles.dropdownCheckmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  return (
    <View style={logComponentStyles.filterContainer}>
      <Text style={logComponentStyles.filterTitle}>Filters</Text>
      
      <View style={logComponentStyles.dropdownGrid}>
        {renderDropdown(
          'Room',
          availableRooms,
          selectedRoom,
          onRoomChange,
          dropdownOpen.room,
          () => toggleDropdown('room')
        )}
        
        {renderDropdown(
          'Type',
          logTypes,
          selectedType,
          onTypeChange,
          dropdownOpen.type,
          () => toggleDropdown('type'),
          true
        )}
        
        {renderDropdown(
          'Date',
          dateOptions,
          selectedDate,
          onDateChange,
          dropdownOpen.date,
          () => toggleDropdown('date')
        )}
      </View>
    </View>
  );
}