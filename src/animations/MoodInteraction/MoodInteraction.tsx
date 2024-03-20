import {StatusBar, StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {Canvas, Circle} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Thumb from './Thumb';
import {Face} from './Face';
import {colors} from './colors';
import AnimatedText from './AnimatedText';
import Progress from './Progress';

const MoodInteraction = () => {
  const {width} = useWindowDimensions();
  const cardWidth = width - 20;
  const cardHeight = (cardWidth * 282) / 185;

  const onOfThreeWidth = cardWidth / 3;

  const firstPosition = onOfThreeWidth * (1 / 2);
  const secondPosition = onOfThreeWidth * (1 + 1 / 2);
  const thirdPosition = onOfThreeWidth * (2 + 1 / 2);

  const positions = {firstPosition, secondPosition, thirdPosition};

  const yellowVal = useSharedValue(0);
  const greenVal = useSharedValue(0);
  const position = useSharedValue(firstPosition);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        e.x >= firstPosition &&
        e.x - 50 < position.value &&
        e.x <= thirdPosition
      ) {
        if (e.x > firstPosition && e.x < secondPosition) {
          yellowVal.value = (e.x - firstPosition) * 3;
          greenVal.value = 0;
        } else if (e.x > secondPosition && e.x < thirdPosition) {
          greenVal.value = (e.x - secondPosition) * 3;
        }
        position.value = e.x;
      }
    })
    .onEnd(e => {
      if (e.x + 50 > position.value && e.x - 50 < position.value) {
        if (e.x < onOfThreeWidth) {
          position.value = withTiming(firstPosition, {duration: 100});
          yellowVal.value = withTiming(0, {duration: 100});
          greenVal.value = withTiming(0, {duration: 100});
        } else if (e.x < onOfThreeWidth * 2) {
          position.value = withTiming(secondPosition, {duration: 100});
          yellowVal.value = withTiming(width, {duration: 100});
          greenVal.value = withTiming(0, {duration: 100});
        } else if (e.x < onOfThreeWidth * 3) {
          position.value = withTiming(thirdPosition, {duration: 100});
          greenVal.value = withTiming(width, {duration: 100});
        }
      }
    });

  const animatedYellowOpacity = useDerivedValue(() => yellowVal.value / 300);
  const animatedGreenOpacity = useDerivedValue(() => greenVal.value / 300);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.bg} />
      <View style={styles.container}>
        <View style={[styles.card, {width: cardWidth, height: cardHeight}]}>
          <Canvas style={{height: '80%'}}>
            <Circle
              cx={cardWidth / 2}
              cy={cardHeight / 2.5}
              r={width}
              color={colors.red}
            />
            <Circle
              cx={cardWidth / 2}
              cy={cardHeight / 2.5}
              r={yellowVal}
              color={colors.yellow}
              opacity={animatedYellowOpacity}
            />
            <Circle
              cx={cardWidth / 2}
              cy={cardHeight / 2.5}
              r={greenVal}
              color={colors.green}
              opacity={animatedGreenOpacity}
            />
            <AnimatedText
              currentPosition={position}
              positions={positions}
              cardWidth={cardWidth}
            />
            <Face currentPosition={position} positions={positions} />
          </Canvas>
          <GestureDetector gesture={panGesture}>
            <Canvas style={styles.thumbCanvas}>
              <Thumb currentPosition={position} positions={positions} />
            </Canvas>
          </GestureDetector>
          <Canvas style={{height: 35, marginTop: 10}}>
            <Progress currentPosition={position} positions={positions} />
          </Canvas>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export {MoodInteraction};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 7,
    overflow: 'hidden',
  },
  thumbCanvas: {
    height: 90,
    marginTop: -40,
  },
});
