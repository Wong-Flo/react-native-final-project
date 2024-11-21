import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function ItemInput() {
  const [item, setItem] = useState('Item');

  const handleFocus = () => {
    setItem('');
  };

  return (
    <TextInput
      onChangeText={setItem}
      value={item}
      onFocus={handleFocus} // Trigger clearing the input when focused
      placeholder="Enter Item"
    />
  );
}
