import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAlert } from '../../hooks/AlertContext';

export default function TestAlertButton() {
  const { showAlert } = useAlert();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        showAlert({
          type: 'short_circuit',
          title: 'Test Alert Triggered',
          message: 'This is a test alert to preview alert UI from Logs screen.',
        })
      }
    >
      <Text style={styles.text}>Trigger Test Alert</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 2,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
