
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',           // farge på siden
    },
    header: {
      marginBottom: 20,
      alignItems: 'center',
    },
  
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',          // Farge på boksne rundt gjøremålet 
      borderRadius: 10,
      padding: 15,
      marginVertical: 5,
    },
    checkboxContainer: {
      marginRight: 15,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#fddae9',          //Farge på sirkel forran gjøremålet 
    },
    filledCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#fddae9',           //Farge på innsiden av sirklen forran gjøremålet
    },
    task: {
      fontSize: 20,
    },
    completedTask: {
      textDecorationLine: 'line-through',         
      color: 'gray',                           // Farge på gjøremålet når den er ferdig
    }, 
    swipeableContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'red',
      borderRadius: 10,
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    deleteButtonText: {
      color: 'white',             // Farge på skirften på delete knappen
      fontWeight: 'bold',
    },
    addButton: {
      position: 'absolute',
      bottom: 25,
      right: 25,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#fddae9',          //Farge på knappen 
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: 'white',    //Farge på krysset
      fontSize: 35, 
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',       //Farge på filteret som kommer når man skal legge til et gjøremål 
    },
    modalContainer: {
      width: '90%',
      backgroundColor: 'white',      //Farge på boksne man skirver Gjøremålet inn i
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: '85%',
      borderColor: '#f9a7ca',     //farge på linjen rundt 
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    addTaskButton: {
      backgroundColor: '#f9a7ca',         //Farge på Legg til
    },
    cancelButton: {
      backgroundColor: 'gray',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default App;