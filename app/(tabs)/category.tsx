import { Text, View } from 'react-native';
import CategoryIconDisplay from '../Components/GoalComponents/CategoryComponent';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15 }]}>
        Available Categories
      </Text>
      <CategoryIconDisplay />
    </View>
  );
}
