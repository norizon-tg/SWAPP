import React, { Component, useState } from "react";
import {
  View,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";

import { Button, Block, Input, Text, Divider} from "../components";


import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import SelectPhotoScreen from '../screens/SelectPhotoScreen';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import getPermission from "../utils/getPermission";

import ImageLoad from 'react-native-image-placeholder';
import Textarea from 'react-native-textarea';


const options = {
  allowsEditing: true,
  noData: true
};

export default class Upload extends React.Component {
  state = {
    errors: [],
    loading: false,
    itemName: '',
    desiredValue: '', 
    description: '',
    preferredItems: '',
    modeOfTrade: '',
    image: null,
    
  };
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  upload = async () => {
    //Upload File
    setTimeout(() =>{
      const { desiredValue, itemName, description, condition, preferredItems, modeOfTrade, } = this.state
      
      try {
        const userId = (firebase.auth().currentUser.uid).toString();
        //Path to Item in Firebase Real-time Database
        //Also add item 
        var addItem = firebase.database().ref('Items/').child(userId).push({ itemName: itemName,  desiredValue: desiredValue, desription: description, condition: condition, preferredItems: preferredItems, modeOfTrade: modeOfTrade, imagePath: userId}).getKey();
        var storageRef = firebase.storage().ref('Images/').child(userId).push({image: result.uri});
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

  _selectPhoto = async (uri) => {
    
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.uploadImage(result.uri);
        navigation.closeDrawer();
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  uploadImage = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const userId2 = (firebase.auth().currentUser.uid).toString();
    var ref = firebase.storage().ref().child("Images/" + userId2);
    return ref.put(blob);
  }
 
  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.closeDrawer();
      }
    }
  };
 
  
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    const { product } = this.props;
    let { image } = this.state;

    return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 0.1}}
        >
      <KeyboardAwareScrollView 
      style={{ backgroundColor: '#FFFFFF' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      >
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Upload
          </Text>
          <Block middle>
          <View style={styles.container}>
            
            <TouchableOpacity onPress={()=>this._selectPhoto()}>
              
              {image &&
                  <Image
                  style={{flex: 1, width: "100%", height: height / 2.8}}
                  source={{ uri: image }}
                />
              }
              {!image&&
               <Image
               style={{flex: 1, width: "100%", height: height / 2.8}}
               source={{ uri: 'https://4.bp.blogspot.com/-lYq2CzKT12k/VVR_atacIWI/AAAAAAABiwk/ZDXJa9dhUh8/s0/Convict_Lake_Autumn_View_uhd.jpg' }}
             />
              }
            </TouchableOpacity>
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style = {{fontSize: 20, color: 'white'}}>Add Image</Text>
            </View>
          </View>
            <Input
              label="Item Name"
              error={hasErrors("itemName")}
              style={[styles.input, hasErrors("itemName")]}
              defaultValue={this.state.itemName}
              onChangeText={val => this.onChangeText('itemName', val)}
            />
            <Input
              label="Desired Value"
              error={hasErrors("desiredVale")}
              style={[styles.input, hasErrors("desiredValue")]}
              defaultValue={this.state.desiredValue}
              onChangeText={val => this.onChangeText('desiredValue', val)}
            />
            <Textarea
              label="Description"
              error={hasErrors("description")}
              style={[, hasErrors("description")]}
              defaultValue={this.state.description}
              onChangeText={val => this.onChangeText('description', val)}
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              defaultValue={this.state.text}
              maxLength={200}
              placeholder={'Description'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
            <Input
              label="Condition"
              error={hasErrors("condition")}
              style={[styles.input, hasErrors("condition")]}
              defaultValue={this.state.condition}
              onChangeText={val => this.onChangeText('condition', val)}
            />
            <Input
              label="Preferred Items"
              error={hasErrors("preferredItems")}
              style={[styles.input, hasErrors("preferredItems")]}
              defaultValue={this.state.preferredItems}
              onChangeText={val => this.onChangeText('preferredItems', val)}
            />
            <Input
              label="Mode of Trade"
              error={hasErrors("modeOfTrade")}
              style={[styles.input, hasErrors("modeOfTrade")]}
              defaultValue={this.state.modeOfTrade}
              onChangeText={val => this.onChangeText('modeOfTrade', val)}
            />
            <Button gradient onPress={() => this.upload()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Upload
                </Text>
              )}
            </Button>
            
            <Button gradient onPress={() => this.upload()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Pawn
                </Text>
              )}
            </Button>

          </Block>
        </Block>
      </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  mainImage: {

  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});