import { Stack } from "expo-router";
import { AlertProvider } from '../hooks/AlertContext';
import AlertNotification from '../components/alerts/AlertNotification';

export default function RootLayout() {
  return (
    <AlertProvider>
      <AlertNotification />
      <Stack
        screenOptions={{
          headerShown: false, 
        }}
      />
    </AlertProvider>
  );
}