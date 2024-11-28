import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from '../Components/AddExpenseComponent/DatePicker';
import DescriptionInput from '../Components/AddExpenseComponent/DescriptionInput';
import ItemInput from '../Components/AddExpenseComponent/ItemInput';
import PriceInput from '../Components/AddExpenseComponent/PriceInput';
import { CategoryDropdown } from '../Components/GoalComponents/CategoryComponent';
import styles from '../styles/styles';

export default function AddScreen() {
  const [date, setDate] = useState<Date | null>(null);
  const justDate = date ? date.toISOString() : null; // Format as ISO string for backend
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    name: string;
  } | null>(null);
  const [item, setItem] = useState<string>(''); // Start with an empty string
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>(''); // Start with an empty string

  const handleAddExpense = async () => {
    // Validate fields
    if (!justDate || !selectedCategory || !item || !price || !description) {
      Alert.alert(
        'Validation Error',
        'Please fill in all fields before adding an expense.',
      );
      return;
    }

    // Send data to the backend
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdAt: justDate,
        selectedCategory: selectedCategory.label,
        item,
        price,
        descriptionText: description,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      Alert.alert('Error', responseData.error || 'Failed to add expense.');
      return;
    }

    Alert.alert('Success', 'Expense added successfully!');
    // Optionally clear the form
    resetForm();
  };

  const resetForm = () => {
    setDate(null);
    setSelectedCategory(null);
    setItem('');
    setPrice(null);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15 }]}>
        Create a Transaction
      </Text>

      {/* Date Picker */}
      <View style={styles.transactionTextInput}>
        <DatePicker date={date} setDate={setDate} />
        <FontAwesome6
          name="calendar"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>

      {/* Category Dropdown */}
      <CategoryDropdown
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
      />

      {/* Item Input */}
      <View style={styles.transactionTextInput}>
        <ItemInput item={item} setItem={setItem} onFocus={() => {}} />
        <FontAwesome6
          name="tags"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>

      {/* Price Input */}
      <View style={styles.transactionTextInput}>
        <PriceInput price={price} setPrice={setPrice} />
        <FontAwesome6
          name="money-bill-1-wave"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>

      {/* Description Input */}
      <View style={styles.transactionTextInput}>
        <DescriptionInput
          description={description}
          setDescription={setDescription}
          onFocus={() => {}}
        />
        <FontAwesome6
          name="pen-ruler"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>

      {/* Add Expense Button */}
      <View /* style={{ paddingTop: 50 }} */>
        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Income</Text>
      </TouchableOpacity>
    </View>
  );
}
