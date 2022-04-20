import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
    console.log('AsyncStorage set success')
  } catch (e) {
    console.log('AsyncStorage set error ', e);
  }
};

const getData = async (key: string) => {
  try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`);
      console.log('getData jsonValue ', jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('AsyncStorage get error ', e);
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`@${key}`)
  } catch(e) {
    console.log('AsyncStorage removeData error ', e);
  }

  console.log('Done.')
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.log('AsyncStorage clearAll error ', e);
  }

  console.log('Done.')
}


export { storeData, getData, removeData };
