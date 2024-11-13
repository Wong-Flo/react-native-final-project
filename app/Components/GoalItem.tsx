import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Goal } from '../../migrations/00002-createTableGoals';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#112240',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#ccd6f6',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 16,
  },
});

type Props = {
  goalList: Goal;
  setIsStale: (isStale: boolean) => void;
};

export default function GoalItem({ goalList, setIsStale }: Props) {
  const { user_id, goal, goal_amount } = goalList;

  return (
    <Link href={`/goals/${user_id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <View style={styles.avatar}></View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {goal} {goal_amount}
            </Text>
          </View>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await fetch(`/api/goals/${user_id}`, {
                  method: 'DELETE',
                });

                setIsStale(true);
              }}
            >
              <Ionicons name="trash-outline" size={24} color={'#8892b0'} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
