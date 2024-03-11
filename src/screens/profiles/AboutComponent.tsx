import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {SectionComponent, TextComponent} from '../../components';

const AboutComponent = () => {
  return (
    <View style={globalStyles.container}>
      <SectionComponent>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextComponent
            text="Hello there!

I'm passionate about creating unforgettable experiences through events that leave lasting impressions. With years of experience in event management, I thrive on bringing visions to life and ensuring every detail is meticulously planned and executed. From corporate conferences to intimate gatherings, I specialize in curating unique and immersive experiences tailored to suit the needs and objectives of my clients.

My approach is collaborative and client-centered, focusing on understanding the essence of each event and translating it into an unforgettable occasion. Whether it's coordinating logistics, managing vendors, or crafting creative concepts, I pride myself on my ability to deliver seamless and memorable events that exceed expectations.

With a keen eye for detail, a knack for problem-solving, and a passion for innovation, I'm dedicated to making every event a resounding success. Let's work together to turn your vision into reality and create moments that will be cherished for years to come."
            maxLength={300}
          />
        </ScrollView>
      </SectionComponent>
    </View>
  );
};

export default AboutComponent;
