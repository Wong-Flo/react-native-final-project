import { FontAwesome6 } from '@expo/vector-icons';
import { type Href, useRouter } from 'expo-router'; // Import useRouter for navigation
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

const homeIconData = [
  {
    id: '1',
    name: 'money-bill-transfer',
    label: 'Expenses',
    screen: '/homeIconRoute/Expenses',
  },
  {
    id: '2',
    name: 'coins',
    label: 'Balance',
    screen: '/homeIconRoute/Balance',
  },
  {
    id: '3',
    name: 'flag-checkered',
    label: 'Goals',
    screen: '/homeIconRoute/Goals',
  },
  {
    id: '4',
    name: 'chart-line',
    label: 'Chart',
    screen: '/homeIconRoute/Chart',
  },
];

// IconItem component for each icon in the grid
function IconItem({
  name,
  label,
  screen,
}: {
  name: string;
  label: string;
  screen: string;
}) {
  const router = useRouter(); // Hook to navigate to other screens

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => router.push(screen as Href)} // Use router.push to navigate
      >
        <FontAwesome6 name={name} size={42} color="white" />
        <Text style={styles.iconLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeIconDisplay() {
  return (
    <FlatList
      data={homeIconData}
      renderItem={({ item }) => (
        <IconItem name={item.name} label={item.label} screen={item.screen} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}
