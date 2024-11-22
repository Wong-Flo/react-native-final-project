import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

type DatePickerProps = {
  date: Date | null;
  setDate: (date: Date) => void;
};

export default function DatePicker({ date, setDate }: DatePickerProps) {
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); // Hide the picker
    if (selectedDate) {
      setDate(selectedDate); // Update the parent's state
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>
          {date ? date.toLocaleDateString() : 'Choose a date'}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()} // Default to current date if `date` is null
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}
