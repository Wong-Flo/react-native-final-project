import React, { useState } from 'react';
import { TextInput } from 'react-native';

type PriceInputProps = {
  price: number | null; // Accept price as a number or null
  setPrice: (value: number | null) => void; // Accepts a number or null to reset
};

export default function PriceInput({ price, setPrice }: PriceInputProps) {
  const [inputValue, setInputValue] = useState<string>(''); // Local state for unformatted input

  const handleFocus = () => {
    setInputValue(price !== null ? price.toString() : ''); // Show raw value on focus
  };

  const handleChange = (text: string) => {
    // Validate and update local state for immediate input feedback
    if (/^\d*\.?\d*$/.test(text)) {
      setInputValue(text); // Allow only valid numeric input
      const numericValue = text !== '' ? parseFloat(text) : null;
      setPrice(numericValue); // Update the parent state
    }
  };

  const handleBlur = () => {
    if (price !== null) {
      setInputValue(`€${price.toFixed(2)}`); // Format the value when input loses focus
    } else {
      setInputValue(''); // Reset to empty string if price is null
    }
  };

  return (
    <TextInput
      onChangeText={handleChange} // Update on text change
      value={inputValue} // Show the current input value
      keyboardType="numeric" // Restrict to numeric input
      onFocus={handleFocus} // Show raw number on focus
      onBlur={handleBlur} // Format the input on blur
      placeholder="Enter Price"
    />
  );
}
