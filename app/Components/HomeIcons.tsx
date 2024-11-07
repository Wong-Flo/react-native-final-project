import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

const homeIconData = [
  { id: '1', name: 'sack-dollar', label: 'Utilities' },
  { id: '2', name: 'piggy-bank', label: 'Savings' },
  { id: '3', name: 'folder-open', label: 'Folder' },
  { id: '4', name: 'chart-line', label: 'Chart' },
];
// IconItem component for each icon in the grid
function IconItem({ name, label }: { name: string; label: string }) {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconWrapper}>
        <FontAwesome6 name={name} size={60} color="black" />
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
        <IconItem name={item.name} label={item.label} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}
