import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';







export default class Upload extends React.Component {
  state = {
    desiredValue: '', itemName: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  upload = async () => {
    //Upload File
    setTimeout(() =>{
      const { desiredValue, itemName } = this.state
      
      try {
        const userId = (firebase.auth().currentUser.uid).toString();
        //Path to Item in Firebase Real-time Database
        //Also add item 
        var addItem = firebase.database().ref('Items/').child(userId).push({ itemName: itemName,  desiredValue: desiredValue}).getKey();
        
        //const path = userId.toString() + "/" + itemId.toString();

      
        // // To Update an Item
        // firebase.database().ref('users/004').update({
        //   name: 'Pheng Sengvuthy'
        //  });

         // To Remove a Item
        //firebase.database().ref('users/004').remove();
      } catch (err) {
        console.log('Error Uploading Item', err)
      }
    });

  }
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Item Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('itemName', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Desired Value'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('desiredValue', val)}
        />
        <Button
          title='Upload'
          onPress={this.upload}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})