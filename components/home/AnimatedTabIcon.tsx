// components/AnimatedTabIcon.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface AnimatedTabIconProps {
  name: string;
  outlineName: string;
  color: string;
  focused: boolean;
  size?: number;
}

export const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  name,
  outlineName,
  color,
  focused,
  size = 24,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, scaleValue, backgroundOpacity]);

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        transform: [{ scale: scaleValue }],
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 20,
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          opacity: backgroundOpacity,
          borderWidth: 1,
          borderColor: 'rgba(5, 150, 105, 0.2)',
        }}
      />
      <Ionicons
        name={focused ? (name as React.ComponentProps<typeof Ionicons>['name']) : (outlineName as React.ComponentProps<typeof Ionicons>['name'])}
        size={size}
        color={color}
      />
    </Animated.View>
  );
};

// Usage in your _layout.tsx file:
/*
import { AnimatedTabIcon } from '../../components/AnimatedTabIcon';

// Replace the tabBarIcon in each Tabs.Screen with:
tabBarIcon: ({ color, focused }) => (
  <AnimatedTabIcon
    name="home"
    outlineName="home-outline"
    color={color}
    focused={focused}
  />
),
*/