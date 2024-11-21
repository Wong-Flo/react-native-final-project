import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { CategoryDropdown } from '../Components/AddComponent/CategoryComponent';
import DatePicker from '../Components/AddComponent/DatePicker';
import DescriptionInput from '../Components/AddComponent/DescriptionInput';
import ItemInput from '../Components/AddComponent/ItemInput';
import PriceInput from '../Components/AddComponent/PriceInput';
import styles from '../styles/styles';

export default function AddScreen() {
  const [date, setDate] = useState<Date | null>(null);
  const justDate = date ? date.toLocaleDateString() : 'No date selected';
  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    name: string;
  } | null>(null);
  const [item, setItem] = useState<string>('Enter Item');

  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('Enter Description');

  const handleDescriptionFocus = () => {
    setDescription('');
  };
  const handleItemFocus = () => {
    setItem('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.transactionTextInput}>
        <DatePicker date={date} setDate={setDate} />
        <FontAwesome6
          name="calendar"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <CategoryDropdown
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
      />
      <View style={styles.transactionTextInput}>
        <ItemInput item={item} setItem={setItem} onFocus={handleItemFocus} />
        <FontAwesome6
          name="tags"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <PriceInput price={price} setPrice={setPrice} />
        <FontAwesome6
          name="money-bill-1-wave"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <View style={styles.transactionTextInput}>
        <DescriptionInput
          description={description}
          setDescription={setDescription}
          onFocus={handleDescriptionFocus}
        />
        <FontAwesome6
          name="pen-ruler"
          size={20}
          color="black"
          style={styles.transactionIcon}
        />
      </View>
      <TouchableOpacity>
        <View>
          <Button title="Add Expense" />
        </View>
        <View>
          <Text>{`Description: ${description}`}</Text>
          <Text>{`Item: ${item}`}</Text>
          <Text>{`Date: ${justDate}`}</Text>
          <Text>{`selectedCategory: ${selectedCategory ? selectedCategory.label : 'None'}`}</Text>
          <Text> {price !== null ? `€${price.toFixed(2)}` : 'None'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
