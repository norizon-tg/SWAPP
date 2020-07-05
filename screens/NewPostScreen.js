// screens/NewPostScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from "react";
import { Image, TextInput, View } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Fire from '../Fire';


export default class NewPostScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <Item
          title="Share"
          onPress={() => {
            const text = this.props.navigation.getParam('text');
            const image = this.props.navigation.getParam('image');
            if (text && image) {
              this.props.navigation.navigate("NewPostScreen");
              Fire.shared.post({ text: text.trim(), image });
            } else {
              alert('Need valid description');
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  state = { text: '' };

  render() {
    const { navigation } = this.props.navigation;
    const { image } = this.props.navigation.state.params;
    return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={text => {
            this.setState({ text });
            this.props.navigation.setParams({ text });
          }}
        />
      </View>
    );
  }
}