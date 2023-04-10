import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView,TextInput,Button, Pressable, Alert, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import funnyBot from "./assets/Dancer.gif"
import trash from "./assets/whitetrash.png"
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function App() {

  const [holder,setHolder] = React.useState([{taskName:"Default Task"}])
  const [hold,setHold] = React.useState("")
  const [showaddTask, setshowaddTask] = React.useState(false)
  const [indexer, setIndexer] = React.useState([]);
  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  async function logPromiseResult() {
    test = await getUser()
    console.log(test)
    setHolder(test)
    
  }

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      return currentUser
      
    } catch (error) {
      console.log(error);
    }
  }







  
  React.useEffect(()=>{
    getUser()
    logPromiseResult()
    
  },[])
  
  React.useEffect(()=>{
    storeUser(holder)
  },[holder])

  

  function logger(){
    if(hold.length>0){
    setHolder([...holder,{taskName:hold,isGreen:false}])
    setHold("")
    setshowaddTask(false)
    }
  }
  function toggle(){
    setshowaddTask(!showaddTask)
  }


  function indexActive(index){
    if(!holder[index].isGreen){
      let holderino = [...holder];
      holderino[index].isGreen=true
      console.log(holderino)
      setHolder(holderino)
    }

    else if(holder[index].isGreen){
      let holderino = [...holder];
      holderino[index].isGreen=false
      console.log(holderino)
      setHolder(holderino)
    }
    
    
  }

  function remove(index){
    console.log(index)
    console.log(holder.length)
    length = holder.length
    let newHolder = holder.slice(0,index)
    let holder2 = holder.slice(index+1,length)
    console.log(newHolder + holder2)
    if(index == 0 && length==1){
      console.log("uhohhhhh")
      newHolder = []
      
    }
    setHolder(newHolder.concat(holder2))
  }
  
  const createTwoButtonAlert = () =>
    Alert.alert('Warning!', 'Are you sure you want to Delete All Tasks?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setHolder([]) },
    ]);

    const inputRef = React.useRef()
  return (
    <View style = {styles.test}>
      <View style={{flexDirection:"row",marginTop: "10%"}}>
        <Image source = {funnyBot} style={styles.imageStyles}></Image>
        <StatusBar style = "light"/>
        <Text style = {styles.text}>Task Bot</Text>
      </View>
      {showaddTask&&<View style = {{width:"100%",alignItems:"center", fontSize:20}}>
        
        
        <View style = {{flexDirection:"row", }}> 
        <TextInput autoFocus style = {styles.input} onChangeText={setHold} value = {hold} onSubmitEditing={logger}></TextInput>
            <View style = {styles.button1}>
              <Button color = "white"title = "Add a Task" onPress={logger}/>
            </View>
          </View>
          <View style = {styles.button2}>
              <Button  color = "white"title = "Clear Tasks" onPress={createTwoButtonAlert}/>
            </View>
      </View>}
      <View style = {{flexDirection:"row",height:"78%",alignItems:"flex-end"}}>
        <ScrollView style = {{height:"100%"}}>
          
          {
            holder.map((task,index) =>
                <Pressable key = {index} style = {task.isGreen ? styles.taskClicked:styles.tasknotClicked}  onPress={()=>indexActive(index)}>
                  <Text style = {{color:"white",fontSize:24}}>{task.taskName}</Text>
                  <Pressable key = {index} title= "Remove" color = "red" style = {{marginLeft:10}} onPress={()=>remove(index)}>
                  <Image source = {trash} style={{width:50,height:50}}></Image>
                  </Pressable>
                </Pressable>
            )
          }
        </ScrollView>

        
      </View>
      
      <View style = {{marginBottom:50,flexDirection:"row", width: "100%", justifyContent:"flex-end"}}>
      {!showaddTask&&<View>
          <Pressable style ={styles.addTask} title='' onPress={toggle}>
              <Text style= {{fontSize:40,color:"white"}}>+</Text>
          </Pressable>
          
        </View>}
        
      </View>
      
    </View>

  );
}

const styles = StyleSheet.create({
  test:{
    height:"100%",
    backgroundColor: "#0c0749",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text:{
    fontSize:50,
    color:"white"
  },
  taskText:{
    fontSize:25
  }
  ,
  input:{
    height:40,
    width:"50%",
    backgroundColor:"white"
  },
  button1:{
    backgroundColor:"#072349",
    marginLeft:5

  },
  button2:{
    backgroundColor:"#490723",
    margin:10

  },
  buttons:{
    flexDirection:"row",
    borderColor:"black",
    borderWidth: 5,
    margin:10,
    justifyContent:"center"
  },
  imageStyles: {
    resizeMode: 'stretch',
    width: 50,
    height: 50,
    
  },
  task:{
    
    
    
  },
  taskClicked:{
    
    width:"100%",
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:5,
    justifyContent:"space-around",
    backgroundColor:"#85d1b4"
  },
  tasknotClicked:{
    backgroundColor:"#5e55c6",
    width:"100%",
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:5,
    justifyContent:"space-around",
  }
  ,
  addTask:{
    backgroundColor:"#490c07",
    borderRadius:50,
    width:70,
    height:70,
    marginBottom:10,
    marginRight:10,
    alignItems:"center",
    justifyContent:"center",

  }

});
