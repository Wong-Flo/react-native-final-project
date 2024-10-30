import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Spend 'n' Save</Text>
      <StatusBar style="auto" />
    </View>
  );
}
