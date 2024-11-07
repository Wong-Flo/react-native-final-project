import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TitleHeader from './Components/Header';
import IconDisplay from './Components/HomeIcons';
import styles from './styles/styles';

export default function HomeLayout() {
  return (
    /*  <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
         <TitleHeader />

        <View>
          <IconDisplay /> */
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} redirect />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    /*  </View>
      </SafeAreaView>
    </SafeAreaProvider> */
  );
}
