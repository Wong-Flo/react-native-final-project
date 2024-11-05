import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function TitleHeader() {
  /* const handleLeftPress = () => {
    console.log('Left icon pressed');
    // Handle left icon press action
  };

  const handleRightPress = () => {
    console.log('Right icon pressed');
    // Handle right icon press action
  }; */

  return (
    <View style={styles.titleContainer}>
      <TouchableOpacity>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
