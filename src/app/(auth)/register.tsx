import { Button, Input } from '@rneui/themed';
import { router } from 'expo-router';
import { Formik, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { ref } from 'yup';

import AuthApi from '@/apis/AuthApi';
import { GoogleIcon } from '@/components/common/icon';
import LayoutView from '@/components/common/LayoutView';
import ProgressStepBar from '@/components/common/ProgressStepBar/ProgressStepBar';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import { RegisterRequest } from '@/modals/request/AuthRequest';
import userRegistrationStore from '@/store/useRegistrationStore';
import yup from '@/validations/yup';

const RegisterScreen = () => {
  const { t } = useTranslation();
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { setAuthRegister } = userRegistrationStore();
  const formikRef = useRef<FormikProps<RegisterRequest>>(null);

  const handleSubmitRegister = async (values: RegisterRequest) => {
    const isEmpty = await handleCheckEmailExist(values.email);
    if (!isEmpty) return;
    setAuthRegister(values);
    router.push('/(auth)/registration-user');
  };

  const handleCheckEmailExist = async (text: string) => {
    const res = await AuthApi.checkFieldRegisterExist('email', text);
    if (!res) {
      formikRef.current?.setFieldError(
        'email',
        t(`isExist`, { field: t`email` }),
      );
    }
    return res;
  };

  const registerSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .min(6)
      .oneOf([ref('password')], t`passwordDoesNotMatch`),
  });

  return (
    <LayoutView
      isForm
      statusBarTranslucent
      headerStyle={tw`gap-12 items-start`}
      middleComponent={
        <ProgressStepBar
          showNumberStep
          step={1}
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
        <View style={tw`flex-1 justify-center pb-30`}>
          <QRFTextView
            fontSize={30}
            fontWeight="700"
            align="center"
            color={colors.primary}
          >
            {t`register`}
          </QRFTextView>
          <QRFTextView
            fontSize={14}
            fontWeight="600"
            align="center"
            color={colors.black}
            style={tw`mt-26`}
          >
            {t`createAnAccountSoYouCanDiscoverAllYourFriends`}
          </QRFTextView>
          <Formik<RegisterRequest>
            innerRef={formikRef}
            validateOnMount
            enableReinitialize={false}
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={handleSubmitRegister}
            validationSchema={registerSchema}
          >
            {({
              handleSubmit,
              isValid,
              touched,
              errors,
              setFieldValue,
              setFieldTouched,
              handleBlur,
            }) => (
              <View style={tw`gap-4 mt-64`}>
                <Input
                  touched={touched.email}
                  placeholder={t`email`}
                  renderErrorMessage
                  onChangeText={(text) => {
                    setFieldValue('email', text);
                    setFieldTouched('email', true, false);
                  }}
                  onEndEditing={(e) => {
                    handleCheckEmailExist(e.nativeEvent.text);
                  }}
                  returnKeyType="next"
                  onBlur={handleBlur('email')}
                  errorMessage={touched.email ? errors.email : undefined}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <Input
                  // @ts-ignore
                  ref={(ref: any) => (passwordRef.current = ref)}
                  touched={touched.password}
                  placeholder={t`password`}
                  renderErrorMessage
                  onChangeText={(text) => {
                    setFieldValue('password', text);
                    setFieldTouched('password', true, false);
                  }}
                  returnKeyType="next"
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password ? errors.password : undefined}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                <Input
                  // @ts-ignore
                  ref={(ref: any) => (confirmPasswordRef.current = ref)}
                  touched={touched.confirmPassword}
                  placeholder={t`confirmPassword`}
                  renderErrorMessage
                  onChangeText={(text) => {
                    setFieldValue('confirmPassword', text);
                    setFieldTouched('confirmPassword', true, false);
                  }}
                  returnKeyType="done"
                  onBlur={handleBlur('confirmPassword')}
                  errorMessage={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                  onSubmitEditing={() => isValid && handleSubmit()}
                />

                <Button
                  title={t`register`}
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
    </LayoutView>
  );
};

export default RegisterScreen;
