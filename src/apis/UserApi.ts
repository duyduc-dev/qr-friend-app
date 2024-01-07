import firestore from '@react-native-firebase/firestore';

import { ApiUri } from '@/apis/common';
import { StorageKeys } from '@/constants';
import { UserModal } from '@/modals/common/user';
import StorageHelper from '@/utils/StorageHelper';

export default class UserApi {
  static async getUserById(id: string): Promise<UserModal | undefined> {
    const data = await firestore()
      .collection<UserModal>(ApiUri.USERS)
      .doc(id)
      .get();
    return data.data();
  }

  static async getAuth(): Promise<UserModal | undefined> {
    const token = await StorageHelper.getStore(StorageKeys.ACCESS_TOKEN);
    return token ? this.getUserById(token) : undefined;
  }
}
