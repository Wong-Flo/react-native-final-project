import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import styles from '../styles/styles';

const chartData = [
  { value: 150, label: 'Jan', frontColor: '#ff6347', text: 'Jan' },
  { value: 200, label: 'Feb', frontColor: '#ffa500', text: 'Feb' },
  { value: 400, label: 'Mar', frontColor: '#4682b4', text: 'Mar' },
  { value: 250, label: 'Apr', frontColor: '#32cd32', text: 'Apr' },
  { value: 200, label: 'May', frontColor: '#9370db', text: 'May' },
];

// TabButton component updated to include FontAwesome icons and align icon and text in a row
const TabButton = ({
  title,
  chartType,
  selectedChart,
  iconName,
  onPress,
}: {
  title: string;
  chartType: string;
  selectedChart: string;
  iconName: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.chartTabButton,
      selectedChart === chartType && styles.chartActiveTabButton, // Highlight selected tab
    ]}
    onPress={onPress}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome6
        name={iconName}
        size={20}
        color={selectedChart === chartType ? 'black' : 'white'}
        style={{ marginRight: 8 }}
      />
      <Text
        style={[
          styles.chartTabButtonText,
          selectedChart === chartType && { color: 'black' }, // Change text color when selected
        ]}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ChartScreen() {
  const [selectedChart, setSelectedChart] = useState('Bar'); // State to track selected chart

  return (
    <View style={styles.container}>
      {/* Tab bar */}
      <View style={styles.chartTabContainer}>
        <TabButton
          title="Bar Chart"
          chartType="Bar"
          selectedChart={selectedChart}
          iconName="chart-column" // FontAwesome6 icon for bar chart
          onPress={() => setSelectedChart('Bar')}
        />
        <TabButton
          title="Line Chart"
          chartType="Line"
          selectedChart={selectedChart}
          iconName="chart-line" // FontAwesome6 icon for line chart
          onPress={() => setSelectedChart('Line')}
        />
        <TabButton
          title="Pie Chart"
          chartType="Pie"
          selectedChart={selectedChart}
          iconName="chart-pie" // FontAwesome6 icon for pie chart
          onPress={() => setSelectedChart('Pie')}
        />
      </View>

      {/* Render selected chart */}
      <View style={styles.chartContainer}>
        {selectedChart === 'Bar' && <BarChart data={chartData} />}
        {selectedChart === 'Line' && <LineChart data={chartData} />}
        {selectedChart === 'Pie' && (
          <PieChart data={chartData} donut showText textColor="black" />
        )}
      </View>
    </View>
  );
}
