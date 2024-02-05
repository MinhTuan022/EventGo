import {
  View,
  Text,
  TextInput,
  Image,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SocialComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {
  Arrow,
  ArrowCircleLeft,
  ArrowCircleRight,
  Lock1,
  Sms,
} from 'iconsax-react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import {ScrollView} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/login-logo.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Sign in" title />
        <SpaceComponent height={21} />
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
        <RowComponent styles={{justifyContent: 'space-between'}}>
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              thumbColor={appColors.white}
              trackColor={{true: appColors.primary}}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent text="Forgot Password?" type="link" />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
         <ButtonComponent text='SIGN IN' type='primary'  icon={<ArrowCircleRight size={22} color={appColors.gray} />}/>
      </SectionComponent>
      <SocialComponent></SocialComponent>
      <SectionComponent>
         <RowComponent styles={{justifyContent: 'center'}}>
            <TextComponent text="Don't have an account? "/>
            <ButtonComponent type='link' text='Sign up'/>
         </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
