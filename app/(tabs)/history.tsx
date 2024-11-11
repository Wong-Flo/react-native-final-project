import { View } from 'react-native';
import DatePicker from '../Components/DatePicker';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <DatePicker />
    </View>
  );
}
