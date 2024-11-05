import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // black
    alignItems: 'center',
    padding: 70,
    fontFamily: 'Roboto',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: 'grey',
    opacity: 0.9,
  },
  icon: {
    padding: 10,
    color: 'green',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: colors.text,
  },
  text: {
    color: colors.text, // color orange
    fontSize: 36,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  description: {
    color: '#FFFFFF',
    opacity: 50,
    alignItems: 'center',
    margin: 36,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.backgroundInput,
  },
  button: {
    backgroundColor: colors.text,
    height: '100',
    width: '100%',
    borderRadius: 25,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
