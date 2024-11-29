import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity,} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const ToDoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
      setModalVisible(false);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === id);
      const updatedTask = { ...prevTasks[taskIndex], completed: !prevTasks[taskIndex].completed };

      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      if (updatedTask.completed) {
        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.unshift(updatedTask);
      }

      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item, drag }) => (
    <Swipeable
      onSwipeableOpen={() => deleteTask(item.id)}
      overshootRight={false}
      rightThreshold={50}
      renderRightActions={() => (
        <View style={styles.swipeableContainer}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View>
      )}
    >
      <TouchableOpacity
        style={styles.taskContainer}
        onLongPress={drag}
        onPress={() => toggleTaskCompletion(item.id)}
      >
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={[styles.circle, item.completed && styles.filledCircle]} />
        </View>
        <Text style={[styles.task, item.completed && styles.completedTask]}>{item.text}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <DraggableFlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setTasks(data)}
          renderItem={renderTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Skriv gjøremålet inn her.."
                value={task}
                onChangeText={setTask}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.addTaskButton]}
                  onPress={addTask}
                >
                  <Text style={styles.modalButtonText}>Legg til</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Avbryt</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const Settings = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Innstillinger</Text>
  </View>
);

const Ranking = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Her kommer rangering og informasjon!</Text>
  </View>
);

const Katt = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Kattepus</Text>
  </View>
);

const Autentisering = () => {  
const [initializing, setInitializing] = useState(true);
const [user, setUser] = userState();

function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const abonnent  = auth().onAuthStateChanged(onAuthStateChanged);
  return abonnent;
}, []);

if (initializing) return null;

if (!user) {

  auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword')
  .then(() => {
    console.log( 'User account created & signed in!');
  })
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    console.log('That email adress is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    console.log('That emial adress is invalid!');
  }

  console.error(error);
});

  return (
    <view>
      <Text>Login</Text>
    </view>
  );
}

return (
  <view>
    <text>Welcome {user.email}</text>
    <button title="Sign Out" onProgress={() => {
      auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    }}
    />
    </view>
 );
};



const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="To-Do List" component={ToDoList} />
      <Drawer.Screen name="Innstillinger" component={Settings} />
      <Drawer.Screen name="Rangering" component={Ranking} />
      <Drawer.Screen name="Katt" component={Katt} />
    </Drawer.Navigator>
  </NavigationContainer>
);

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
