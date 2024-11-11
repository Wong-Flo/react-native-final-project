import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: colors.backgroundSecondary,
    width: '100%',
  },
  icon: {
    padding: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text, // orange
  },
  text: {
    color: colors.text, // orange
    fontSize: 36,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  description: {
    color: colors.description,
    opacity: 50,
    alignItems: 'center',
    margin: 36,
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 18,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.backgroundInput,
  },
  transactionTextInput: {
    flexDirection: 'row',
    height: 45,
    width: '80%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.backgroundInput,
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
  },
  transactionIcon: {
    marginLeft: 10,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    fontSize: 28,
    marginRight: 8,
  },
  // button Styling
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
  // Icon styling

  iconContainer: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    opacity: 0.5,
    borderRadius: 25,
    margin: 40,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: 'black',
  },

  // Category icon display

  categoryIconContainer: {
    width: 65,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    opacity: 0.5,
    borderRadius: 12,
    margin: 15,
  },
});
