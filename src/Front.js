import React, { useState, useEffect } from "react";

import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, Pressable } from "react-native";
import foods from './assets/foods.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useAsyncStorage, storeData, getData } from './BetterAsync.js';

import Context from './Context.js';


const Tab = createMaterialTopTabNavigator();

const Index = ({route, navigation}) => {
    const cont = React.useContext(Context);

    let today = new Array;
    cont.today.map(function ([id, amount], index) {
      let newfood = JSON.parse(JSON.stringify({...foods[id - 1]}));
      newfood = {...Object.assign(newfood, {Tindex: index, isToday: true, amount: amount})};
      for (const [key, value] of Object.entries(newfood.nuts)) {
        value.value = parseInt(value.value * (amount / 100))
      }
      today.push(newfood);
    });

    let totalNuts = new Object;
    today.map(function (food, index) {
      for (const [key, value] of Object.entries(food.nuts)) {
        if (totalNuts[key] === undefined) {
          totalNuts[key] = JSON.parse(JSON.stringify(value));
        }
        else {
          totalNuts[key].value = totalNuts[key].value + JSON.parse(JSON.stringify(value.value));
        }
      }
    });
    function toArchive() {
      //let kk = new Date().toLocaleString();
      //setArchive([...archive, `@archive-${kk}`]);
      //storeData(`@archive-${kk}`, [...today]);
      cont.setToday([]);
      console.log(today);
    }

  const Front = () => {
    const getItem = (item) => {
      navigation.navigate('Details', {data: item});
    };


    const ItemView = ({ item }) => {
      return (
        <View style={styles.foodView}>
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.name.toUpperCase()}
          </Text>
        </View>
      );
    };


    return (
        <View style={styles.container}>
          {(today.length > 0) && <><View style={styles.listView}>
            <FlatList
              data={today}
              style={styles.list}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={(item) => <ItemView item={item.item}/>}/>
            <Pressable onPress={toArchive} style={styles.savebtn}><Text style={styles.btntext}>Archive</Text></Pressable>
          </View>
          </>
        }
          {(today.length == 0) && <Text style={styles.emptyText}>Nothing eaten yet.</Text>}
        </View>
    );

  }

  const Nutrients = ({foods}) => {


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


    const NutrientTable = (props) => {

      let formated = [{name: "Nutrient", nutrient: {value: "Value", unit:"Unit"}}];

      for (const [key, value] of Object.entries(props.nuts)) {
        formated.push({name: key, nutrient: value});
      };

      return (
        <View style={styles.nutrientTable}>
          <View style={{height: 3, backgroundColor: "grey"}}/>
          <FlatList
            data={formated}
            keyExtractor={item => item.name}
            renderItem={(item) => <NutrientEntry name={item.item.name} nutrient={item.item.nutrient}/>}
          />
        </View>
      );
    }


    return (
      <View style={styles.totalView}>
        <NutrientTable nuts={totalNuts}/>
      </View>
    );
  }

  return (
    <Tab.Navigator>
        <Tab.Screen name="Foods" component={Front} />
        <Tab.Screen name="Nutrients" component={Nutrients} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  listView: {
    flex: 6,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  totalView: {
    flex: 1,
    borderWidth: 2,
    width: "100%",
  },
  itemStyle: {
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
    textAlign: "center",
  },

  list: {
    width: "100%"
  },

  foodView: {
    flex: 1,
    width: "90%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    margin: 10,
  },
  foodImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: "100%",
  },
  nutrientTable: {
    width: "100%",
    flex: 4,
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
  savebtn: {
    width: "70%",
    margin: "2%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ada953',
    height: "5%",
  },
  btntext: {
    fontSize: 18,
    fontWeight: "600",
  }
});

export default Index;
