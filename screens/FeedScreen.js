import firebase from "firebase";
import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";

import List from "../components/List";
import Fire from "../Fire";

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;
console.disableYellowBox = true;
export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {}
  };

 

  render() {
    // Let's make everything purrty by calling this method which animates layout changes.
    
    const items = [];
    const userId = (firebase.auth().currentUser.uid);
    var rootRef = firebase.database().ref("Items");
    var urlRef = rootRef.child(userId);
    urlRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val().itemName;
        console.log(childData);
        var itemName = childData.toString();
        items.push(itemName);
      });
  });

    LayoutAnimation.easeInEaseOut();
    return (
      <List
        data={items}
      />);
  }
}
