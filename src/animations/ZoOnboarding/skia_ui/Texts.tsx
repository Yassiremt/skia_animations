import {useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  Group,
  Paragraph,
  Skia,
  TextAlign,
  TileMode,
  rect,
  useFonts,
} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';

type Props = {
  title: string;
  description: string;
  gradients: [string, string];
  yValue: SharedValue<number>;
  index: number;
};

const Texts = ({title, description, gradients, yValue, index}: Props) => {
  const {width} = useWindowDimensions();

  const height = width + 140;
  const customFontMgr = useFonts({
    Urbanist: [require('../fonts/Urbanist-Medium.ttf')],
    Aclonica: [require('../fonts/Aclonica-Regular.ttf')],
  });

  const paragraph = useMemo(() => {
    if (!customFontMgr) return null;
    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        {x: 0, y: height},
        {x: width, y: height},
        [Skia.Color(gradients[1]), Skia.Color(gradients[0])],
        null,
        TileMode.Clamp,
      ),
    );
    return Skia.ParagraphBuilder.Make(
      {
        textAlign: TextAlign.Center,
      },
      customFontMgr,
    )
      .pushStyle(
        {
          fontFamilies: ['Aclonica'],
          fontSize: 32,
        },
        foregroundPaint,
      )
      .addText(title)
      .pop()
      .build();
  }, [customFontMgr, gradients]);
  const paragraph2 = useMemo(() => {
    if (!customFontMgr) return null;

    return Skia.ParagraphBuilder.Make(
      {
        textAlign: TextAlign.Center,
      },
      customFontMgr,
    )
      .pushStyle({
        fontFamilies: ['Urbanist'],
        fontSize: 16,
        color: Skia.Color('#FFF'),
        heightMultiplier: 1.6,
      })
      .addText(description)
      .pop()
      .build();
  }, [customFontMgr, gradients]);

  const titleContainerHeight = 35;
  const interpolatedValues =
    index === 0
      ? [0, -titleContainerHeight, -titleContainerHeight]
      : index === 1
      ? [titleContainerHeight, 0, -titleContainerHeight]
      : [titleContainerHeight, titleContainerHeight, 0];
  const transformY = useDerivedValue(() => [
    {
      translateY: interpolate(yValue.value, [0, 1, 2], interpolatedValues),
    },
  ]);
  const rct = rect(0, height, width, 35);

  const paragraphContainerHeight = 80;
  const interpolatedParagraphs =
    index === 0
      ? [0, paragraphContainerHeight, paragraphContainerHeight]
      : index === 1
      ? [-paragraphContainerHeight, 0, paragraphContainerHeight]
      : [-paragraphContainerHeight, -paragraphContainerHeight, 0];

  const transformY2 = useDerivedValue(() => [
    {
      translateY: interpolate(yValue.value, [0, 1, 2], interpolatedParagraphs),
    },
  ]);
  const rct2 = rect(0, height + 50, width, paragraphContainerHeight);

  return (
    <>
      <Group clip={rct}>
        <Paragraph
          transform={transformY}
          paragraph={paragraph}
          x={0}
          y={height}
          width={width}
        />
      </Group>
      <Group clip={rct2}>
        <Paragraph
          transform={transformY2}
          paragraph={paragraph2}
          x={50}
          y={height + 50}
          width={width - 100}
        />
      </Group>
    </>
  );
};

export default Texts;
