import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to </Text>
      <Text style={styles.text}>Spend 'n' Save</Text>
      <Text style={styles.description}>Please log in</Text>

      {/* Input Fields */}
      <TextInput style={styles.textInput} placeholder="Name" />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
      />
      <Text style={styles.description} onPress={() => router.push('/register')}>
        No Account? No problem, {'\n'}register here with a few clicks.
      </Text>
      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
