import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { testColors } from '../../constants/colors';
import type { Goal } from '../../migrations/00000-createTableGoals';
import type { GoalsResponseBodyGet } from '../api/goals/index+api';
/* import type { UserResponseBodyGet } from '../api/user+api'; */
import GoalItem from '../Components/GoalItem';
import NewGoal from '../goals/newGoal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: testColors.background,
    height: '100%',
  },
  text: {
    color: testColors.text,
  },
  list: {
    marginTop: 30,
  },
});

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isStale, setIsStale] = useState(true);
  /*  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  }); */

  const router = useRouter();

  // const renderItem = (item: { item: User }) => <UserItem user={item.item} />;

  const renderItem = (item: { item: Goal }) => (
    <GoalItem goals={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndGoals() {
        const [/* userResponse, */ goalsResponse]: [
          /* UserResponseBodyGet, */
          GoalsResponseBodyGet,
        ] = await Promise.all([
          /*  fetch('/api/user').then((response) => response.json()), */
          fetch('/api/goals/index').then((response) => response.json()),
        ]);

        setIsStale(false);

        /*  if ('error' in userResponse) {
          router.replace('/(auth)/login?returnTo=/(tabs)/goals');
          return;
        }
 */
        if ('error' in goalsResponse) {
          setGoals([]);
          return;
        }

        setGoals(goalsResponse.goals);
      }

      getUserAndGoals().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  /*  if (!fontsLoaded) {
    return null;
  } */

  return (
    <SafeAreaView style={styles.container}>
      <NewGoal />
      <FlatList
        style={styles.list}
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item: Goal) => String(item.user_id)}
      />
    </SafeAreaView>
  );
}
