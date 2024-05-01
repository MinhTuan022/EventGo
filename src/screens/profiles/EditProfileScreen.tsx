import storage from '@react-native-firebase/storage';
import {ArrowLeft, Edit} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {appColors} from '../../utils/constants/appColors';
import {fontFamilies} from '../../utils/constants/fontFamilies';
import ChoicePictureModal from '../../components/modals/ChoicePictureModal';
import userAPI from '../../apis/userApi';
import LoadingModal from '../../components/modals/LoadingModal';
import {useNavigation} from '@react-navigation/native';
import {UserModel} from '../../models/UserModel';
import organizerAPI from '../../apis/organizerApi';
import authenticationAPI from '../../apis/authApi';

const EditProfileScreen = ({route, navigation}: any) => {
  const userData: any = route.params;
  console.log(userData);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstname);
  const [lastName, setLastName] = useState(userData.lastname);
  const [about, setAbout] = useState(userData.about);
  const [organization, setOrganization] = useState(userData.organizationName);
  const [address, setAddress] = useState(userData.organizationAddress);
  const [name, setName] = useState(userData.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  // const navigation = useNavigation();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const selectFromLibrary = async () => {
    try {
      // closeModal();
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path);

      await uploadImage(image.path);
    } catch (error) {
      console.log(error);
      closeModal();
    }
  };

  const captureFromCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });
      console.log(image.path);
    } catch (error) {
      console.log(error);
      closeModal();
    }
  };

  const uploadImage = async (imagePath: any) => {
    try {
      const reference = storage().ref(`avatars-${Date.now()}.jpg`);
      await reference.putFile(imagePath);
      const imageUrl = await reference.getDownloadURL();
      setImageUrl(imageUrl);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      if (userData.organizationName && userData.organizationAddress) {
        const res = await organizerAPI.HandleOrganizer(
          '/profile-ogz',
          {
            userId: userData._id,
            name: name,
            about: about,
            organization: organization,
            address: address,
            photo: imageUrl,
          },
          'put',
        );
      } else {
        const res = await userAPI.HandleUser(
          '/profile',
          {
            userId: userData._id,
            firstName: firstName,
            lastName: lastName,
            about: about,
            photo: imageUrl,
          },
          'put',
        );
      }

      setIsLoading(false);
      navigation.goBack();
      // console.log(res);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(imageUrl);
  // }, [imageUrl]);
  useEffect(() => {
    checkLinked();
  }, []);
  const checkLinked = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        `/check-linked?userId=${userData._id}`,
      );
      console.log(res.data);

      setIsLinked(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[globalStyles.container, {paddingTop: StatusBar.currentHeight}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderComponent
          title="Cập nhật hồ sơ"
          onPress={updateProfile}
          goBack
        />
        <SpaceComponent height={40} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{borderRadius: 100, width: 96, height: 96}}
            onPress={openModal}
            activeOpacity={1}>
            <Image
              source={{
                uri: imageUrl
                  ? imageUrl
                  : userData.photo
                  ? userData.photo
                  : 'https://th.bing.com/th/id/OIP.DxdqBFLVLPcWsjkds8636QHaHf?rs=1&pid=ImgDetMain',
              }}
              style={{flex: 1, resizeMode: 'cover', borderRadius: 100}}
            />
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: appColors.primary,
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Edit size={20} color="white" />
            </View>
          </TouchableOpacity>

          <SpaceComponent height={20} />
          <TextComponent
            text={String(userData.name ? userData.name : organization)}
            title
          />
        </View>
        <ChoicePictureModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          captureFromCamera={captureFromCamera}
          selectFromLibrary={selectFromLibrary}
        />

        <SectionComponent>
          {!userData.organizationName && !userData.organizationAddress ? (
            <>
              <InputComponent
                label="Tên"
                value={firstName}
                onChange={val => setFirstName(val)}
              />
              <InputComponent
                label="Họ và tên đệm"
                value={lastName}
                onChange={val => setLastName(val)}
              />
            </>
          ) : (
            <InputComponent
              label="Họ và tên"
              value={name}
              onChange={val => setName(val)}
            />
          )}
          <InputComponent
            label="Email"
            editable={false}
            value={userData.email}
            onChange={() => {}}
          />
          {userData.organizationName && (
            <>
              <InputComponent
                label="Thông tin"
                value={about}
                onChange={val => setAbout(val)}
              />
              <InputComponent
                label="Tên tổ chức"
                value={organization}
                onChange={val => setOrganization(val)}
              />
              <InputComponent
                label="Địa chỉ tổ chức"
                value={address}
                onChange={val => setAddress(val)}
              />
            </>
          )}
        </SectionComponent>
        {!isLinked && (
          <SectionComponent styles={{paddingVertical: 0}}>
            <ButtonComponent
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              text="Đổi mật khẩu"
              type="primary"
              styles={{width: '100%', borderRadius: 50}}
              color={appColors.purple2}
              textColor={appColors.primary}
              textStyle={{fontFamily: fontFamilies.medium}}
            />
          </SectionComponent>
        )}
        <SpaceComponent height={30}/>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default EditProfileScreen;
