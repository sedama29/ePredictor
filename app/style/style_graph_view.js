import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    axisStyles: {
      axis: { stroke: '#756f6a' },
      axisLabel: { fontSize: 16, padding: 30 },
      tickLabels: { fontSize: 10, padding: 5 },
      ticks: { stroke: '#756f6a', size: 5 },
      grid: { stroke: '#FF000019', strokeDasharray: '0' },
      tickLabels: { fontSize: 6, padding: 5 },
      axisLabel: { fontSize: 8, padding: 25 } 
    },
    legendContainer: {
      position: 'absolute',
      top: 40,
      right: 50,
      backgroundColor: 'white',
      width: 120, // Adjust as needed
      height: 210, // Adjust as needed
      padding: 10, 
      borderRadius: 5,
    },

    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 10, // Reduced font size
      marginVertical: 2, // Adjusted margin
      // fontFamily: 'Helvetica',

    },
    legendToggleButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'lightgray', // Temporary background for debugging
      padding: 10, 
      zIndex: 1, 
      // fontFamily: 'Helvetica',
    },

    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start', 
      marginVertical: 1
    },
    checkboxBase: {
      width: 10,  // Size adjustments as before
      height: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 3,
      marginRight: 5,
    },
    checkboxChecked: {
      backgroundColor: 'blue',
    },
    checkboxCheckmark: {
      color: 'white',
      fontSize: 8, // Reduced font size
    },
    
  });

  