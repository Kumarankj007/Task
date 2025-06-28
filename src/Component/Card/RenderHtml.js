import {View, Text} from 'react-native';
import React from 'react';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import appColors from '../../utils/appColors';
import {
  container,
  fontScalling,
  scrnWidth,
} from '../../utils/helperFunction';

export default function HtmlView({
  url,
  uri,
  padding,
  width,
  whiteText,
  ElementStyle = {},
}) {
  const appColor = appColors();
  const customHTMLElementModels = {
    html: HTMLElementModel.fromCustomModel({
      tagName: 'html',
      contentModel: HTMLContentModel.mixed,
    }),
    link: HTMLElementModel.fromCustomModel({
      tagName: 'link',
      contentModel: HTMLContentModel.mixed,
    }),
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.mixed,
    }),
    embed: HTMLElementModel.fromCustomModel({
      tagName: 'embed',
      contentModel: HTMLContentModel.mixed,
    }),
    ul: HTMLElementModel.fromCustomModel({
      tagName: 'ul',
      contentModel: HTMLContentModel.mixed,
    }),
  };

  return (
    <View>
      <RenderHTML
        defaultTextProps={{allowFontScaling: false}}
        source={{html: url}}
        contentWidth={scrnWidth}
        tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color: whiteText ? appColor.textWhite : appColor.textBlack,
            width: width ? width : padding ? scrnWidth - padding : 'auto',
            fontSize: fontScalling(1.8),
          },
          h6: {
            color: whiteText ? appColor.white : appColor.textBlack,
            width: '100%',
            alignSelf: 'center',
            fontSize: fontScalling(1.8),
          },
          p: {
            color: whiteText ? appColor.white : appColor.textBlack,
            width: '100%',
            alignSelf: 'center',
            fontSize: fontScalling(1.8),
          },
          ...ElementStyle,
        }}
        customHTMLElementModels={customHTMLElementModels}
      />
    </View>
  );
}
