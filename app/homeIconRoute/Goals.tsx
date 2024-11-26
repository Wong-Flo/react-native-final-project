import { Text, View } from 'react-native';
import NewGoal from '../Components/GoalComponents/CreateGoal';
import ViewGoals from '../Components/GoalComponents/ViewGoals';
import styles from '../styles/styles';

export default function GoalsScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.text, { paddingBottom: 15, paddingTop: 50 }]}>
          Saving Goals
        </Text>
        <ViewGoals />
        <NewGoal />
      </View>
    </>
  );
}
