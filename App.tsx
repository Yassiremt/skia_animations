import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Main from './src/Main';

type Props = {};

export default function App({}: Props) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Main />
    </GestureHandlerRootView>
  );
}
