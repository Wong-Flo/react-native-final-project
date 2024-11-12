import { FontAwesome6 } from '@expo/vector-icons';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { CategoryDropdown } from '../Components/CategoryComponent';
import DatePicker from '../Components/DatePicker';
import DescriptionInput from '../Components/DescriptionInput';
import ItemInput from '../Components/ItemInput';
import PriceInput from '../Components/PriceInput';
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
        <ItemInput />
        <FontAwesome6
          name="tags"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <PriceInput />
        <FontAwesome6
          name="money-bill-1-wave"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <DescriptionInput />
        <FontAwesome6
          name="pen-ruler"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <TouchableOpacity>
        <View>
          <Button title="Add Expense" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
