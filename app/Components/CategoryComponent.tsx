import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

type Category = {
  id: string;
  name: string;
  label: string;
};

const categoryIconData: Category[] = [
  { id: '1', name: 'screwdriver-wrench', label: 'Utilities' }, // 'sack-dollar' used for Utilities
  { id: '2', name: 'bus', label: 'Transport' }, // 'bus' for Transport
  { id: '3', name: 'shield', label: 'Insurance' }, // 'shield' for Insurance
  { id: '4', name: 'heart-pulse', label: 'Health' }, // 'heartbeat' for Health
  { id: '5', name: 'couch', label: 'Housing' }, // 'home' for Housing
  { id: '6', name: 'utensils', label: 'Food' }, // 'utensils' for Food
  { id: '7', name: 'child', label: 'Childcare' }, // 'child' for Childcare
  { id: '8', name: 'gamepad', label: 'Fun' }, // 'gamepad' for Fun
  { id: '9', name: 'basket-shopping', label: 'Groceries' }, // 'shopping-basket' for Groceries
  { id: '10', name: 'credit-card', label: 'Debt' }, // 'credit-card' for Debt
  { id: '11', name: 'money-bill', label: 'Rent' }, // 'money-bill' for Rent
  { id: '12', name: 'bowl-food', label: 'Dining Out' }, // 'concierge-bell' for Dining Out
  { id: '13', name: 'gift', label: 'Gift' }, // 'gift' for Gift
  { id: '14', name: 'shirt', label: 'Clothing' }, // 'shirt' for Clothing
  { id: '15', name: 'dumbbell', label: 'Gym' }, // 'dumbbell' for Gym
  { id: '16', name: 'play-circle', label: 'Subs' }, // 'play-circle' for Subscriptions
];

// IconItem component for each icon in the grid
function IconItem({ name, label }: { name: string; label: string }) {
  return (
    <View style={styles.categoryIconContainer}>
      <TouchableOpacity style={styles.iconWrapper}>
        <FontAwesome6 name={name} size={30} color="black" />
        <Text style={styles.iconLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function CategoryIconDisplay() {
  return (
    <FlatList
      data={categoryIconData}
      renderItem={({ item }) => (
        <IconItem name={item.name} label={item.label} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={4}
      horizontal={false}
    />
  );
}
export function DropdownListCategory() {
  const [selectedValue, setSelectedValue] = useState('Choose a category');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (item: Category) => {
    setSelectedValue(item.label);
    setDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Button */}
      <TouchableOpacity onPress={() => setDropdownOpen(!dropdownOpen)}>
        <Text>{selectedValue}</Text>
      </TouchableOpacity>

      {/* Dropdown Options */}
      {dropdownOpen && (
        <FlatList
          data={categoryIconData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
