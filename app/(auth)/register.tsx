import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/styles'; // Make sure your styles are updated similarly

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  // Focus handling for input fields
  const handleFocus = (field: string) => {
    setFocusedInput(field);
  };

  const handleBlur = () => {
    setFocusedInput(undefined);
  };

  // Handle registration process
  const handleRegister = async () => {
    const registrationData = { username, password };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        let errorMessage = 'Error creating user';
        if ('error' in responseBody) {
          errorMessage = responseBody.error;
        }
        Alert.alert('Registration Error', errorMessage, [{ text: 'OK' }]);
        return;
      }

      // Clear input fields on successful registration
      setUsername('');
      setPassword('');

      // Redirect to the desired page (e.g., /dashboard or /login)
      router.replace('/login'); // Change the route as needed
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred during registration. Please try again.',
        [{ text: 'OK' }],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}

      <Text style={styles.text}>Sign Up</Text>
      <Text style={styles.description}>Welcome to the registration page!</Text>

      {/* Username Input */}
      <TextInput
        style={[
          styles.textInput,
          focusedInput === 'username' && styles.inputFocused,
        ]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        onFocus={() => handleFocus('username')}
        onBlur={handleBlur}
      />

      {/* Password Input */}
      <TextInput
        style={[
          styles.textInput,
          focusedInput === 'password' && styles.inputFocused,
        ]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
      />
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.description}>Already have an account?</Text>
      </TouchableOpacity>
      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
    </SafeAreaView>
  );
}
