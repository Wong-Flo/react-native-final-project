import { FontAwesome6 } from '@expo/vector-icons';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
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
export function CategoryDropdown() {
  return (
    <SelectDropdown
      data={categoryIconData}
      onSelect={(selectedItem, index) => {
        // console.log(selectedItem, index)
      }}
      renderButton={(selectedItem) => {
        return (
          <View style={styles.transactionTextInput}>
            <Text>
              {(selectedItem && selectedItem.label) || 'Choose a Category'}
              <FontAwesome6 name="chevron-down" />
            </Text>
            {selectedItem && (
              <FontAwesome6
                name={selectedItem.name}
                size={20}
                color="black"
                style={styles.transactionIcon}
              />
            )}
          </View>
        );
      }}
      renderItem={(item, id, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: 'white' }),
            }}
          >
            <Text>{item.label}</Text>
            <FontAwesome6 name={item.name} />
          </View>
        );
      }}
    />
  );
}
