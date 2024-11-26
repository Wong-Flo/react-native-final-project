import { Text, View } from 'react-native';
import { ViewExpenses } from '../Components/AddExpenseComponent/ViewExpense';
import styles from '../styles/styles';

export default function ViewScreen() {
  return (
    <View style={styles.tableContainer}>
      <Text
        style={[
          styles.text,
          {
            paddingBottom: 15,
            paddingTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        All Expenses
      </Text>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Category</Text>
        <Text style={styles.tableHeaderText}>Item</Text>
        <Text style={styles.tableHeaderText}>Price</Text>
        <Text style={styles.tableHeaderText}>Description</Text>
      </View>
      <ViewExpenses />
    </View>
  );
}
