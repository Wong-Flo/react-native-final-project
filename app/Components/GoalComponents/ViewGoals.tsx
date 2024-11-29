import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import type { Goal } from '../../../migrations/00000-createTableGoals';
import type { GoalsResponseBodyGet } from '../../api/goals/index+api';
import type { UserResponseBodyGet } from '../../api/user+api';
import styles from '../../styles/styles';
import GoalItem from './GoalItem';

export default function ViewGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [isStale, setIsStale] = useState(true);

  const router = useRouter();

  const renderItem = ({ item }: { item: Goal }) => (
    <GoalItem goal={item} onDelete={handleDeleteGoal} />
  );

  // Function to fetch goals from the API
  async function fetchGoals() {
    const [userResponse, goalsResponse]: [
      UserResponseBodyGet,
      GoalsResponseBodyGet,
    ] = await Promise.all([
      fetch('/api/user').then((response) => response.json()),
      fetch('/api/goals').then((response) => response.json()),
    ]);

    if ('error' in userResponse) {
      router.replace('/(auth)/login?returnTo=/goals');
      return;
    }

    if ('error' in goalsResponse) {
      setGoals([]);
      return;
    }

    if ('goals' in goalsResponse) {
      setGoals(goalsResponse.goals);
    }
  }

  // Function to handle goal deletion
  const handleDeleteGoal = async (goalId: string) => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
        body: JSON.stringify({ sessionToken: 'your-session-token' }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to delete the goal');
        return;
      }

      setGoals((prevGoals) =>
        prevGoals.filter((goal) => goal.id !== Number(goalId)),
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while deleting the goal');
      console.error(error);
    }
  };

  async function refreshGoals() {
    setRefreshing(true); // Show refreshing spinner
    try {
      await fetchGoals();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false); // Hide refreshing spinner
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      const getUserAndGoals = async () => {
        await fetchGoals();
        setIsStale(false);
      };

      getUserAndGoals().catch((error) => console.error(error));
    }, [isStale]),
  );

  return goals.length > 0 ? (
    <>
      <FlatList
        numColumns={2}
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item: Goal) => String(item.id)}
        refreshing={refreshing} // Add pull-to-refresh spinner
        onRefresh={refreshGoals} // Trigger refreshGoals on pull-to-refresh
      />
    </>
  ) : (
    <Text style={styles.text}>No goals yet</Text> // This message appears when there are no goals
  );
}
