import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../../styles/styles';

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
      <View style={styles.iconWrapper}>
        <FontAwesome6 name={name} size={24} color="white" />
        <Text style={styles.iconLabel}>{label}</Text>
      </View>
    </View>
  );
}
export default function CategoryIconDisplay() {
  const router = useRouter();
  const categoryIconPress = (categoryId: string) => {
    router.push(`/Components/GoalComponents/${categoryId}`);
  };

  return (
    <FlatList
      data={categoryIconData}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => categoryIconPress(item.id)}>
          <IconItem name={item.name} label={item.label} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      numColumns={4}
      horizontal={false}
    />
  );
}
type SelectDropdownProps = {
  selectedItem: { label: string; name: string } | null;
  setSelectedItem: (item: { label: string; name: string }) => void;
};
export function CategoryDropdown({
  selectedItem,
  setSelectedItem,
}: SelectDropdownProps) {
  return (
    <SelectDropdown
      data={categoryIconData}
      onSelect={(selectedItem) => {
        setSelectedItem(selectedItem);
      }}
      renderButton={() => {
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
      renderItem={(item, isSelected) => {
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
