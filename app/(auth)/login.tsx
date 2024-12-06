import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle login when the button is pressed
  const handleLogin = async () => {
    const loginData = {
      username,
      password,
    };
    // check here if issue lies,
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const responseBody = await response.json();

      if (response.ok) {
        // If login is successful, redirect the user to another page
        router.push('/(tabs)'); //
      } else {
        // Show an error alert if the login failed
        Alert.alert(
          'Login Error',
          responseBody.error || 'Something went wrong.',
        );
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      Alert.alert(
        'Error',
        'An error occurred while trying to login. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>Spend 'n' Save</Text>
      <Text style={styles.description}>Please log in</Text>

      {/* Username Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Register Link */}
      <Text style={styles.description} onPress={() => router.push('/register')}>
        No Account? No problem, {'\n'}register here with a few clicks.
      </Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
