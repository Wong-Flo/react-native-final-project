import { FontAwesome6 } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { CategoryDropdown } from '../Components/CategoryComponent';
import DatePicker from '../Components/DatePicker';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <View style={styles.transactionTextInput}>
        <DatePicker />
        <FontAwesome6
          name="calendar"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <CategoryDropdown />
      <View style={styles.transactionTextInput}>
        <Text style={styles.labelText}>Item</Text>
        <FontAwesome6
          name="tags"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <Text style={styles.labelText}>Price</Text>
        <FontAwesome6
          name="money-bill-1-wave"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <Text style={styles.labelText}>Description</Text>
        <FontAwesome6
          name="pen-ruler"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
    </View>
  );
}
