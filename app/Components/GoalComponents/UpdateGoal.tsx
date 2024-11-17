import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';

export default function UpdateGoal({ goalId }: { goalId: number }) {
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState<number>(0);

  const handleUpdateGoal = async () => {
    if (!goal || goalAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid goal and amount');
      return;
    }

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal,
          goal_amount: goalAmount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Goal updated: ${result.goal.goal}`);
      } else {
        Alert.alert('Error', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error updating goal:', error);
      Alert.alert('Error', 'Failed to update goal');
    }
  };

  return (
    <>
      <TextInput
        placeholder="Enter updated goal"
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        placeholder="Enter updated goal amount"
        keyboardType="numeric"
        value={String(goalAmount)}
        onChangeText={(text) => setGoalAmount(Number(text))}
      />
      <Button title="Update Goal" onPress={handleUpdateGoal} />
    </>
  );
}
