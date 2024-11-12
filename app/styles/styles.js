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

  // Chart Styling

  chartTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chartTabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
  chartActiveTabButton: {
    backgroundColor: 'lightblue',
  },
  chartTabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Goal Styling
  goalContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
    paddingBottom: 40,
  },
  notesContainer: {
    paddingBottom: 150, // Add padding to prevent notes from being cut off
  },
  noteItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalText: {
    fontSize: 14,
    color: '#555',
  },

  goalNoteInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
