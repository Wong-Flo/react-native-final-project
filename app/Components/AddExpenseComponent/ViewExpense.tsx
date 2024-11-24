import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Expense } from '../../../migrations/00003-createTableExpenses';
import type { ExpensesResponseBodyGet } from '../../api/expenses/index+api';
import type { UserResponseBodyGet } from '../../api/user+api';
import ExpenseItem from '../../Components/AddExpenseComponent/ExpenseItem';
import styles from '../../styles/styles';

export function ViewExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const router = useRouter();
  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Expense }) => (
    <ExpenseItem expense={item.item} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;
      async function getUserAndExpenses() {
        const [userResponse, expensesResponse]: [
          UserResponseBodyGet,
          ExpensesResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/expenses').then((response) => response.json()),
        ]);

        setIsStale(false);
        if ('error' in userResponse) {
          router.replace('/(auth)/login?returnTo=/expenses');
          return;
        }

        if ('error' in expensesResponse) {
          setExpenses([]);
          return;
        }

        if ('expenses' in expensesResponse) {
          setExpenses(expensesResponse.expenses);
        }
      }

      getUserAndExpenses().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  return (
    <SafeAreaView>
      {expenses.length > 0 ? (
        <FlatList
          data={expenses.slice().reverse()} // Reverses the Array to display the last Entry first
          renderItem={renderItem}
          keyExtractor={(item: Expense) => String(item.id)}
        />
      ) : (
        <Text style={styles.text}>No Expenses yet</Text>
      )}
    </SafeAreaView>
  );
}
