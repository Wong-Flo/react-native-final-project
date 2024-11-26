import { Text, View } from 'react-native';
import { colors } from '../../constants/colors';
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
          backgroundColor: colors.background,
        }}
      >
        <Text style={styles.text}>Expenses</Text>
      </View>

      <View
        style={[
          styles.tableContainer,
          { backgroundColor: colors.background, marginBottom: 30 },
        ]}
      >
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
