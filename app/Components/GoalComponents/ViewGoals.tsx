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

  const router = useRouter();

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Goal }) => <GoalItem goal={item.item} />;

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndGoals() {
        const [userResponse, goalsResponse]: [
          UserResponseBodyGet,
          GoalsResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/goals').then((response) => response.json()),
        ]);

        setIsStale(false);

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

      getUserAndGoals().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {goals.length > 0 ? (
        <FlatList
          numColumns={2}
          data={goals}
          renderItem={renderItem}
          keyExtractor={(item: Goal) => String(item.id)}
        />
      ) : (
        <Text style={styles.text}>No goals yet</Text>
      )}
    </SafeAreaView>
  );
}
