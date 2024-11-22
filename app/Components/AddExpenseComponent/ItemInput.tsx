import React from 'react';
import { TextInput } from 'react-native';

type ItemInputProps = {
  item: string;
  setItem: (value: string) => void;
  onFocus: () => void;
};
export default function ItemInput({ item, setItem, onFocus }: ItemInputProps) {
  return (
    <TextInput
      onChangeText={setItem}
      value={item}
      onFocus={onFocus}
      placeholder="Enter Item"
    />
  );
}
