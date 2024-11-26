import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
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
    <View style={styles.categoryView}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontWeight: 'bold', fontSize: 18, color: colors.darkBlue }}
        >
          {item.category}
        </Text>
        <Text
          style={{ textAlign: 'right', fontSize: 18, color: colors.darkBlue }}
        >
          {item.total.toFixed(2)}€
        </Text>
      </View>
    </View>
  );

  const grandTotal = calculateGrandTotal(); // Calculate the grand total

  return (
    <View style={[styles.container, { paddingBottom: 30 }]}>
      <Text style={[styles.text, { paddingBottom: 5, paddingTop: 50 }]}>
        Total Expenses
      </Text>
      {/* Display grand total */}
      <View style={{ paddingBottom: 20 }}>
        <View style={styles.categoryViewTotal}>
          <Text
            style={{ fontSize: 36, fontWeight: 'bold', color: colors.darkBlue }}
          >
            {grandTotal.toFixed(2)}€
          </Text>
        </View>
      </View>
      {categoryTotals.length > 0 ? (
        <>
          <FlatList
            data={categoryTotals}
            renderItem={renderItem}
            keyExtractor={(item) => item.category}
          />
        </>
      ) : (
        <Text style={styles.text}>No Expenses Yet</Text>
      )}
    </View>
  );
}
