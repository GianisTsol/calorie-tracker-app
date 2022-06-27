import React, { useState, useEffect } from "react";

import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, Pressable } from "react-native";

import { useAsyncStorage, storeData, getData } from './BetterAsync.js';

import Context from './Context.js';


const Index = ({route, navigation}) => {
    const cont = React.useContext(Context);

    function ConvertToday(details, foods) {
      let today = [];
      details.map(function ([id, amount], index) {
        let newfood = JSON.parse(JSON.stringify({...foods[id - 1]}));
        newfood = {...Object.assign(newfood, {Tindex: index, isToday: true, amount: amount})};
        for (const [key, value] of Object.entries(newfood.nuts)) {
          value.value = parseInt(value.value * (amount / 100))
        }
        today.push(newfood);
      });
      return today;
      console.log(today);
    }

    function toArchive() {
      //let kk = new Date().toLocaleString();
      //setArchive([...archive, `@archive-${kk}`]);
      //storeData(`@archive-${kk}`, [...today]);
      cont.setToday([]);
    }

  const Front = () => {
    const getItem = (item) => {
      navigation.navigate('Details', {data: item});
    };


    const ItemView = ({ item }) => {
      console.log(item);
      return (
        <>
        <View style={styles.foodView}>
          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.name.toUpperCase()}
          </Text>
          <Text style={styles.amountText} onPress={() => getItem(item)}>
            {item.amount}g
          </Text>
        </View>
        <View style={{width: "100%", height: 2, backgroundColor: "grey"}}></View>
        </>
      );
    };


    return (
        <View style={styles.container}>
          {(cont.today.length > 0) ? <>

            <View style={styles.listView}>
            <View style={{width: "100%", height: 2, backgroundColor: "grey"}}></View>
            <FlatList
              data={ConvertToday(cont.today, cont.foods)}
              style={styles.list}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={(item) => <ItemView item={item.item}/>}/>
            <Pressable onPress={toArchive} style={styles.savebtn}><Text style={styles.btntext}>Archive</Text></Pressable>
          </View>

          </> : null}
          {(cont.today.length == 0) ? <Text style={styles.emptyText}>Nothing eaten yet.</Text> : null}
        </View>
    );
  }


  return <Front/>;
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
    alignSelf: "center",
    margin: 10,
  },

  amountText: {
    color: "grey",
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
    backgroundColor: 'lightblue',
    height: "5%",
  },
  btntext: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  }
});

export default Index;
