import { useState, useEffect, useRef } from "react";
import { Dimensions, ScaledSize } from "react-native";


export const responsiveFontSize = (f) => {
  const { height, width } = Dimensions.get("window");
  return fontCalculation(height, width, f);
};

const percentageCalculation = (max, val) => max * (val / 100);

const fontCalculation = (height, width, val) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2)
    ),
    val
  );
};