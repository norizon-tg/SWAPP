import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyA-mRmgw68hsOA-V8GDu5IYeo9OHn1i3zo",
  authDomain: "swapp-da9be.firebaseapp.com",
  databaseURL: "https://swapp-da9be.firebaseio.com",
  projectId: "swapp-da9be",
  storageBucket: "swapp-da9be.appspot.com",
  messagingSenderId: "775523048049",
  appId: "1:775523048049:android:2241f45bb2d16b81"
  });
}




export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false
  };

  

  
  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];
    const userId = (firebase.auth().currentUser.uid).toString();
    const path = "/UserAccounts/" + userId.toString();

    Keyboard.dismiss();
    this.setState({ loading: true });

    // // check with backend API or with some static data
    // if (email !== VALID_EMAIL) {
    //   errors.push("email");
    // }
    // if (password !== VALID_PASSWORD) {
    //   errors.push("password");
    // }

    // this.setState({ errors, loading: false });

    // if (!errors.length) {
    //   navigation.navigate("Browse");
    // }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
      this.setState({ errors, loading: false });
      var addUser = firebase.database().ref(path).push({ Email: email,  Usermame: username, Password: password});
      this.props.navigation.navigate('Browse');
    })
    .catch(() =>{
      this.setState({error:'Authentication failed', loading: false});

    })

  }


  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAwareScrollView 
      style={{ backgroundColor: '#FFFFFF' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      >
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
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
  }
});
