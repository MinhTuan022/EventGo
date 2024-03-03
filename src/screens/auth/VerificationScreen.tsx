import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
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
import {fontFamilies} from '../../constants/fontFamilies';

const VerificationScreen = ({navigation, route}: any) => {
  const {code} = route.params;
  console.log(code);

  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent styles={{marginTop: 35}}>
        <ArrowLeft size={22} color="black" />
        <SpaceComponent height={20} />
        <TextComponent text="Verification" title />
        <SpaceComponent height={10} />
        <TextComponent
          text="We’ve send you the verification code on email"
          color={appColors.gray}
        />
        <SpaceComponent height={25} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput
            style={localStyle.input}
            // ref={(input) => inputs.current[index] = input as TextInput}
            placeholder="-"
            placeholderTextColor={appColors.gray2}
            onFocus={() => {}}
            maxLength={1}
            keyboardType="numeric"
            //  value={code1}
            //  onChangeText={setCode1}
          />
          <TextInput
            style={localStyle.input}
            placeholder="-"
            placeholderTextColor={appColors.gray2}
            maxLength={1}
            keyboardType="numeric"
            //  value={code2}
            //  onChangeText={setCode2}
          />
          <TextInput
            style={localStyle.input}
            placeholder="-"
            placeholderTextColor={appColors.gray2}
            maxLength={1}
            keyboardType="numeric"
            //  value={code3}
            //  onChangeText={setCode3}
          />
          <TextInput
            style={localStyle.input}
            placeholder="-"
            placeholderTextColor={appColors.gray2}
            maxLength={1}
            keyboardType="numeric"
            //  value={code4}
            //  onChangeText={setCode4}
          />
          {/* <Button title="Verify" onPress={handleVerify} /> */}
        </View>
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          textStyle={{fontFamily: fontFamilies.medium}}
          onPress={() => {}}
          text="CONTINUE"
          iconFlex="right"
          type="primary"
          icon={<ArrowCircleRight size={22} color="white" />}></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

const localStyle = StyleSheet.create({
  input: {
    borderColor: appColors.gray2,
    borderWidth: 1,
    borderRadius: 12,
    height: 55,
    width: 55,
    textAlign: 'center',
    fontSize: 24,
  },
});
export default VerificationScreen;
