// import { testJoin, textReplace } from "./buildAuxiliaryFunction";
// import * as buildSourceType from "./buildSourceType";
import * as AnimatorGroupFormat from "./../../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import { testJoin, textReplace, sortNumber } from "./../buildHTML/buildAuxiliaryFunction";
import * as middleDataClass from "./../../MiddleData/middleDataClass";
import * as buildQue from "../buildQue";
import * as buildCalculationTimeInterpolation from "./../buildCalculationTimeInterpolation";
import generateCSSproperty from "../generateCSSproperty";

import UUID from "uuidjs";

const getUUIDCSSProperty = () => {
  const baseID = textReplace(String(UUID.generate()), { "-": "" });
  return [baseID, "--CSS" + baseID];
};

const joinValueUnit = (value: string | number, unit: string) => {
  if (!unit) {
    return String(value);
  }
  return String(value) + String(unit);
};

const CSSBuildMain = (
  jsonDataCentral: middleDataClass.DataCentral,
  cssDownParentID: string,
  jsDownParentID: string,
  compositeID: string,
  mediaObjectID: string,
  compositeTimeFlag: boolean,
  compositePreviewTime: number,
  compositeOutputModeTime: number
) => {
  //   const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral.OwnedClass_Composite;
  const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral.OwnedClass_MediaObject;
  const OwnedClass_AnimatorGroup: { [name: string]: middleDataClass.AnimatorGroup } = jsonDataCentral.OwnedClass_AnimatorGroup;
  const OwnedClass_Animator: { [name: string]: middleDataClass.Animator } = jsonDataCentral.OwnedClass_Animator;
  const OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe } = jsonDataCentral.OwnedClass_Keyframe;
  const OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty } = jsonDataCentral.OwnedClass_CSSProperty;

  const thenCompositeClass = OwnedClass_Composite[compositeID];
  const Composite_Duration = thenCompositeClass.Composite_Duration;

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  const thenMediaObjectClass = OwnedClass_MediaObject[mediaObjectID];
  const OwnedID_AnimatorGroup = thenMediaObjectClass.OwnedID_AnimatorGroup;

  const newID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(mediaObjectID, "#"), cssDownParentID);

  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[0]) {
    const cssTextPosition = "position:static;";
    buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssTextPosition), newID);
  }

  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[1]) {
    const cssTextPosition = "position:absolute;";
    buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssTextPosition), newID);
  }

  for (let agi = 0; agi < OwnedID_AnimatorGroup.length; agi++) {
    //アニメーターグループ
    const thenAnimatorGroupID = OwnedID_AnimatorGroup[agi];
    const thenAnimatorGroupClass: middleDataClass.AnimatorGroup = OwnedClass_AnimatorGroup[thenAnimatorGroupID];
    const OwnedID_Animator: Array<string> = thenAnimatorGroupClass.OwnedID_Animator;

    let hasKeyframe: boolean = false;
    for (let ani = 0; ani < OwnedID_Animator.length; ani++) {
      const thenAnimatorID: string = OwnedID_Animator[ani];
      const thenAnimatorClass: middleDataClass.Animator = OwnedClass_Animator[thenAnimatorID];
      const OwnedID_Keyframe: Array<string> = thenAnimatorClass.OwnedID_Keyframe;

      if (OwnedID_Keyframe.length !== 0) {
        hasKeyframe = true;
        break;
      }
    }

    console.log("hasKeyframe", hasKeyframe);

    if (!hasKeyframe) {
      // CSSTextReplace += ".";
      // CSSTextReplace += mediaObjectID;
      // CSSTextReplace += " { \n";

      const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(
        thenAnimatorGroupClass.AnimatorGroup_Species
      );

      let cssPropertySpeciesList: { [name: string]: string } = {};

      for (let anj = 0; anj < OwnedID_Animator.length; anj++) {
        const thenAnimatorID: string = OwnedID_Animator[anj];
        const thenAnimatorClass: middleDataClass.Animator = OwnedClass_Animator[thenAnimatorID];
        const OwnedID_cssPropertyValue = thenAnimatorClass.OwnedID_cssPropertyValue;
        const thenCSSPropertyClass: middleDataClass.CSSProperty = OwnedClass_CSSProperty[OwnedID_cssPropertyValue];

        cssPropertySpeciesList[thenAnimatorClass.Animator_propertySpecies] = joinValueUnit(
          thenCSSPropertyClass.CSSProperty_Value,
          thenCSSPropertyClass.CSSProperty_Unit
        );
      }

      console.log("cssPropertySpeciesList", cssPropertySpeciesList);

      const cssText = animatorGroupFormat.cssWriteFunction(animatorGroupFormat.cssPropertyName, cssPropertySpeciesList);

      const newIDmedia = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(mediaObjectID, "#"), cssDownParentID);
      //単独要素
      buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newIDmedia);
    } else if (thenCompositeClass.Composite_HorizontalMode === middleDataClass.Composite_HorizontalMode[1]) {
      //パララックスアニメーションモード
      const cssRootID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault("root", ":"), cssDownParentID);

      console.log("parallax mode");
      //parallax mode
      const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(
        thenAnimatorGroupClass.AnimatorGroup_Species
      );

      let cssPropertySpeciesList: { [name: string]: string } = {};

      for (let anj = 0; anj < OwnedID_Animator.length; anj++) {
        const thenAnimatorID: string = OwnedID_Animator[anj];
        const thenAnimatorClass: middleDataClass.Animator = OwnedClass_Animator[thenAnimatorID];
        const OwnedID_cssPropertyValue = thenAnimatorClass.OwnedID_cssPropertyValue;
        const thenCSSPropertyClass: middleDataClass.CSSProperty = OwnedClass_CSSProperty[OwnedID_cssPropertyValue];

        const valueIDArray = getUUIDCSSProperty();

        cssPropertySpeciesList[thenAnimatorClass.Animator_propertySpecies] = "var(" + valueIDArray[1] + ")";

        const tempTimeValue = generateCSSproperty(thenAnimatorClass, OwnedClass_Keyframe, OwnedClass_CSSProperty);

        console.log("tempTimeValue", tempTimeValue);
        const tempSortTimeValue = sortNumber(Object.keys(tempTimeValue), false);
        console.log("tempSortTimeValue", tempSortTimeValue);

        if (compositeTimeFlag) {
          //プレビューの時

          const cssValue = buildCalculationTimeInterpolation.timeInterpolation(compositePreviewTime, tempSortTimeValue, tempTimeValue);

          let unitTemp = "";
          if (thenCSSPropertyClass.CSSProperty_Unit) {
            unitTemp = thenCSSPropertyClass.CSSProperty_Unit;
          }

          const cssRootSubstance = valueIDArray[1] + ":" + cssValue + unitTemp + ";";
          buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssRootSubstance), cssRootID);
        } else {
          //プレビューではないとき

          let pointTime = "[";
          let pointValue = "[";
          for (let kki = 0; kki < tempSortTimeValue.length; kki++) {
            const thenTime: number = Number(tempSortTimeValue[kki]);

            pointTime += thenTime + compositeOutputModeTime;
            pointValue += tempTimeValue[thenTime];
            if (kki !== tempSortTimeValue.length - 1) {
              pointTime += ",";
              pointValue += ",";
            }
          }

          pointTime += "]";
          pointValue += "]";

          const windowScrollFormat = String(require("./../buildFormat/windowScroll.txt")["default"]);

          let tempUnit = "''";
          if (thenCSSPropertyClass.CSSProperty_Unit) {
            tempUnit = "'" + thenCSSPropertyClass.CSSProperty_Unit + "'";
          }
          const textReplaceData: { [name: string]: string } = {
            "%POINTTIME%": pointTime,
            "%POINTVALUE%": pointValue,
            "%UNIT%": tempUnit,
            "%SETPROPERTYNAME%": "'" + valueIDArray[1] + "'",
            "%SCROLLFUNCTIONNAME%": "f" + valueIDArray[0],
          };
          console.log("textReplaceData", textReplaceData);
          const newjsID = buildQue.pushJavaScriptElementQue(new buildQue.javascriptElementSourceCodeClass(windowScrollFormat, textReplaceData), jsDownParentID);

          const cssRootSubstance = valueIDArray[1] + ": 0";
          buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssRootSubstance), cssRootID);
        }
      }

      console.log("cssPropertySpeciesList", cssPropertySpeciesList);

      const cssText = animatorGroupFormat.cssWriteFunction(animatorGroupFormat.cssPropertyName, cssPropertySpeciesList);

      buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newID);
    }

    // for (let ank = 0; ank < OwnedID_Animator.length; ank++) {
    //   CSSTextReplace += "\n";
    //   //アニメーター
    //   const thenAnimatorID: string = OwnedID_Animator[ank];
    //   const thenAnimatorClass: middleDataClass.Animator = OwnedClass_Animator[thenAnimatorID];
    //   const OwnedID_Keyframe: Array<string> = thenAnimatorClass.OwnedID_Keyframe;

    //   CSSTextReplace += "@keyframe ";
    //   CSSTextReplace += thenAnimatorID;
    //   CSSTextReplace += " { \n";

    //   for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
    //     //キーフレーム
    //     const thenkeyframeID = OwnedID_Keyframe[ki];
    //     const thenkeyframeClass: middleDataClass.Keyframe = OwnedClass_Keyframe[thenkeyframeID];
    //     const Keyframe_AbsoluteTime = thenkeyframeClass.Keyframe_AbsoluteTime;
    //     console.log("最深部", compositeID, mediaObjectID, thenAnimatorGroupID, thenAnimatorID, thenkeyframeID);
    //     console.log(OwnedID_AnimatorGroup.length, OwnedID_Animator.length, OwnedID_Keyframe.length);

    //     console.log("Keyframe_AbsoluteTime", Keyframe_AbsoluteTime);
    //     const percent = (Keyframe_AbsoluteTime / Composite_Duration) * 100;

    //     CSSTextReplace += String(percent);
    //     CSSTextReplace += "% { \n";
    //     CSSTextReplace += "/* css出力テストです */";
    //     CSSTextReplace += "} \n";
    //   }
    //   CSSTextReplace += "}";
    //   CSSTextReplace += "\n";
    // }
  }
};

