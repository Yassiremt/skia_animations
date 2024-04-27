import {StatusBar, StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {Canvas} from '@shopify/react-native-skia';
import {Deer, Giraffe, Lion} from './skia_ui/animals';
import Texts from './skia_ui/Texts';
import Button from './skia_ui/Button';
import {Background} from './skia_ui';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue, withTiming} from 'react-native-reanimated';

type stepType = 'LION' | 'DEER' | 'GIRAFFE';
const data = [
  {
    type: 'LION' as stepType,
    gradient: ['#42825B', '#9BCB53'] as [string, string],
    title: 'Welcome to ZooTix!',
    description:
      "Your ticket to the wild awaits! With ZooTix, reserving zoo tickets is a breeze. Let's dive into the adventure!",
  },
  {
    type: 'DEER' as stepType,
    gradient: ['#9C301E', '#DF8F66'] as [string, string],
    title: 'Explore with ZooTix!',
    description:
      "Get ready for a wild ride! ZooTix makes reserving zoo tickets quick and easy. Let's start exploring together!",
  },
  {
    type: 'GIRAFFE' as stepType,
    gradient: ['#D66E1D', '#E9991E'] as [string, string],
    title: 'Join ZooTix Today!',
    description:
      'Dive into the wild with ZooTix! Reserve your zoo tickets effortlessly and start your adventure now!',
  },
];

const ZoOnboarding = () => {
  const {width, height} = useWindowDimensions();
  const xValue = useSharedValue(0);
  const yValue = useSharedValue(0);

  const tap = Gesture.Tap().onEnd(ev => {
    const size = 75;
    const buttonX = width - size - 20;
    const buttonY = height - size - 20;

    const isSelected =
      ev.x >= buttonX &&
      ev.x <= buttonX + size &&
      ev.y >= buttonY &&
      ev.y <= buttonY + size;
    if (isSelected) {
      xValue.value = withTiming(
        xValue.value === 2 ? 0 : xValue.value + 1,
        undefined,
        () => {
          yValue.value = withTiming(yValue.value === 2 ? 0 : yValue.value + 1, {
            duration: 600,
          });
        },
      );
    }
  });
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />

      <GestureDetector gesture={tap}>
        <Canvas style={StyleSheet.absoluteFillObject}>
          <Background yValue={yValue} />
          <Lion xValue={xValue} yValue={yValue} />
          <Deer xValue={xValue} yValue={yValue} />
          <Giraffe xValue={xValue} yValue={yValue} />
          {data.map(({gradient, title, description, type}, index) => (
            <Texts
              key={type}
              gradients={gradient}
              title={title}
              description={description}
              yValue={yValue}
              index={index}
            />
          ))}
          <Button yValue={yValue} />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

export {ZoOnboarding};
