import { Text, View } from 'react-native';
import HomeIconDisplay from '../Components/HomeIcons';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15, paddingTop: 50 }]}>
        Home
      </Text>
      <HomeIconDisplay />
    </View>
  );
}
