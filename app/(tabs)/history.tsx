import { View } from 'react-native';
import DatePicker from '../Components/DatePicker';
import ItemInput from '../Components/ItemInput';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <ItemInput />
    </View>
  );
}
