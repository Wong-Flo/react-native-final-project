import React from 'react';
import { Alert, Button } from 'react-native';

export default function DeleteGoal({ goalId }: { goalId: number }) {
  const handleDeleteGoal = async () => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Goal deleted: ${result.goal.goal}`);
      } else {
        Alert.alert('Error', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      Alert.alert('Error', 'Failed to delete goal');
    }
  };

  return <Button title="Delete Goal" onPress={handleDeleteGoal} />;
}
