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




const App = () => {
//   const [isShowSplash, setisShowSplash] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setisShowSplash(false);
//     }, 1500);

//     return () => clearTimeout(timeout);
//   }, []);


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {/* {isShowSplash ? (
          <SplashScreen />
        ) : ( */}
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        {/* )} */}
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
