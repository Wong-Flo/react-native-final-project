import { View } from 'react-native';
import Logout from '../(auth)/logout';
import styles from '../styles/styles';

export default function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Logout />
    </View>
  );
}
