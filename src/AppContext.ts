import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getUUID:Function,
  componentConvertCompositeChoiceArea:Function,
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea:Function;
  componentConvertKeyframeArea:Function
  
  updateDOM:Function;
  operationMediaObjectTime:Function  
  operationKeyframeTime:Function
  getMediaObjectTime:Function
  getKeyframeTime:Function

  fileExportDataCentral:Function
  fileExportComposite:Function
  buildMiddleDataHtml:Function

  // htmlBuildMain:Function
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
