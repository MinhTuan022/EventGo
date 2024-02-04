import {View, Text, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';
import {ButtonComponent, InputComponent, TextComponent} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Lock1, Sms} from 'iconsax-react-native';
import { fontFamilies } from '../../constants/fontFamilies';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'center', padding: 20},
      ]}>
      <Image
        source={require('../../assets/images/login-logo.png')}
        style={{
         
          width: appInfo.sizes.WIDTH * 0.5,
          resizeMode: 'contain',
        }}
      />
      <TextComponent text='Sign in' font={fontFamilies.bold} size={24}/>
      <InputComponent
        value={email}
        onChange={val => setEmail(val)}
        placeHolder="Email"
        type="email-address"
        affix={<Sms color={appColors.gray2} />}
      />
      <InputComponent
        value={password}
        onChange={val => setPassword(val)}
        placeHolder="Password"
        isPassword
        affix={<Lock1 color={appColors.gray2} />}
      />
      <ButtonComponent type='primary' iconFlex='left' text="Login" icon={
         <View>
            <Text></Text>
         </View>
      }/>
    </View>
  );
};

export default LoginScreen;
