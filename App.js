import React from "react";
import { StyleSheet } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation";
import { Block } from "./components";

import firebase from 'firebase';

import { Buffer } from 'buffer';
global.Buffer = Buffer;


// import all used images
const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/avatar.png")
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentWillMount(){
    if (!firebase.apps.length) {
      firebase.analytics();
      firebase.initializeApp({
        apiKey: "AIzaSyA-mRmgw68hsOA-V8GDu5IYeo9OHn1i3zo",
        authDomain: "swapp-da9be.firebaseapp.com",
        databaseURL: "https://swapp-da9be.firebaseio.com",
        projectId: "swapp-da9be",
        storageBucket: "swapp-da9be.appspot.com",
        messagingSenderId: "775523048049",
        appId: "1:775523048049:android:2241f45bb2d16b81",
        measurementId: "G-JTPK1VERLZ"
      });
    }
  }


  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
