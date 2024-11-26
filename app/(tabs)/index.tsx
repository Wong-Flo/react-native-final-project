import { Text, View } from 'react-native';
import HomeIconDisplay from '../Components/HomeIcons';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15, paddingTop: 50 }]}>
        Home
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',

          fontFamily: 'arial',
        }}
      >
        Track your spending without breaking the bank
      </Text>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          margin: 30,
        }}
      >
        Because keeping your budget in check should be as easy
      </Text>
      <HomeIconDisplay />
    </View>
  );
}
