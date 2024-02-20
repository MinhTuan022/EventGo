import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowCircleRight, ArrowLeft, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const ResetPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{marginTop: 35}}>
        <ArrowLeft size={22} color="black" />
        <SpaceComponent height={20}/>
        <TextComponent text="Verification" title />
        <SpaceComponent height={10}/>
        <TextComponent
          text="We’ve send you the verification code on email"
          color={appColors.gray}
        />
        <InputComponent
          placeHolder="abc@gmail.com"
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={22} color={appColors.gray} />}
        />
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent onPress={() => navigation.navigate('ResetPasswordScreen')} text="Send" iconFlex='right' type="primary" icon={<ArrowCircleRight size={22} color='white'/>}></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ResetPasswordScreen;
