import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList } from 'react-native';

function saveChanges(data) {

}

const NutrientEntry = (props) => {
  console.log(props);
  props.nutrient.value = props.nutrient.value.toString();
  const [value, setValue] = useState(props.nutrient.value);
  return(
    <View>
      <View style={styles.row}>
        <Text numberOfLines={1} style={styles.nutrientText2}>{props.name}</Text>
        <TextInput keyboardType="numeric" style={styles.nutrientText} placeholder={props.nutrient.value} value={value} onChangeText={setValue}/>
        <Text style={styles.nutrientText}>{props.nutrient.unit}</Text>
      </View>
      <View style={styles.rowSeparator}/>
    </View>
  );
}

export default function Editor({route, navigation}) {
  const [name, setName] = useState(route.params.name);
  const [image, setImage] = useState(route.params.image);

  var formated = [];
  for (const [key, value] of Object.entries(route.params.nuts)) {
    formated.push({name: key, nutrient: value});
  };

  return (
    <View style={{width: "100%", flexDirection: "column", height: "100%"}}>
      <Text>Food id: {route.params.id}</Text>
      <Button title={"Save"} onPress={() => {}}/>

      <Text style={styles.inputLabel}>Name: </Text>
      <TextInput style={styles.input} onChangeText={setName} value={name}/>

      <Text style={styles.inputLabel}>Image uri: </Text>
      <TextInput style={styles.input} onChangeText={setImage} value={image}/>

      <View style={{height: 3, backgroundColor: "grey", width: "100%"}}/>
      <FlatList
        data={formated}
        style={{flex: 1}}
        keyExtractor={item => item.name}
        renderItem={(item) => <NutrientEntry name={item.item.name} nutrient={item.item.nutrient}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    marginTop: 1,
    borderWidth: 1,
    padding: 10,
  },

  inputLabel: {
    padding: 10,
  },
  // NUTRIENT TABLE
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 2,
  },
  rowSeparator: {
    width: "100%",
    backgroundColor: "grey",
    height: 1,
  },
  nutrientText2: {
    flex: 5,
    fontWeight: "600",
    fontSize: 16,
    flexWrap: "nowrap",
    padding: 4,
    paddingRight: 45,
  },
  nutrientText: {
    flex: 1,
    fontWeight: "800",
    fontSize: 14,
    padding: 4,
  },
});
