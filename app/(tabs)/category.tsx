import { View } from 'react-native';
import CategoryIconDisplay from '../Components/GoalComponents/CategoryComponent';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <CategoryIconDisplay />
    </View>
  );
}
