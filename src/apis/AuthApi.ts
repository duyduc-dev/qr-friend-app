import firebase from '@react-native-firebase/app';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { ApiUri } from '@/apis/common';
import { StorageKeys } from '@/constants';
import { UserModal } from '@/modals/common/user';
import { LoginRequest, RegisterRequest } from '@/modals/request/AuthRequest';
import useAuthStore from '@/store/useAuthStore';
import StorageHelper from '@/utils/StorageHelper';
import Tools from '@/utils/Tools';

export default class AuthApi {
  static async signUp(
    data: RegisterRequest,
    user: Omit<UserModal, 'avatar' | 'email' | 'uid'>,
  ) {
    const userAuth = await auth().createUserWithEmailAndPassword(
      data.email,
      data.confirmPassword,
    );
    if (userAuth) {
      await this.createUser({
        ...user,
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        phoneNumber: user.phoneNumber,
        email: data.email,
        avatar: null,
        uid: userAuth.user.uid,
      });
      await StorageHelper.setStore(StorageKeys.ACCESS_TOKEN, userAuth.user.uid);
      return userAuth.user.uid;
    }
  }

  static async login(data: LoginRequest) {
    const authLogin = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    await StorageHelper.setStore(StorageKeys.ACCESS_TOKEN, authLogin.user.uid);
    return authLogin.user.uid;
  }

  static async logout() {
    try {
      await StorageHelper.remove(StorageKeys.ACCESS_TOKEN);
      await auth().signOut();
      useAuthStore.getState().logout();
    } catch (e) {
      console.log('[ERROR]', e);
    }
  }

  static async checkFieldRegisterExist(field: string, value: string) {
    const response = await firestore()
      .collection(ApiUri.USERS)
      .where(field, '==', value)
      .get();
    return response.empty;
  }

  static async createUser(data: UserModal) {
    await firestore()
      .collection<UserModal>(ApiUri.USERS)
      .doc(data.uid)
      .set({
        ...data,
      })
      .catch((e) => console.log(e));
  }
}
