import React, { Component } from "react";
import {
  View,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";

import { FlatGrid } from 'react-native-super-grid';

import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const { width, height } = Dimensions.get("window");


   

class Explore extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null
  };

  handleSearchFocus(status) {
    Animated.timing(this.state.searchFocus, {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150 // ms
    }).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() =>
            isEditing ? this.setState({ searchString: null }) : null
          }
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon.FontAwesome
              name={isEditing ? "close" : "search"}
              size={theme.sizes.base / 1.6}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  }

  
  renderExplore() {
    const {uri} = this.state;
    const items = [];
    const userId = (firebase.auth().currentUser.uid);
    const ref = firebase.storage().ref('Images/' + userId);
    
    var rootRef = firebase.database().ref("Items");
    var itemNameRef = rootRef.child(userId);
    var valueRef = rootRef.child(userId);
    itemNameRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val().itemName;
        var childData2 = childSnapshot.val().desiredValue;
        var itemName = childData.toString();
        var desiredValue = childData2.toString();
        items.push({"itemName": itemName, "desiredValue": desiredValue});
        ref.getDownloadURL().then((url) => {
          this.setState({url: uri});
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
      });
  });
  
   
  

    return (
      <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableHighlight onPress={() => this.props.navigation.navigate("Product")}>
            
            <View style={[styles.itemContainer]} onPress={() => this.props.navigation.navigate("Product")}>
              <ImageBackground source={url} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.itemCode}>{item.desiredValue}</Text>
              </ImageBackground>
            </View>
        </TouchableHighlight>

      )}
    />
    );
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  }

  render() {
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Explore
          </Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    );
  }
}

Explore.defaultProps = {
  images: mocks.explore
};

export default Explore;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent"
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - theme.sizes.padding * 2.5,
    marginBottom: theme.sizes.base,
    resizeMode: "cover",
    flex: 1,
    borderRadius: 5,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4
  },
  
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 150,
    flex: 1,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: "-10%",
    paddingBottom: '5%'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
    marginTop: "2.5%"
  },
});
