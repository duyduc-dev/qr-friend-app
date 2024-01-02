import { Button, Input, InputProps } from '@rneui/themed';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '@/components/common/icon';
import LayoutView from '@/components/common/LayoutView';
import QRFTextView from '@/components/common/Text';
import { colors } from '@/constants';
import tw from '@/libs/tailwind';
import { LoginRequest } from '@/modals/request/AuthRequest';
import useAuthStore from '@/store/useAuthStore';
import Yup from '@/validations/yup';
const LoginScreen = () => {
  const { t } = useTranslation();
  const passwordRef = useRef<TextInput>(null);
  const { setAuth } = useAuthStore();

  const loginSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const handleSubmitLogin = (values: LoginRequest) => {
    console.log(values);
    setAuth({
      isLogin: true,
    });
    router.push('/(tabs)/');
  };

  return (
    <LayoutView isForm statusBarTranslucent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={tw`flex-1 justify-center`}>
          <QRFTextView
            fontSize={30}
            fontWeight="700"
            align="center"
            color={colors.primary}
          >
            {t`login`}
          </QRFTextView>
          <QRFTextView
            fontSize={20}
            fontWeight="600"
            align="center"
            color={colors.black}
            style={tw`mt-26`}
          >
            {t`welcomeToApp`}
          </QRFTextView>
          <Formik<LoginRequest>
            validateOnMount
            enableReinitialize={false}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmitLogin}
            validationSchema={loginSchema}
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
                  returnKeyType="done"
                  onBlur={handleBlur('password')}
                  errorMessage={touched.password ? errors.password : undefined}
                  onSubmitEditing={() => passwordRef.current?.blur()}
                />
                <TouchableOpacity style={tw`ml-auto mb-8 mr-12`}>
                  <QRFTextView
                    fontSize={14}
                    color={colors.primary}
                    fontWeight="700"
                  >
                    {t`forgotPassword`}
                  </QRFTextView>
                </TouchableOpacity>
                <Button
                  title={t`login`}
                  buttonStyle={tw`py-15 px-20`}
                  disabled={!isValid}
                  onPress={() => isValid && handleSubmit()}
                />
              </View>
            )}
          </Formik>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/register')}
            style={tw`mx-auto px-20 py-10 mt-30`}
          >
            <QRFTextView
              fontWeight="700"
              color={colors.grey['700']}
              fontSize={14}
            >
              {t`createNewAccount`}
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

export default LoginScreen;
