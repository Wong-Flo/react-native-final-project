import { Text, View } from 'react-native';
import NewGoal from '../Components/GoalComponents/CreateGoal';
import ViewGoals from '../Components/GoalComponents/ViewGoals';
import styles from '../styles/styles';

export default function GoalsScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', maxHeight: 600 }}>
          <Text style={[styles.text, { paddingTop: 50 }]}>Saving Goals</Text>
          <ViewGoals />
        </View>
        <View style={{ flex: 1, maxHeight: 300 }}>
          <NewGoal />
        </View>
      </View>
    </>
  );
}
