import React from 'react';
import { TextInput } from 'react-native';

type DescriptionInputProps = {
  description: string;
  setDescription: (value: string) => void;
  onFocus: () => void;
};
export default function DescriptionInput({
  description,
  setDescription,
  onFocus,
}: DescriptionInputProps) {
  return (
    <TextInput
      onChangeText={setDescription}
      value={description}
      onFocus={onFocus}
      placeholder="Enter Description"
    />
  );
}
