import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {SectionComponent} from '../../components';

const AboutComponent = () => {
  return (
    <View style={globalStyles.container}>
      <SectionComponent >
        <Text>AboutComponent</Text>
        <View style={{backgroundColor:'red', height:10}}>

        </View>
      </SectionComponent>
    </View>
  );
};

export default AboutComponent;
