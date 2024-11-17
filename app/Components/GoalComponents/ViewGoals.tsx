import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';

export default function ViewGoals() {
  const [goals, setGoals] = useState<any[]>([]);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      const result = await response.json();

      if (response.ok) {
        setGoals(result.goals);
      } else {
        Alert.alert('Error', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      Alert.alert('Error', 'Failed to fetch goals');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <View>
      <FlatList
        data={goals}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.goal}</Text>
            <Text>{item.goal_amount}</Text>
          </View>
        )}
      />
    </View>
  );
}
