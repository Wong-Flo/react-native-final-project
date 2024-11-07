import { FontAwesome6 } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.transactionTextInput}>
        <Text>Date</Text>
        <FontAwesome6 name="calendar" size={20} color="black" />
      </TextInput>
      <TextInput style={styles.transactionTextInput}>
        <Text>Category</Text>
        <FontAwesome6 name="file-waveform" size={20} color="black" />
      </TextInput>
      <TextInput style={styles.transactionTextInput}>
        <Text>Item</Text>
        <FontAwesome6 name="tags" size={20} color="black" />
      </TextInput>
      <TextInput style={styles.transactionTextInput}>
        <Text>Amount</Text>
        <FontAwesome6 name="money-bill-1-wave" size={20} color="black" />
      </TextInput>
      <TextInput style={styles.transactionTextInput}>
        <Text>Description</Text>
        <FontAwesome6 name="pen-ruler" size={20} color="black" />
      </TextInput>
    </View>
  );
}
