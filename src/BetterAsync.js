import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';

const useAsyncStorage = (key, defaultValue) => {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue
  })
  const { hydrated, storageValue } = state

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(key)
    let value = defaultValue
    if (fromStorage) {
      value = JSON.parse(fromStorage)
    }
    setState({ hydrated: true, storageValue: value });
  }

  async function updateStorage(newValue) {
    setState({ hydrated: true, storageValue: newValue })
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, stringifiedValue);
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [state.storageValue, updateStorage];
};



const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e);
  }
}

export {useAsyncStorage, storeData, getData};

// https://github.com/react-native-async-storage/async-storage/issues/32#issuecomment-512988815
// made by someone smarter than me
