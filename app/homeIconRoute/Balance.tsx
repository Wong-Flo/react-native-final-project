import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import type { Expense } from '../../migrations/00003-createTableExpenses';
import type { ExpensesResponseBodyGet } from '../api/expenses/index+api';
import styles from '../styles/styles';

export default function BalanceScreen() {
  const [categoryTotals, setCategoryTotals] = useState<
    { category: string; total: number }[]
  >([]);
  const router = useRouter();
  const [isStale, setIsStale] = useState(true);

  // Aggregation logic directly in the file
  const totalExpensesByCategory = (expenses: Expense[]) => {
    const categoryTotals: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      const { selectedCategory, price } = expense;
      categoryTotals[selectedCategory] =
        (categoryTotals[selectedCategory] || 0) + parseFloat(price.toString());
    });

    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }));
  };

  // Calculate the overall total
  const calculateGrandTotal = () =>
    categoryTotals.reduce((acc, item) => acc + item.total, 0);

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getExpenses() {
        const response: ExpensesResponseBodyGet = await fetch(
          '/api/expenses',
        ).then((res) => res.json());

        setIsStale(false);

        if ('error' in response) {
          setCategoryTotals([]);
          return;
        }

        if ('expenses' in response) {
          const totals = totalExpensesByCategory(response.expenses);
          setCategoryTotals(totals);
        }
      }

      getExpenses().catch((error) => console.error(error));
    }, [isStale]),
  );

  const renderItem = ({
    item,
  }: {
    item: { category: string; total: number };
  }) => (
    <View
      style={[
        styles.tableContainer,
        { width: 350, backgroundColor: colors.background },
      ]}
    >
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>{item.category}</Text>
          <Text style={{ textAlign: 'right' }}>{item.total.toFixed(2)}€</Text>
        </View>
      </View>
    </View>
  );

  const grandTotal = calculateGrandTotal(); // Calculate the grand total

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { padding: 20 }]}>Current Spending</Text>
      {categoryTotals.length > 0 ? (
        <>
          <FlatList
            data={categoryTotals}
            renderItem={renderItem}
            keyExtractor={(item) => item.category}
          />
          {/* Display grand total */}
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 350,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Total:</Text>
            <Text style={{ fontWeight: 'bold' }}>{grandTotal.toFixed(2)}€</Text>
          </View>
        </>
      ) : (
        <Text style={styles.text}>No Expenses Yet</Text>
      )}
    </View>
  );
}
