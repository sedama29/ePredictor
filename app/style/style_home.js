import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    // height: '100%',
    // backgroundColor:'white',
    borderRadius: 5,

  },
  pickerContainer: {
    width: '70%',
    borderRadius: 5,
    backgroundColor: 'lightgray',
    padding: 5,
    elevation: 3,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  
  dropdownContainer: {
    marginTop: 160, 
    marginLeft: 10, 
    marginRight: 10, 
    padding: 5,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    overflow: 'hidden',
    borderColor: 'black', // Set the border color to black
    borderWidth: 1, // Add a border width
  },
  picker: {
    width: '100%',
    color: 'blue',
    backgroundColor: 'transparent',
    fontSize: 14, // Font size of the selected value
    paddingHorizontal: 10, // Add horizontal padding to the selected value
  },
  pickerItem: {
    paddingVertical: 8, 
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: 'lightgray', 
  },
  pickerText: {
    fontSize: 14,
    // fontFamily: 'Helvetica',
  },


  container_data: {
    width: '100%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    // fontFamily: 'Helvetica',

  },
  container_location: {
    borderWidth:1,
    padding: 5,
    // height: 300,
    resizeMode: 'contain',
    borderRadius: 5,
    overflow: 'hidden',

  },
  container_image: {
    alignItems: 'center',
    width: '100%', 
    height: 'auto', 
    borderRadius: 5,
    overflow: 'hidden',

  },
  
  imageStyle: {
    borderWidth: 1,
    width: '100%',
    aspectRatio: 1.5, 
    resizeMode: 'contain',

  },

  container_contact: {
    alignItems: 'left',
    width: '100%',
    borderWidth: 1,
    padding: 5,
    // height: 500,
    borderRadius: 5,
    // fontFamily: 'Helvetica',
  },

  textSpacing: {
    marginBottom: 10,
    // fontFamily: 'Helvetica',
  },
  rowText: {
    fontWeight: 'bold',
    // fontFamily: 'Helvetica',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    // fontFamily: 'Helvetica',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    // backgroundColor: '#f2f2f2',
    padding: 5,
    // fontFamily: 'Helvetica',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 11,
    // fontFamily: 'Helvetica',
  },
  column: {
    width: '25%',
    textAlign: 'center',
    fontSize: 11,
    // fontFamily: 'Helvetica',
  },

  headerText: {
    fontWeight: 'bold',
    padding: 5,
    // fontFamily: 'Helvetica',

  },
  rowText: {
    padding: 5,
    // fontFamily: 'Helvetica',

  },

  modalView: {
    flex: 1,
    marginTop: 40,
    padding:20,
    borderRadius: 5,
  },
  closeButton: {
    alignItems: "center",
    alignSelf: 'center', 
    backgroundColor: "blue",
    padding: 10,
    width: '20%',
    borderRadius: 5,
    // fontFamily: 'Helvetica',
  },
  alertButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  alertText: {
    color: 'red',
    fontSize: 16,
    // fontFamily: 'Helvetica',
  },
  boldText: {
    fontWeight: 'bold',
    // fontFamily: 'Helvetica',
  },
  pickerAndDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // fontFamily: 'Helvetica',
  },
  dotsButton: {
    fontSize:12,
    padding: 5,
    // fontFamily: 'Helvetica',
  },
  modalView_2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'Helvetica',
  },
  imageStyle_2: {
    // Style for the image
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
    // fontFamily: 'Helvetica',
  },
  closeButton_image: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  dotTouchable: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 179 - 15,
    top: 380 - 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // fontFamily: 'Helvetica',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    // fontFamily: 'Helvetica',
  },
});
