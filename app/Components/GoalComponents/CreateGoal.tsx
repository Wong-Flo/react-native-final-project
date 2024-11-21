import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import type { GoalsResponseBodyPost } from '../../api/goals/index+api';
import styles from '../../styles/styles';

export default function NewGoal() {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalAmountContent, setGoalAmountContent] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <>
      <View style={[styles.goalContainer, { flex: 1 }]}>
        <View style={styles.bottomView}>
          <Text style={[styles.text, { margin: 10, fontSize: 20 }]}>Goal</Text>
          <TextInput
            style={[
              styles.goalNoteInput,
              focusedInput === 'goalTitle' && styles.inputFocused,
            ]}
            placeholder="Enter Goal"
            value={goalTitle}
            onChangeText={setGoalTitle}
            onFocus={() => setFocusedInput('goalTitle')}
            onBlur={() => setFocusedInput(undefined)}
          />
          <Text style={[styles.text, { margin: 10, fontSize: 20 }]}>
            Goal Amount
          </Text>
          <TextInput
            style={[
              styles.goalNoteInput,
              focusedInput === 'goalAmountContent' && styles.inputFocused,
            ]}
            placeholder="Enter Goal Amount"
            keyboardType="numeric"
            value={goalAmountContent}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                setGoalAmountContent(text);
              }
            }}
            onFocus={() => setFocusedInput('goalAmountContent')}
            onBlur={() => setFocusedInput('something wrong')}
          />
          <View style={{ width: '50%', alignSelf: 'center', paddingTop: 10 }}>
            <Button
              title="Add Goal"
              onPress={async () => {
                const goalAmount = Number(goalAmountContent);
                // Validate the input before sending
                if (!goalTitle || isNaN(goalAmount)) {
                  Alert.alert(
                    'Error',
                    'Please enter valid goal title and amount',
                    [{ text: 'OK' }],
                  );
                  return;
                }

                const response = await fetch('/api/goals', {
                  method: 'POST',
                  body: JSON.stringify({
                    goalTitle,
                    goalAmount,
                  }),
                });
                if (!response.ok) {
                  let errorMessage = 'Error creating goal';
                  const responseBody: GoalsResponseBodyPost =
                    await response.json();

                  if ('error' in responseBody) {
                    errorMessage = 'something went wrong BM44';
                  }
                  Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
                  return;
                }
                setGoalTitle('');
                setGoalAmountContent('');
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
