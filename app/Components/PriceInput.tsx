import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/styles';

export default function PriceInput() {
  const [price, setPrice] = useState('Price');

  const handleFocus = () => {
    setPrice('');
  };
  return (
    <TextInput
      onChangeText={setPrice}
      value={price}
      keyboardType="numeric"
      onFocus={handleFocus}
      placeholder="Enter Price"
    />
  );
}
