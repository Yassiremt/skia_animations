import React, {useMemo} from 'react';
import {
  Group,
  Paragraph,
  Skia,
  TextAlign,
  TileMode,
  rect,
  useFonts,
  vec,
} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';

type Props = {
  cardWidth: number;
  currentPosition: SharedValue<number>;
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
};

const AnimatedText = ({cardWidth, currentPosition, positions}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;

  const fontSize = 70;

  const customFontMgr = useFonts({
    Gilroy: [require('./fonts/Gilroy-ExtraBold.ttf')],
  });
  const paragraphStyle = {
    textAlign: TextAlign.Center,
  };
  const textStyle = {
    fontFamilies: ['Gilroy'],
    fontSize: fontSize,
  };

  const sadText = useMemo(() => {
    if (!customFontMgr) return null;

    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(100, 80),
        vec(100, 120),
        [Skia.Color('#FFFFFFBB'), Skia.Color('#FFFFFF44')],
        null,
        TileMode.Clamp,
      ),
    );
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle, foregroundPaint)
      .addText('sad')
      .build();
  }, [customFontMgr]);

  const confusedText = useMemo(() => {
    if (!customFontMgr) return null;

    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(100, 80),
        vec(100, 120),
        [Skia.Color('#FFFFFFBB'), Skia.Color('#FFFFFF44')],
        null,
        TileMode.Clamp,
      ),
    );
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle, foregroundPaint)
      .addText('confused')
      .build();
  }, [customFontMgr]);

  const happyText = useMemo(() => {
    if (!customFontMgr) return null;

    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(100, 80),
        vec(100, 120),
        [Skia.Color('#FFFFFFBB'), Skia.Color('#FFFFFF44')],
        null,
        TileMode.Clamp,
      ),
    );
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle, foregroundPaint)
      .addText('happy')
      .build();
  }, [customFontMgr]);

  const sadY = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [50, -50, -50],
    ),
  );
  const confusedY = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [120, 50, -50],
    ),
  );
  const happyY = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [120, 120, 50],
    ),
  );

  const rct = rect(0, 60, cardWidth, 65);
  return (
    <Group clip={rct}>
      <Paragraph paragraph={sadText} x={0} y={sadY} width={cardWidth} />
      <Paragraph
        paragraph={confusedText}
        x={0}
        y={confusedY}
        width={cardWidth}
      />
      <Paragraph paragraph={happyText} x={0} y={happyY} width={cardWidth} />
    </Group>
  );
};

export default AnimatedText;
