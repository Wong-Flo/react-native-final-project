import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>Spend 'n' Save</Text>
        <Text style={styles.description}>Please Log in</Text>
        <TextInput style={styles.textInput} placeholder="Name" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />

        <Text
          style={styles.description}
          onPress={() => router.push({ pathname: '/register' })}
        >
          No Account? No problem, register now with a few clicks
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
