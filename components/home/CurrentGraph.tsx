import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Dimensions, Text, View } from "react-native";
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { currentGraphStyles } from '../../styles/componentsStyles/currentGraph';

const { width } = Dimensions.get('window');

export default function CurrentGraph() {
  // Mock data for ECG-style spikes (simulating electrical current spikes)
  const mockData = [0.2, 0.1, 0.3, 2.1, 0.1, 0.4, 0.2, 1.8, 0.1, 0.3, 2.3, 0.1, 0.2, 1.5, 0.1, 0.4, 0.2, 1.9, 0.1, 0.3];
  const maxValue = Math.max(...mockData);
  
  // Graph dimensions
  const graphWidth = width - 32 - 40 - 30; // screen width - margins - y-axis width
  const graphHeight = 120;
  
  // Create ECG-style sharp spike path
  const createPath = () => {
    const stepX = graphWidth / (mockData.length - 1);
    let path = '';
    
    mockData.forEach((value, index) => {
      const x = index * stepX;
      const y = graphHeight - (value / maxValue) * graphHeight;
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        // Create sharp lines for ECG-style spikes (no curves)
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };
  
  // Create area fill path
  const createAreaPath = () => {
    const linePath = createPath();
    const stepX = graphWidth / (mockData.length - 1);
    const lastX = (mockData.length - 1) * stepX;
    
    return `${linePath} L ${lastX} ${graphHeight} L 0 ${graphHeight} Z`;
  };

  return (
    <View style={currentGraphStyles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.98)', 'rgba(248,250,252,0.95)']}
        style={currentGraphStyles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={currentGraphStyles.header}>
          <View style={currentGraphStyles.titleSection}>
            <View style={currentGraphStyles.iconContainer}>
              <Ionicons name="flash" size={20} color="#059669" />
            </View>
            <View>
              <Text style={currentGraphStyles.title}>Live Current</Text>
              <Text style={currentGraphStyles.subtitle}>Real-time monitoring</Text>
            </View>
          </View>
          <View style={currentGraphStyles.valueContainer}>
            <Text style={currentGraphStyles.currentValue}>2.3</Text>
            <Text style={currentGraphStyles.unit}>kW</Text>
          </View>
        </View>
        
        <View style={currentGraphStyles.graphContainer}>
          <View style={currentGraphStyles.yAxisLabels}>
            <Text style={currentGraphStyles.axisLabel}>{maxValue.toFixed(1)}</Text>
            <Text style={currentGraphStyles.axisLabel}>{(maxValue * 0.5).toFixed(1)}</Text>
            <Text style={currentGraphStyles.axisLabel}>0.0</Text>
          </View>
          
          <View style={currentGraphStyles.chartArea}>
            <View style={currentGraphStyles.gridLines}>
              {[0, 1, 2].map((index) => (
                <View key={index} style={currentGraphStyles.gridLine} />
              ))}
            </View>
            
            <Svg width={graphWidth} height={graphHeight} style={currentGraphStyles.svgContainer}>
              <Defs>
                <SvgLinearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#059669" stopOpacity={0.08} />
                  <Stop offset="100%" stopColor="#059669" stopOpacity={0.01} />
                </SvgLinearGradient>
              </Defs>
              
              {/* Area fill */}
              <Path
                d={createAreaPath()}
                fill="url(#areaGradient)"
              />
              
              {/* Main ECG-style line */}
              <Path
                d={createPath()}
                stroke="#059669"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Add subtle glow effect for ECG monitor look */}
              <Path
                d={createPath()}
                stroke="#059669"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.15}
              />
              
              {/* Spike highlight points only on peaks */}
              {mockData.map((value, index) => {
                if (value > maxValue * 0.7) { // Only show circles on high spikes
                  const stepX = graphWidth / (mockData.length - 1);
                  const x = index * stepX;
                  const y = graphHeight - (value / maxValue) * graphHeight;
                  
                  return (
                    <Circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={2.5}
                      fill="#16A34A"
                      opacity={0.7}
                    />
                  );
                }
                return null;
              })}
            </Svg>
          </View>
        </View>
        
        <View style={currentGraphStyles.footer}>
          <View style={currentGraphStyles.statusContainer}>
            <View style={currentGraphStyles.statusDot} />
            <Text style={currentGraphStyles.statusText}>Live • Updated now</Text>
          </View>
          <Text style={currentGraphStyles.timeRange}>Last 12 hours</Text>
        </View>
        
        {/* Subtle decorative elements */}
        <View style={currentGraphStyles.decorativeCircle1} />
        <View style={currentGraphStyles.decorativeCircle2} />
      </LinearGradient>
    </View>
  );
}