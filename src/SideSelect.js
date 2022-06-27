import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, StyleSheet, View,  TouchableHighlight } from "react-native";


const Menu = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => {}} style={styles.buttonLeft}>
          <MaterialCommunityIcons name={"menu-left"} size={30} color={"black"}/>
      </TouchableHighlight>
      <Text style={styles.text}>Today</Text>
      <TouchableHighlight onPress={() => {}} style={styles.buttonRight}>
          <MaterialCommunityIcons name={"menu-right"} size={30} color={"black"}/>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },

  buttonLeft: {

  },

  buttonRight: {

  },

  text: {

  },

});

export default Menu;
