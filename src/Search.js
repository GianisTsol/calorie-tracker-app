import React, { useState, useEffect } from "react";

import { SafeAreaView, Text, StyleSheet, View, FlatList, Image } from "react-native";
import { SearchBar } from "react-native-elements";

import foods from "./assets/foods.json"

const Searcher = ({props, navigation}) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(foods);
    setMasterDataSource(foods);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    if (item.image === undefined || item.image == "")
      {item.image = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=150"};
    return (
      <View style={styles.foodView}>
        <Image source={{ uri: item.image }} style={styles.foodImage}/>
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.name.toUpperCase()}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black"
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate('Details', {data: item});
  };

  return (
    <SafeAreaView style={styles.safev}>
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
          style={styles.bar}
        />
        <ItemSeparatorView/>
        <FlatList
          data={filteredDataSource}
          style={styles.list}
          keyExtractor={item => item.id}
          renderItem={(item) => <View key={item.item.id}>
                                  <ItemView item={item.item}/>
                                  <ItemSeparatorView/>
                                </View>
                      }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  itemStyle: {
    padding: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  bar: {
    marginBottom: 2,
    width: "100%",
  },
  safev: {
    flex: 1,
    width: "100%",
  },
  list: {
    flex: 1,
  },

  foodView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  foodImage: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
  },
});

export default Searcher;
