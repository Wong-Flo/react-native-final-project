import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TitleHeader from './Components/Header';
import styles from './styles/styles';

export default function HomeLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" hidden={false} />
      <Text>
        <TitleHeader />
      </Text>
    </SafeAreaView>
  );
}
