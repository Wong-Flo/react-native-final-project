import React from 'react';
import { TextInput } from 'react-native';

type PriceInputProps = {
  price: number | null; // Accept price as a number or null
  setPrice: (value: number | null) => void; // Accepts a number or null to reset
};

export default function PriceInput({ price, setPrice }: PriceInputProps) {
  // Handle focus to clear the field if desired
  const handleFocus = () => {
    setPrice(null); // Reset to null when focused (or you can use 0)
  };

  // Handle text change and convert to a number
  const handleChange = (text: string) => {
    // Strip the € symbol and parse the number, then update the parent state
    const numericValue = text ? parseFloat(text.replace('€', '').trim()) : null;
    setPrice(numericValue); // Update the parent state with the numeric value
  };

  // Format the price with € and 2 decimal places when displaying
  const formattedPrice = price !== null ? `€${price.toFixed(2)}` : '';

  return (
    <TextInput
      onChangeText={handleChange} // Handle text change and convert to number
      value={formattedPrice} // Display price with €
      keyboardType="numeric" // Allow numeric input
      onFocus={handleFocus} // Clear the field on focus
      placeholder="Enter Price"
    />
  );
}
