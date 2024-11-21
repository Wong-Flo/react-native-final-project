import React, { useState } from 'react';
import { TextInput } from 'react-native';

// PriceInput Fields
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
