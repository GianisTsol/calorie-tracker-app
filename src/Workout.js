import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, TouchableHighlight, Button } from "react-native";

const Seperator = (props) => (
  <View style={styles.seperator}/>
)


const First = ({navigation}) => {
  const Session = (props) => (
    <TouchableHighlight onPress={() => {navigation.navigate("Excercises")}} onLongPress={() => {}} underlayColor="white">
      <View style={styles.session}>
        <Text>{props.name}</Text>
      </View>
    </TouchableHighlight>
  )

  let sessions = ["Push", "Pull", "Legs"];
  return (
      <View>
      <FlatList
        data={sessions}
        style={styles.list}
        keyExtractor={item => item}
        renderItem={(item) => <Session name={item.item}/>}
      />
      </View>
    )
}

const Second = ({navigation}) => {
  const Excercise = (props) => {
      return (
        <TouchableHighlight onPress={() => {navigation.navigate("Excercises")}} onLongPress={() => {}} underlayColor="white">
          <View style={styles.session}>
            <Text>{props.name}</Text>
          </View>
        </TouchableHighlight>
        )
  }

  let excercises = ["Bench", "epiklinhs"];
  return (
      <View>
      <FlatList
        data={excercises}
        style={styles.list}
        keyExtractor={item => item}
        renderItem={(item) => <Excercise name={item.item}/>}
      />
      </View>
    )
}

const Third = ({navigation}) => {
  const Set = (props) => {
      return (
          <View style={styles.set}>
            <Text>{props.reps}</Text>
            <Text>{props.weight}</Text>
          </View>
        )
  }

  const SeperateSets = (props) => {
    console.log(props);
    return (
      <View>
        <Text>{props.date}</Text>
        <FlatList
          data={excercises}
          style={{}}
          keyExtractor={item => item}
          renderItem={(item) => <Set reps={item.reps} weight={item.weight}/>}
        />
      </View>
    )
  }

  const Sets = (props) => {
      return (
            <FlatList
              data={props.sets}
              style={styles.list}
              keyExtractor={item => item}
              renderItem={(item) => <SeperateSets date={item.item.date} sets={item.item.sets}/>}
            />
        )
  }

  let data = [{date: "22/11/22", sets: [{weight: 22, reps: 10}]}];
  return (
      <Sets sets={data}/>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  set: {
    width: "100%",
    height: "100%",
    borderWidth: 4,

  },
  session: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    padding: 10,
    borderBottomWidth: 1,
  },

  seperator: {
    width: "100%",
    backgroundColor: "grey",
    height: 2,
  },
  excercise: {
    height: 20,
    width: "100%",
  },
  list: {
    width: "100%",
    height: "100%",
  }
});


export {First, Second, Third};
