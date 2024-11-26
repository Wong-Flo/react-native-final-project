import { Text, View } from 'react-native';
import { ViewExpenses } from '../Components/AddExpenseComponent/ViewExpense';
import styles from '../styles/styles';

export default function ViewScreen() {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 15,
          paddingTop: 50,
        }}
      >
        <Text style={styles.text}>All Expenses</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Category</Text>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
          <Text style={styles.tableHeaderText}>Description</Text>
        </View>
        <ViewExpenses />
      </View>
    </>
  );
}
