import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";

import { TimeNavigatorContext, TimeNavigatorLayerDurationContext } from "./TimeNavigatorContext";

import { TimeNavigatorPlayheadComponent, TimelinePlayheadComponent } from "./Playhead";
import TimeNavigatorScrollBarComponent from "./ScrollBar";
import TimeNavigatorTimeAxisComponent from "./TimeAxis";
import * as timelineMousePosition from "./../timeLineMousePosition";

const TimeNavigatorHeaderComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const TimeNavigatorLayerDurationElement = useRef(null);

  const windowSizeEvent = () => {
    const size = timelineMousePosition.elementSize(TimeNavigatorLayerDurationElement);
    console.log("windowSizeEvent", size[0]);
    TimeNavigatorContextValue.durationWidthSetState(size[0]);
  };

  useEffect(() => {
    window.addEventListener("resize", windowSizeEvent);
    windowSizeEvent();
    return () => {
      window.removeEventListener("resize", windowSizeEvent);
    };
  }, []);

  return (
    <div className="timeNavigator-header">
      <div className="timeNavigator-header-layer_panel"></div>
      <div className="timeNavigator-header-layer_duration" ref={TimeNavigatorLayerDurationElement}>
        <TimeNavigatorLayerDurationContext.Provider value={{ TimeNavigatorLayerDurationElement: TimeNavigatorLayerDurationElement }}>
          <TimeNavigatorTimeAxisComponent />
          <TimeNavigatorScrollBarComponent />

          <TimeNavigatorPlayheadComponent />
        </TimeNavigatorLayerDurationContext.Provider>
      </div>
    </div>
  );
};
export default TimeNavigatorHeaderComponent;
