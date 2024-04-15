import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashScreen} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import AppRouters from './src/navigators/AppRouters';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Mapbox from '@rnmapbox/maps';
import {HandleNotification} from './src/utils/handleNotification';
import Toast from 'react-native-toast-message';
import {Host} from 'react-native-portalize';

const token: string =
  'pk.eyJ1IjoidHVhbmh5MjAyNCIsImEiOiJjbHR6enJrMnMwNWgyMmttcXV1bmllZWx1In0._QHVjgvwYlqrW5rW2b9JDw';
Mapbox.setAccessToken(token);

const App = () => {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Host>
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        </Host>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
