import React, {useState} from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableHighlight, TextInput, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './Context.js';

export default function DetailsPanel({route, navigation}) {
  const cont = React.useContext(Context);
  const props = route.params.data;

  if (props.amount === undefined) {
    props.amount = 100;
  }
  const [hidden, hide] = useState(false);

  const NutrientEntry = (props) => {
    return(
      <View>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.nutrientText2}>{props.name}</Text>
          <Text style={styles.nutrientText}>{props.nutrient.value}</Text>
          <Text style={styles.nutrientText}>{props.nutrient.unit}</Text>
        </View>
        <View style={styles.rowSeparator}/>
      </View>
    );
  }

  const NutrientTable = () => {
    const data = props.nuts;

    var formated = [{name: "Nutrient", nutrient: {value: "Value", unit:"Unit"}}];
    for (const [key, value] of Object.entries(data)) {
      formated.push({name: key, nutrient: value});
    };

    return (
      <View style={styles.nutrientTable}>
        <Text style={styles.showText}>Showing for: {props.amount}g</Text>
        <View style={styles.nutrientList}>
          <View style={{height: 3, backgroundColor: "grey", width: "100%"}}/>
          <FlatList
            data={formated}
            keyExtractor={item => item.name}
            renderItem={(item) => <NutrientEntry name={item.item.name} nutrient={item.item.nutrient}/>}
          />
        </View>
      </View>
    );
  }

  const OptionButton = (props) => {
    return (
      <TouchableHighlight onPress={props.action}
              style={[styles.optionButton, {backgroundColor: props.color}]}
              underlayColor={props.color}>
          <MaterialCommunityIcons name={props.icon} size={30} color={styles.optionButton.borderColor}/>
      </TouchableHighlight>

    );

  }

  function clone () {
    navigation.navigate("Edit", props);
  }

  function eat (amount) {
      let x = cont.today;
      x.push([props.id, amount]);
      cont.setToday(x);
      navigation.navigate("Today");
  }

  function rem () {
    let x = route.params.today;
    const index = props.Tindex;
    if (index > -1) {
      x.splice(index, 1); // 2nd parameter means remove one item only
    }
    cont.setToday(x);
    navigation.navigate("Today");
  }

  const WeightField = () => {
    const [value, setValue] = useState("");
    return (
      <View style={styles.weightContainer}>
        <View style={styles.weightContainer1}>
          <TextInput
            placeholder={"weight"}
            value={value.toString()}
            onChangeText={setValue}
            style={styles.weightInput}
            keyboardType="numeric"
            />
          <Pressable onPress={() => eat(value)} title={"Submit"} style={styles.weightButton}>
            <Text style={styles.weightText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    );

  }

  const FoodHeader = () => {
    return (
        <View style={styles.containerTop}>
          <Text numberOfLines={2} style={styles.textHeader}>{props.name}</Text>
          {/* <Image source={{ uri: props.image }} style={styles.imageHeader}/> */}
        </View>
    );
  }

  const showDelete = props.isToday != null ? true : false;
  const Buttons = () => {
    return (
        <View style={styles.buttonContainer}>
          {
          !showDelete && <>
            <OptionButton action={clone} icon="plus-box-multiple" color="#ff4e50"/>
            <OptionButton action={() => hide(true)} icon="plus-thick" color="#fc913a"/>
            <OptionButton action={() => navigation.navigate("Edit", props)} icon="pencil" color="#f9d62e"/>
          </>
          }
          {showDelete && <OptionButton action={rem} icon="trash-can" color="#ff4e50"/>}
        </View>
    );
  }

  const [vvalue, setvValue] = useState(props);
  // This will launch only if propName value has chaged.
  React.useEffect(() => { setvValue(props) }, [props]);
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <FoodHeader name={props.name} imgSrc={props.image}/>
        {!hidden && <Buttons/>}
        {hidden && <WeightField hide={hidden}/>}
      </View>
      <NutrientTable/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "flex-start",
  },
  containerHeader: {
    flex: 2.5,
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    width: "90%",
  },
  containerTop: {
    flex: 2.5,
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },

  textHeader: {
    flex: 1,
    fontSize: 22,
    padding: 5,
    color: "black",
    fontWeight: "bold",
    textAlign: 'center'
  },
  imageHeader: {
    flex: 3,
    width: "100%",
    borderWidth: 2,
    borderColor: "black"
  },
  buttonContainer: {
    flex: 3,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  optionButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#414a4c",
    borderRadius: 10,
    height: 85,
    width: 85,

  },
  //WEIGGHT INPUT
  weightContainer: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  weightContainer1: {
    flexDirection: "row",
    borderRadius: 15,
    borderWidth: 3
  },
  weightInput: {
    flex: 3,
    padding: 10,
    height: 85,
    fontSize: 23,
  },
  weightButton: {
    flex: 1,
    height: 85,
    backgroundColor: "#008057",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  weightText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  // NUTRIENT TABLE
  nutrientTable: {
    width: "100%",
    flex: 5,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    flexShrink: 3,
  },
  nutrientList: {
    flex: 8,
    width: "100%",
  },
  showText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    flexGrow: 1,
  },
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
