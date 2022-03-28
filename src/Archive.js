import React from "react";

import { SafeAreaView, Text, StyleSheet, View, FlatList, Image } from "react-native";

import Context from './Context.js';

const SlotView = (props) => {
  return (
      <View style={styles.SlotView}>
        <Text>
          {props.name}
        </Text>
      </View>
        )
}

export default function Index () {
  const cont = React.useContext(Context);
  console.log(cont);
    return (
      <View style={styles.container}>
        <FlatList
          data={cont.slots}
          style={styles.list}
          keyExtractor={item => item}
          renderItem={(item) => <SlotView name={item.item}/>}
        />
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  list: {
    width: "100%",
    height: "100%",
    borderWidth: 4,

  },
  SlotView: {
    height: 20,
    width: "90%",
    borderWidth: 2,
    borderColor: "red"
  }
});
