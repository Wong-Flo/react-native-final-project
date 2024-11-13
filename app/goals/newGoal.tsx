import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { testColors } from '../../constants/colors';
import type { GoalsResponseBodyPost } from '../api/goals/index+api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: testColors.background,
    alignItems: 'center',
    width: '100%',
  },
  addGuestContainer: {
    backgroundColor: testColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: testColors.text,
    marginBottom: 8,
  },
  input: {
    color: testColors.text,
    backgroundColor: testColors.background,
    borderColor: testColors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  inputFocused: {
    borderColor: testColors.white,
  },
  button: {
    marginTop: 30,
    backgroundColor: testColors.text,
    padding: 12,
    borderRadius: 12,
    shadowColor: testColors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: testColors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function NewGoal() {
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, focusedInput === 'goal' && styles.inputFocused]}
          value={goal}
          onChangeText={setGoal}
          onFocus={() => setFocusedInput('goal')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'goalAmount' && styles.inputFocused,
          ]}
          value={goalAmount}
          onChangeText={setGoalAmount}
          onFocus={() => setFocusedInput('goalAmount')}
          onBlur={() => setFocusedInput(undefined)}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          const response = await fetch('/api/goals', {
            method: 'POST',
            body: JSON.stringify({ goal, goalAmount, attending: false }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating goal';
            const body: GoalsResponseBodyPost = await response.json();

            if ('error' in body) {
              errorMessage = body.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setGoal('');
          setGoalAmount('');
          router.replace('/homeIconRoute/Goals');
        }}
      >
        <Text style={styles.text}>Add Goal</Text>
      </Pressable>
    </SafeAreaView>
  );
}
