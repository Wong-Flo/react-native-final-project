import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CategoryIconDisplay from '../Components/GoalComponents/CategoryComponent';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15, paddingTop: 50 }]}>
        Available Categories
      </Text>
      <CategoryIconDisplay />
    </View>
  );
}
