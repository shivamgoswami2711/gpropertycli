import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import OTPInputs from 'react-native-otp-inputs';
import * as Animatable from 'react-native-animatable';

const OTPInput = ({ numberOfInputs, onComplete, defaultValue, style }) => {
  const [code, setCode] = useState(defaultValue || '');

  useEffect(() => {
    if (code.length === numberOfInputs) {
      onComplete(code);
    }
  }, [code, numberOfInputs, onComplete]);

  const handleChangeCode = (code) => {
    setCode(code);
  };

  const handleAutoFill = (otp) => {
    setCode(otp);
  };

  return (
    <View style={[styles.container, style]}>
      <OTPInputs
        numberOfInputs={numberOfInputs}
        handleChangeCode={handleChangeCode}
        inputValue={code}
        inputStyles={styles.input}
        focusedBorderColor={'#000000'}
      />
      <Animatable.Text
        animation="fadeIn"
        style={styles.autoFillText}
        onPress={() => handleAutoFill('123456')}
      >
        Auto Fill
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    marginRight: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  autoFillText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#c4c4c4',
  },
});

export default OTPInput;
