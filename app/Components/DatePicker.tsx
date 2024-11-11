import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function DatePicker() {
  // Initialize the state with the current date (or you can use a placeholder like null for no date selected)
  const [date, setDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
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
        {/* Show placeholder text if no date is selected, otherwise display the selected date */}
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
