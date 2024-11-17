import { FontAwesome6 } from '@expo/vector-icons';
import { router, useUnstableGlobalHref } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/login')}
        style={{ position: 'absolute', top: 40, left: 20 }}
      >
        <FontAwesome6
          name="circle-arrow-left"
          size={16}
          color="black"
          style={styles.transactionIcon}
        />
      </TouchableOpacity>

      <Text style={styles.text}>Sign Up</Text>
      <Text style={styles.description}>Welcome to the registration page!</Text>

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

      {/* Placeholder Submit Button */}
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
