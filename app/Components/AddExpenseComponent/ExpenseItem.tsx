import { Text, View } from 'react-native';
import type { Expense } from '../../../migrations/00003-createTableExpenses';
import styles from '../../styles/styles';

type Props = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: Props) {
  const { createdAt, selectedCategory, item, price, descriptionText } = expense;

  // Ensure createdAt is parsed as a Date
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <View style={styles.tableBodyRow}>
      <Text style={styles.tableBodyText}>{formattedDate}</Text>
      <Text style={styles.tableBodyText}>{selectedCategory}</Text>
      <Text style={styles.tableBodyText}>{item}</Text>
      <Text style={styles.tableBodyText}>{price}€</Text>
      <Text style={styles.tableBodyText}>{descriptionText}</Text>
    </View>
  );
}
