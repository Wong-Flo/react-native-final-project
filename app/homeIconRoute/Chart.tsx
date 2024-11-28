import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import styles from '../styles/styles';

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
  const [chartData, setChartData] = useState<any[]>([]); // Chart data state
  const [loading, setLoading] = useState(true);

  // Fetch expenses and process data
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch('/api/expenses'); // Replace with your actual API endpoint
        const data = await response.json();

        if (data && data.expenses) {
          // Aggregate data for charts
          const aggregatedData = aggregateDataByMonth(data.expenses);
          setChartData(aggregatedData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, []);

  // Function to aggregate data by month for the charts
  const aggregateDataByMonth = (expenses: any[]) => {
    const monthlyTotals: { [key: number]: number } = {};

    // Aggregate data by numerical month (0 for Jan, 11 for Dec)
    expenses.forEach((expense) => {
      const date = new Date(expense.createdAt);
      const monthIndex = date.getMonth(); // Get numerical month (0-11)
      monthlyTotals[monthIndex] =
        (monthlyTotals[monthIndex] || 0) + parseFloat(expense.price);
    });

    // Map of month index to short month names
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthColors = [
      '#FF6347', // Tomato (Red-Orange)
      '#FFA07A', // Light Salmon
      '#FFD700', // Gold
      '#9ACD32', // Yellow Green
      '#32CD32', // Lime Green
      '#4682B4', // Steel Blue
      '#87CEEB', // Sky Blue
      '#6A5ACD', // Slate Blue
      '#8A2BE2', // Blue Violet
      '#DA70D6', // Orchid
      '#FFB6C1', // Light Pink
      '#D2691E', // Chocolate
    ];

    return Object.entries(monthlyTotals)
      .map(([monthIndex, total]) => ({
        value: total,
        label: monthNames[Number(monthIndex)],
        frontColor: monthColors[Number(monthIndex) % 12], // Assign color based on month index
        text: monthNames[Number(monthIndex)],
      }))
      .sort((a, b) => Number(a.label) - Number(b.label)); // Sort by numerical month index
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { width, height } = Dimensions.get('window');
  const isLandscape = width > height;
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            paddingBottom: 15,
            paddingTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        Charts
      </Text>
      {/* Tab bar */}
      <View style={styles.chartTabContainer}>
        <TabButton
          title="Bar Chart"
          chartType="Bar"
          selectedChart={selectedChart}
          iconName="chart-column"
          onPress={() => setSelectedChart('Bar')}
        />
        <TabButton
          title="Line Chart"
          chartType="Line"
          selectedChart={selectedChart}
          iconName="chart-line"
          onPress={() => setSelectedChart('Line')}
        />
      </View>

      {/* Render selected chart */}
      <View style={styles.chartContainer}>
        {selectedChart === 'Bar' && (
          <BarChart
            data={chartData}
            width={isLandscape ? width * 0.8 : width * 0.9}
            height={isLandscape ? height * 0.4 : height * 0.5}
          />
        )}
        {selectedChart === 'Line' && (
          <LineChart
            data={chartData}
            width={isLandscape ? width * 0.8 : width * 0.9}
            height={isLandscape ? height * 0.4 : height * 0.5}
          />
        )}
      </View>
    </View>
  );
}
