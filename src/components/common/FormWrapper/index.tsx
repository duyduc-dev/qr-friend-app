import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={Platform.OS === 'ios' ? { flex: 1 } : { flexGrow: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;
