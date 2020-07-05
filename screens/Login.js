import React, { Component, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as firebase from 'firebase';
import * as Analytics from 'expo-firebase-analytics';
import * as Facebook from 'expo-facebook';
import { AccessToken, LoginManager } from "react-native-fbsdk";


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

const VALID_EMAIL = "contact@react-ui-kit.com";
const VALID_PASSWORD = "subscribe";

const isLoggedin = false;
const userData = null;
const isImageLoading = false;

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

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
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>{
      this.setState({ errors, loading: false });
      this.props.navigation.navigate('Browse');
      Analytics.logEvent('login', {
        hero_name: 'Saitama'
      });
    })
    .catch(() =>{
      this.state({error:'Authentication failed', loading: false});

    })

  }

  //Facebook Login
  facebookLogIn = async () => {
    
    try {
      Facebook.initializeAsync("289394658646949", "SWAPP");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('897285013968583', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        this.props.navigation.navigate('Browse');
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(result => {
            if (result.isCancelled) {
              console.log("Login was cancelled");
            }
            return AccessToken.getCurrentAccessToken();
          })
          .then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(credential)
            console.log("Successfully Login", result);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  //Facebook Login 2

  

  logout = () => {
    
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
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>
            
            <Button gradient onPress={() => this.facebookLogIn()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login with Facebook
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
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
  }
});
