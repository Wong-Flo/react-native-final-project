import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 24,
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>Spend 'n' Save</Text>
        <Text>sign in or Log in</Text>

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
