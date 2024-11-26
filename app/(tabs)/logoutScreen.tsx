import { Text, View } from 'react-native';
import Logout from '../(auth)/logout';
import styles from '../styles/styles';

export default function LogoutScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          Are you sure you
        </Text>
        <Text
          style={[
            styles.text,
            {
              paddingBottom: 50,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          want to Logout?
        </Text>

        <Logout />
      </View>
    </>
  );
}
