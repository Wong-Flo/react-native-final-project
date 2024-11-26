import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const renderItem = (item: { item: Goal }) => <GoalItem goal={item.item} />;

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item: Goal) => String(item.id)}
        refreshing={refreshing} // Add pull-to-refresh spinner
        onRefresh={refreshGoals} // Trigger refreshGoals on pull-to-refresh
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.text}>No goals yet</Text>}
      />
    </SafeAreaView>
  );
}
