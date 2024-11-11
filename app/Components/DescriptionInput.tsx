import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function DescriptionInput() {
  const [description, setDescription] = useState('Description');

  const handleFocus = () => {
    setDescription('');
  };
  return (
    <TextInput
      onChangeText={setDescription}
      value={description}
      onFocus={handleFocus}
      placeholder="Enter Description"
    />
  );
}
