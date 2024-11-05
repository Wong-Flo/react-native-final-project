import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <Text style={styles.description}>Welcome to the registration page!</Text>
      {/* Add your sign-up form fields here */}
    </View>
  );
}
