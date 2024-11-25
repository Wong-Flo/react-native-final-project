import { useLocalSearchParams } from 'expo-router'; // Hook to get params from URL
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import type { Expense } from '../../../migrations/00003-createTableExpenses'; // Define the expense type
import type { ExpensesResponseBodyGet } from '../../api/expenses/index+api'; // Type for API response
import styles from '../../styles/styles';

const CategoryDetailsScreen = () => {
  // Get selectedCategory from route parameters
  const { selectedCategory } = useLocalSearchParams();
  const [expenses, setExpenses] = useState<Expense[]>([]); // State for holding expenses data
  const [loading, setLoading] = useState(true); // Loading state to show loading UI

  // Fetch expenses data from the server
  useEffect(() => {
    if (!selectedCategory) return;

    // Fetch expenses based on selectedCategory
    async function getCategoryExpenses() {
      try {
        const response: ExpensesResponseBodyGet = await fetch(
          `/api/expenses?selectedCategory=${selectedCategory}`,
        ).then((res) => res.json());

        // If there's an error, set expenses to empty array
        if ('error' in response) {
          setExpenses([]);
          return;
        }

        // If the response contains expenses, filter them and update state
        if ('expenses' in response) {
          const filteredExpenses = response.expenses.filter(
            (expense: Expense) => expense.selectedCategory === selectedCategory,
          );
          setExpenses(filteredExpenses);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    }

    getCategoryExpenses(); // Call the function to fetch expenses
  }, [selectedCategory]); // Re-run when selectedCategory changes

  // Render each expense item
  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.tableContainer}>
      <Text>{item.item}</Text> {/* Display item name */}
      <Text>{item.price}€</Text> {/* Display price */}
      <Text>{item.descriptionText}</Text> {/* Display description */}
    </View>
  );

  // Show loading or error if no data found
  if (loading) {
    return <Text>Loading expenses...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expenses for Category: {selectedCategory}</Text>
      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No expenses found for this category.</Text>
      )}
    </View>
  );
};

export default CategoryDetailsScreen;
