import { StyleSheet, Text, View } from 'react-native';
import IconDisplay from '../Components/HomeIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Tab() {
  return (
    <View style={styles.container}>
      <IconDisplay />
    </View>
  );
}
