import * as PropertyFormat from "./AnimatorGroupPropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatSpecies } = {
  margin: PropertyFormat.PropertyFormat_margin,
  backgroundColor: PropertyFormat.PropertyFormat_backgroundColor,
  blockSize: PropertyFormat.PropertyFormat_blockSize,
  boxShadow: PropertyFormat.PropertyFormat_blockBorderShadow,
  blockBorder: PropertyFormat.PropertyFormat_blockBorder,
  left: PropertyFormat.PropertyFormat_left,
  right: PropertyFormat.PropertyFormat_right,
  top: PropertyFormat.PropertyFormat_top,
  bottom: PropertyFormat.PropertyFormat_bottom,
  opacity: PropertyFormat.PropertyFormat_opacity,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};

export const getAnimatorGroupFormatListKey = () => {
  return Object.keys(animatorGroupFormatList);
};
