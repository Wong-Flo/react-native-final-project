import { View } from 'react-native';
import { CategoryDropdown } from '../Components/CategoryComponent';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <CategoryDropdown />
    </View>
  );
}
