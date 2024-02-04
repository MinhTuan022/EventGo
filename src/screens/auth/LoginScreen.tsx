import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';
import {ButtonComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      <Image
        source={require('../../assets/images/login-logo.png')}
        style={{
          width: appInfo.sizes.WIDTH * 0.5,
          resizeMode: 'contain',
        }}
      />
      <TextInput
        placeholder="Email"
        //   value={}
        //   onChangeText={}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        //   value={}
        //   onChangeText={}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <ButtonComponent type='primary' iconFlex='left' text="Login" icon={
         <View>
            <Text>-</Text>
         </View>
      }/>
    </View>
  );
};

export default LoginScreen;