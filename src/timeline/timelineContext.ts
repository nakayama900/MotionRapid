import * as React from "react";
const { createContext } = React;

type MediaObjectContextValue = {
  //   sta: Number;
  //   end: Number;
  mediaObjectAreaElement: any;
  animatorOpen: boolean;
  animatorOpenSetState: Function;
  staStylePos: number;
  StaSetState: Function;
  endStylePos: number;
  EndSetState: Function;
  mediaObjectUUID: string;
  indexMediaObejct:number;
  // areaFocus:boolean;
};

export const MediaObjectContext = createContext<MediaObjectContextValue>(
  {} as MediaObjectContextValue
);

type TimelineAreaDivContextValue = {
  insertUserHandMediaObjectList:Function
  deleteUserHandMediaObjectList:Function
  hasUserHandMediaObjectList:Function
  getUserHandMediaObjectList:Function
  timelineAreaElement:any
  timelineScrollElement:any
  timelineUpdateDOM:Function
  mediaObejctDivHeightSetStateValue:Function
};

export const TimelineAreaDivContext =
  createContext<TimelineAreaDivContextValue>({} as TimelineAreaDivContextValue);

type TimelineAreaRightContextValue = {
  timelineAreaRightElement : any;
};

export const TimelineAreaRightContext =
  createContext<TimelineAreaRightContextValue>({} as TimelineAreaRightContextValue);

// type MediaObjectGenerationContextValue = {
//   // MouseSelectedSetValue:Function;
//   // MouseUnselectedSetValue:Function;
// };
// export const MediaObjectGenerationContext =
// createContext<MediaObjectGenerationContextValue>({} as MediaObjectGenerationContextValue);


type LayerPanelContextValue = {
  timelineAreaLayerPanelElement:any
};

export const LayerPanelContext = createContext<LayerPanelContextValue>(
  {} as LayerPanelContextValue
);


type LayerDurationContextValue = {
  timelineAreaLayerDurationElement:any
};

export const LayerDurationContext = createContext<LayerDurationContextValue>(
  {} as LayerDurationContextValue
);
