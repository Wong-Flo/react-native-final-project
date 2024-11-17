import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';

export default function CreateGoal() {
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState<number>(0);

  async function handleCreateGoal() {
    if (!goal || goalAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid goal and amount');
      return;
    }
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
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
        Alert.alert('Success', `Goal created: ${result.goal.goal}`);
      } else {
        Alert.alert(
          'Error',
          result.error || 'Unknown error occurred check here 7 ',
        );
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      Alert.alert('Error', 'Failed to create goal check here 8');
    }
  }
  return (
    <>
      <TextInput placeholder="Enter goal" value={goal} onChangeText={setGoal} />
      <TextInput
        placeholder="Enter goal amount"
        keyboardType="numeric"
        value={String(goalAmount)}
        onChangeText={(text) => setGoalAmount(Number(text))}
      />
      <Button title="Create Goal" onPress={handleCreateGoal} />
    </>
  );
}
