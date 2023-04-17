//Brainy Traveler - AV1 Mobile
//por: José Hugo Chaves Filho

//imports:
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

//execution:
export default function App() {
 const [topic, setTopic] = useState(false);
 const [inputtopic, setInputtopic] = useState('');
 const [list, setList] = useState ([]);



 useEffect(() =>{
  AsyncStorage.getItem('List').then(storelist => {
    if (storelist){
      setList(JSON.parse(storelist));
    }
  });

 }, []);
 const removetopic = async (index) => {
    const newlist = [...list];
    newlist.splice(index, 1);
    setList(newlist);
    await AsyncStorage.setItem('list', JSON.stringify(newlist));
 };

 

 const pressbutton = () => {
    setTopic(true);
 }
 const savebutton = async () => {
  setTopic(false);

    const newlist = [...list, inputtopic];
    setList(newlist);
    await AsyncStorage.setItem('List', JSON.stringify(newlist));
      setInputtopic('');

 };
 
 
  return (
    <ScrollView style={styles.background}>
      <Image
        source={require('./assets/Logo_BT.png')}
        style={styles.Logo}
      />

      <View style={styles.add}>
        {!topic && (
          <TouchableOpacity style={styles.addtext}
          onPress={pressbutton}>

          <AntDesign name="pluscircleo" size={28} color="black" />
          <Text style={styles.addtext}> Add Topics</Text>

          </TouchableOpacity>
        )}
      </View>
      {topic && (
        <><View style={styles.input}>
          <TextInput multiline value={inputtopic} onChangeText={setInputtopic} placeholder='Your Topic!' />
        </View>

        <View style={styles.button}>
            <Button style={styles.button} title="Save Topic"
              color='#ADD8E6'
              onPress={savebutton} />
          </View></>

      )}
      {
        list.map(
          (item,index) => {
            return (
              <View style={styles.input}>
                <Text key={index}> {item} </Text>
                <TouchableOpacity onPress={() => removetopic(index)}>
                <AntDesign name="closecircle" size={28} color="black" />
                </TouchableOpacity>
              </View>
            )
          })
      }

      <StatusBar style="auto" />

    </ScrollView>
  );
}
//Styles:
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e4f4fd',
    marginTop: 25,
  },
  Logo: {
    width: 360,
    height: 120,
    marginLeft: 11.25,
  },
  add: {
    borderBottomWidth: 0.875,
    borderTopWidth: 0.875,
    borderLeftWidth: 0.875,
    borderRightWidth: 0.875,

    marginTop: 5,
    height: 95.875,

    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30.5,
  },
  addtext: {
    fontSize: 22,
    flexDirection: 'row',
  },
  input: {
    display: 'flex',
    marginRight: 4,
    marginLeft: 4,
    marginTop: 5.5,
    
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    
    borderLeftWidth: 0.875,
    borderRightWidth: 0.875,
    borderBottomWidth: 0.875,
    borderTopWidth: 0.875,
  },
  button: {
    width:100,
    paddingTop: 10,
    marginLeft: 142.25,
  },

  },

);