export default CSSBuildMain;

// const thenCompositeClass = OwnedClass_Composite[compositeID];
// console.log("thenCompositeClass", thenCompositeClass, compositeID);
// const OwnedID_MediaObject = thenCompositeClass["OwnedID_MediaObject"];

// for (let mi = 0; mi < OwnedID_MediaObject.length; mi++) {
//   //メディアオブジェクト
//   const thenMediaObjectID = OwnedID_MediaObject[mi];
//   const thenMediaObjectClass = OwnedClass_MediaObject[thenMediaObjectID];
//   const OwnedID_AnimatorGroup = thenMediaObjectClass["OwnedID_AnimatorGroup"];

//   for (let agi = 0; agi < OwnedID_AnimatorGroup.length; agi++) {
//     //アニメーターグループ
//     const thenAnimatorGroupID = OwnedID_AnimatorGroup[agi];
//     const thenAnimatorGroupClass = OwnedClass_AnimatorGroup[thenAnimatorGroupID];
//     const OwnedID_Animator = thenAnimatorGroupClass["OwnedID_Animator"];

//     for (let ani = 0; ani < OwnedID_Animator.length; ani++) {
//       //アニメーター
//       const thenAnimatorID = OwnedID_Animator[agi];
//       const thenAnimatorClass = OwnedClass_Animator[thenAnimatorID];
//       const OwnedID_Keyframe = thenAnimatorClass["OwnedID_Keyframe"];

//       for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
//         //キーフレーム
//         const thenkeyframeID = OwnedID_Keyframe[ki];
//         const thenkeyframeClass = OwnedClass_Keyframe[thenkeyframeID];
//         console.log("最深部", compositeID, thenMediaObjectID, thenAnimatorGroupID, thenAnimatorID, thenkeyframeID);
//         console.log(OwnedID_MediaObject.length, OwnedID_AnimatorGroup.length, OwnedID_Animator.length, OwnedID_Keyframe.length);
//       }
//     }
//   }
// }
