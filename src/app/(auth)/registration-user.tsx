import { Button, Input } from '@rneui/themed';
import { router } from 'expo-router';
import { Formik, FormikProps } from 'formik';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { ref } from 'yup';

import AuthApi from '@/apis/AuthApi';
import UserApi from '@/apis/UserApi';
import LoadingAnimation, {
  LoadingAnimationRef,
} from '@/components/common/animation/LoadingAnimation';
import { GoogleIcon } from '@/components/common/icon';
import LayoutView from '@/components/common/LayoutView';
import ProgressStepBar from '@/components/common/ProgressStepBar/ProgressStepBar';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import { UserModal } from '@/modals/common/user';
import useAuthStore from '@/store/useAuthStore';
import userRegistrationStore from '@/store/useRegistrationStore';
import yup from '@/validations/yup';

type DataUser = Omit<UserModal, 'avatar' | 'email' | 'uid'>;

const RegisterScreen = () => {
  const { t } = useTranslation();
  const lastNameRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const loadingRef = useRef<LoadingAnimationRef>(null);
  const formRef = useRef<FormikProps<DataUser>>(null);
  const { setAuthRegister, authRegister } = userRegistrationStore();
  const { setAuth } = useAuthStore();

  const registerSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    phoneNumber: yup.string().required(),
  });

  const handleSubmitRegister = async (values: DataUser) => {
    console.log(values);
    try {
      loadingRef.current?.open();
      if (!authRegister) {
        router.back();
        return;
      }
      const token = await AuthApi.signUp(authRegister, {
        ...values,
      });
      setAuthRegister(null);
      if (token) {
        const auth = await UserApi.getAuth();
        auth && setAuth(auth);
      }
    } catch (e) {
      console.log('[ERROR]', e);
      loadingRef.current?.close();
    }
    loadingRef.current?.close();
  };

  const handleCheckUsernameExist = async (text: string) => {
    const res = await AuthApi.checkFieldRegisterExist('username', text);
    console.log(res);
    if (!res) {
      formRef.current?.setFieldError(
        'username',
        t(`isExist`, { field: t`username` }),
      );
    }
  };

  return (
    <LayoutView
      isForm
      statusBarTranslucent
      headerStyle={tw`gap-12 items-start`}
      middleComponent={
        <ProgressStepBar
          showNumberStep
          step={2}
          totalStep={3}
          containerStyle={tw`flex-1 mt--12`}
        />
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={tw`flex-1 justify-center pb-30 mt-20`}>
          <QRFTextView
            fontSize={30}
            fontWeight="700"
            align="center"
            color={colors.primary}
          >
            {t`providerYourInformation`}
          </QRFTextView>
          <Formik<DataUser>
            validateOnMount
            enableReinitialize={false}
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              phoneNumber: '',
            }}
            innerRef={formRef}
            onSubmit={handleSubmitRegister}
            validationSchema={registerSchema}
          >
            {({
              values,
              handleSubmit,
              isValid,
              touched,
              errors,
              setFieldValue,
              setFieldTouched,
              handleBlur,
            }) => (
              <View style={tw`gap-4 mt-40`}>
                <Input
                  touched={touched.firstName}
                  placeholder={t`firstName`}
                  renderErrorMessage
                  value={values.firstName}
                  onChangeText={(text) => {
                    setFieldValue('firstName', text);
                    setFieldTouched('firstName', true, false);
                  }}
                  returnKeyType="next"
                  onBlur={handleBlur('firstName')}
                  errorMessage={
                    touched.firstName ? errors.firstName : undefined
                  }
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                />

                <Input
                  // @ts-ignore
                  ref={(ref: any) => (lastNameRef.current = ref)}
                  touched={touched.lastName}
                  placeholder={t`lastName`}
                  renderErrorMessage
                  value={values.lastName}
                  onChangeText={(text) => {
                    setFieldValue('lastName', text);
                    setFieldTouched('lastName', true, false);
                  }}
                  returnKeyType="next"
                  onBlur={handleBlur('lastName')}
                  errorMessage={touched.lastName ? errors.lastName : undefined}
                  onSubmitEditing={() => phoneNumberRef.current?.focus()}
                />
                <Input
                  // @ts-ignore
                  ref={(ref: any) => (phoneNumberRef.current = ref)}
                  touched={touched.phoneNumber}
                  placeholder={t`phoneNumber`}
                  renderErrorMessage
                  value={values.phoneNumber}
                  onChangeText={(text) => {
                    text = text.replace(/\D+/g, '');
                    setFieldValue('phoneNumber', text.trim());
                    setFieldTouched('phoneNumber', true, false);
                  }}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onBlur={handleBlur('phoneNumber')}
                  errorMessage={
                    touched.phoneNumber ? errors.phoneNumber : undefined
                  }
                  onSubmitEditing={() => usernameRef.current?.focus()}
                />
                <Input
                  // @ts-ignore
                  ref={(ref: any) => (usernameRef.current = ref)}
                  leftIcon={
                    <QRFTextView
                      color={colors.primary}
                      fontSize={18}
                      fontWeight="700"
                    >
                      @
                    </QRFTextView>
                  }
                  touched={touched.username}
                  placeholder={t`username`}
                  value={values.username}
                  renderErrorMessage
                  onChangeText={(text) => {
                    setFieldValue(
                      'username',
                      text.replace(' ', '').trim().toLowerCase(),
                    );
                    setFieldTouched('username', true, false);
                  }}
                  returnKeyType="done"
                  onBlur={handleBlur('username')}
                  errorMessage={touched.username ? errors.username : undefined}
                  onEndEditing={(e) =>
                    handleCheckUsernameExist(e.nativeEvent.text)
                  }
                />

                <Button
                  title={t`continue`}
                  buttonStyle={tw`py-15 px-20`}
                  disabled={!isValid}
                  onPress={() => isValid && handleSubmit()}
                />
              </View>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={tw`mx-auto px-20 py-10 mt-30`}
          >
            <QRFTextView
              fontWeight="700"
              color={colors.grey['700']}
              fontSize={14}
            >
              {t`alreadyHaveAnAccount`}
            </QRFTextView>
          </TouchableOpacity>
          <QRFTextView
            style={tw`mt-60`}
            align="center"
            color={colors.primary}
            fontSize={14}
            fontWeight="700"
          >
            {t`orContinueWith`}
          </QRFTextView>
          <View />
          <View style={tw`flex-row items-center justify-center mt-20`}>
            <TouchableOpacity
              style={tw`bg-grey-25 w-60 h-44 items-center justify-center rounded-10`}
            >
              <GoogleIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LoadingAnimation ref={loadingRef} />
    </LayoutView>
  );
};

export default RegisterScreen;
