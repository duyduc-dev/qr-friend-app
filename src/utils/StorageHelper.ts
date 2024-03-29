import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageHelper {
  static async setStore(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getStore(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  static async setStoreObject<T>(key: string, data: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getStoreObject<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  }

  static async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async clearStorage(exceptions?: string[]): Promise<boolean> {
    try {
      const preserveKeys = [];
      if (exceptions && Array.isArray(exceptions)) {
        for (let i = 0; i < exceptions.length; i++) {
          const key = exceptions[i];
          const value = await AsyncStorage.getItem(key);
          if (value) {
            preserveKeys.push({ key, value });
          }
        }
      }
      await AsyncStorage.clear();
      if (preserveKeys.length > 0) {
        for (let i = 0; i < preserveKeys.length; i++) {
          const { key, value } = preserveKeys[i];
          await AsyncStorage.setItem(key, value);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
