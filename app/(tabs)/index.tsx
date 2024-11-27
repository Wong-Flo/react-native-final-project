import { Text, View } from 'react-native';
import HomeIconDisplay from '../Components/HomeIcons';
import styles from '../styles/styles';

export default function Tab() {
  return (
    <>
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: 0, paddingTop: 50 }}>
          <Text style={[styles.text, { textAlign: 'center' }]}>Home</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 30,
            }}
          >
            Track your spending without breaking the bank
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            Because keeping your budget in check
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            should be as easy
          </Text>
        </View>

        <HomeIconDisplay />
      </View>
    </>
  );
}
