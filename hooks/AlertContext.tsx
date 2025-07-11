import React, { createContext, useContext, useState, useCallback } from 'react';
import { Animated, Dimensions } from 'react-native';

export type AlertType = 'short_circuit' | 'overload' | 'device_off' | 'success' | 'warning' | 'error';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (alert: Omit<Alert, 'id'>) => void;
  hideAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((alertData: Omit<Alert, 'id'>) => {
    const id = Date.now().toString();
    const newAlert: Alert = {
      ...alertData,
      id,
      duration: alertData.duration || 5000,
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto-hide after duration
    setTimeout(() => {
      hideAlert(id);
    }, newAlert.duration);
  }, []);

  const hideAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, hideAlert, clearAllAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};