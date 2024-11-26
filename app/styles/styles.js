import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },

  text: {
    color: colors.text,
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
  inputFocused: {
    borderColor: colors.white,
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
  bottomView: {
    position: 'absolute',
    paddingBottom: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 'auto',
    alignItems: 'center',

    minHeight: 80,
    width: 'auto',
  },

  // button Styling
  button: {
    backgroundColor: colors.iconBackground,
    height: '100',
    width: '80%',
    borderRadius: 25,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderWidth: 2,
    borderColor: colors.whiteAreas,
  },
  buttonText: {
    color: colors.whiteAreas,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Icon styling
  homeIconContainer: {
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    backgroundColor: colors.iconBackground,
    borderWidth: 1,
    borderColor: colors.whiteAreas,
    flexDirection: 'column', // Stack items vertically (over each other)
    padding: 10, // Add padding to the container for better spacing
    height: 100,
    width: 360,
    borderRadius: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.iconBackground,

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
    color: colors.whiteAreas,
  },

  // Category icon display

  categoryIconContainer: {
    width: 65,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.iconBackground,

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
    backgroundColor: colors.greyAreas,
    marginTop: 10,
  },
  chartActiveTabButton: {
    backgroundColor: colors.backgroundSecondary,
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
    backgroundColor: colors.background,
    padding: 15,
  },
  card: {
    backgroundColor: '#ecf6e6',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    transform: [{ rotate: '-2deg' }], // Slightly tilted
    width: 140, // Fixed width
    height: 100, // Fixed height
    justifyContent: 'space-between', // Space out items
  },
  pinIcon: {
    position: 'absolute',

    left: 10,
    zIndex: 1, // Ensure the pin icon is on top of the note
    transform: [{ rotate: '45deg' }],
  },
  noteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalText: {
    fontSize: 15,
    color: '#555',
  },

  goalNoteInput: {
    borderColor: colors.greyAreas,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.whiteAreas,
  },
  deleteButton: {
    position: 'absolute', // Position the button in the top-right corner
    top: 5,
    right: 5,
    backgroundColor: colors.whiteAreas,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.greyAreas,
    fontWeight: 'bold',
    fontSize: 10,
  },

  //table Container
  tableContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.iconBackground,
    padding: 10,
    borderRadius: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    color: colors.whiteAreas,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableBodyRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tableBodyText: {
    flex: 1,
    fontSize: 12,
    color: '#212529',
    textAlign: 'center',
  },
  categoryView: {
    flex: 1,
    backgroundColor: colors.whiteAreas,
    padding: 10,
    width: 350,
    height: 52,
    borderRadius: 15,
    margin: 5,
    border: 1,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
  categoryViewTotal: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 350,
    backgroundColor: colors.whiteAreas,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
});
