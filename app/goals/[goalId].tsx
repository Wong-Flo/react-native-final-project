import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { GoalResponseBodyGet } from '../api/goals/[goalId]+api';

// import type { UserResponseBodyGet } from '../api/user+api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a192f',
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#ccd6f6',
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  textSecondary: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#8892b0',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    gap: 200,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#ccd6f6',
    padding: 12,
    borderRadius: 12,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins_400Regular',
    color: '#112240',
    textAlign: 'center',
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#ccd6f6',
    marginBottom: 8,
  },
  input: {
    color: '#ccd6f6',
    backgroundColor: '#0a192f',
    borderColor: '#8892b0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  inputFocused: {
    borderColor: 'white',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#112240',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
});

export default function GoalPage() {
  const { goalId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState<number | undefined>();

  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  const router = useRouter();

  // Dynamic import of images
  // const imageContext = require.context('../../assets', false, /\.(avif)$/);

  useFocusEffect(
    useCallback(() => {
      async function getUserAndLoadGoal() {
        if (typeof goalId !== 'string') {
          return;
        }
        const [/* userResponse, */ goalResponse]: [
          /* UserResponseBodyGet, */
          GoalResponseBodyGet,
        ] = await Promise.all([
          /* fetch('/api/user').then((response) => response.json()), */
          fetch(`/api/goals/${goalId}`).then((response) => response.json()),
        ]);

        /* if ('error' in userResponse) {
          router.replace(`/(auth)/login?returnTo=/guests/${goalId}`);
        } */

        if ('goal' in goalResponse) {
          setGoal(goalResponse.goal.goal);
          setGoalAmount(goalResponse.goal.goal_amount);
        }
      }

      getUserAndLoadGoal().catch((error) => {
        console.error(error);
      });
    }, [goalId, router]),
  );

  if (typeof goalId !== 'string') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {/* Use dynamic import of images */}
        {/* <Image
          style={styles.avatar}
          source={imageContext(`./guest-${goalId}.avif`)}
          alt="profile picture"
        /> */}
      </View>
      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Goal</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'goal' && styles.inputFocused,
              ]}
              value={goal}
              onChangeText={setGoal}
              onFocus={() => setFocusedInput('goal')}
              onBlur={() => setFocusedInput(undefined)}
            />
            <Text style={styles.label}>Goal Amount</Text>
            {/*    <TextInput
              style={[
                styles.input,
                focusedInput === 'goalAmount' && styles.inputFocused,
              ]}
              value={goalAmount}
              onChangeText={setGoalAmount}
              onFocus={() => setFocusedInput('goalAmount')}
              onBlur={() => setFocusedInput(undefined)}
            /> */}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={async () => {
              await fetch(`/api/goals/${goalId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  goal,
                  goalAmount,
                }),
              });

              setIsEditing(false);
              router.replace('/homeIconRoute/Goals');
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {goal} {goalAmount}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              style={styles.icon}
              onPress={() => {
                setIsEditing(true);
              }}
            >
              <Ionicons name="create-outline" size={36} color="#ccd6f6" />
            </Pressable>
            <Pressable
              style={styles.icon}
              onPress={async () => {
                await fetch(`/api/goals/${goalId}`, {
                  method: 'DELETE',
                });
                setIsEditing(false);
                router.replace('/homeIconRoute/Goals');
              }}
            >
              <Ionicons name="trash-outline" size={36} color="#ccd6f6" />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
