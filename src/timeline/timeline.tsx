import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TimelineAreaDivContext } from "./timelineContext";
import { MediaObjectAreaComponent } from "./MediaObjectAreaComponent";

import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import * as timelineMousePosition from "./timeLineMousePosition";

class UserHandMediaObjectOperation {
  mouseDownFlag: number; //0:押していない , 1:左側 , 2:右側 , 3:動作
  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownStaStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  mouseDownEndStyle: number; //マウスが押された時のメディアオブジェクト終了地点
  constructor(
    send_mouseDownFlag: number,
    send_mousePushPos: number,
    send_mouseDownStaStyle: number,
    send_mouseDownEndStyle: number
  ) {
    this.mouseDownFlag = send_mouseDownFlag;
    this.mousePushPos = send_mousePushPos;
    this.mouseDownStaStyle = send_mouseDownStaStyle;
    this.mouseDownEndStyle = send_mouseDownEndStyle;
  }
}

const TimelineComponent = () => {
  // ここでhooksを使える

  const [timelineUpdate, timelineSetUpdata] = useState<boolean>(false);

  const timelineUpdateDOM = () => {
    //強制再レンダリング関数
    timelineSetUpdata(timelineUpdate ? false : true);
  };

  useEffect(() => {
    console.log("timelineUpdate 再レンダリング");
  }, [timelineUpdate]);

  // useEffect(() => {
  //   AppContextValue.updateDOM();
  // }, []);

  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  //elementTimelineWidthSetState elementLayerPanelWidthSetState elementLayerDurationWidthSetState
  const [elementTimelineWidth,elementTimelineWidthSetState] = useState<number>(0);
  const [elementLayerPanelWidth,elementLayerPanelWidthSetState] = useState<number>(0);
  const [elementLayerDurationWidth,elementLayerDurationWidthSetState] = useState<number>(0);

  const [UserHandMediaObjectList, UserHandMediaObjectListSetState] = useState<{
    [name: string]: UserHandMediaObjectOperation;
  }>({});

  const [focusMediaObjectSpace, focusMediaObjectSpaceSetState] =
    useState<number>(-1);

  const insertUserHandMediaObjectList = (
    mediaObjectUUID: string,
    stateUserHand: number,
    mousePushPos: number,
    staStylePos: number,
    endStylePos: number
  ) => {
    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList);
    CopyUserHandMediaObjectList[mediaObjectUUID] =
      new UserHandMediaObjectOperation(
        stateUserHand,
        mousePushPos,
        staStylePos,
        endStylePos
      );
    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
  };
  const deleteUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const CopyUserHandMediaObjectList = Object.assign(UserHandMediaObjectList);
    delete UserHandMediaObjectList[mediaObjectUUID];
    UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
  };
  const hasUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const hasHand = mediaObjectUUID in UserHandMediaObjectList;
    return hasHand;
  };
  const getUserHandMediaObjectList = (mediaObjectUUID: string) => {
    const getHand = UserHandMediaObjectList[mediaObjectUUID];
    return getHand;
  };

  const [mediaObejctDivHeight, mediaObejctDivHeightSetState] = useState<{
    [name: number]: Array<number>;
  }>({});

  const mediaObejctDivHeightSetStateValue = (
    heightIndex: number,
    height: Array<number>
  ) => {
    if (heightIndex === 0) {
      mediaObejctDivHeightSetMaxSize();
    }

    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);
    copyMediaObejctDivHeight[heightIndex] = height;
    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);

  };

  const mediaObejctDivHeightSetMaxSize = () => {
    const mediaObejctDivHeightKeys = Object.keys(mediaObejctDivHeight);
    const copyMediaObejctDivHeight = Object.assign(mediaObejctDivHeight);

    const maxSize: number = AppContextValue.componentConvertMediaObjectArea(
      SetupEditorContextValue.choiceComposite
    ).length;

    for (let i = 0; i < mediaObejctDivHeightKeys.length; i++) {
      const key = Number(mediaObejctDivHeightKeys[i]);
      if (key >= maxSize) {

        delete copyMediaObejctDivHeight[key];
      }
    }

    mediaObejctDivHeightSetState(copyMediaObejctDivHeight);
  };

  const mediaObjectSwopInsertionDestination = (staY: number, nowY: number) => {
    const mediaObejctDivHeightKeys: Array<number> = AppContextValue.sortNumber(
      Object.keys(mediaObejctDivHeight),
      false
    );

    const firstKey = mediaObejctDivHeightKeys[0];
    const lastKey =
      mediaObejctDivHeightKeys[mediaObejctDivHeightKeys.length - 1];
    const firstYpos = mediaObejctDivHeight[firstKey][0];
    const lastYpos = mediaObejctDivHeight[lastKey][1];

    if (nowY <= firstYpos) {
      return 0;
    }

    if (lastYpos <= nowY) {
      return Number(lastKey) + 1;
    }

    if (staY > nowY) {
      //上向きへの移動
      for (let i = mediaObejctDivHeightKeys.length - 1; i >= 1; i--) {
        const A_key: number = mediaObejctDivHeightKeys[i];
        const A_yPosArray: Array<number> = mediaObejctDivHeight[A_key];
        const A_yPos: number = A_yPosArray[0];

        const B_key: number = mediaObejctDivHeightKeys[i - 1];
        const B_yPosArray: Array<number> = mediaObejctDivHeight[B_key];
        const B_yPos: number = B_yPosArray[0];

        if (A_yPos >= nowY && nowY >= B_yPos) {
          //上方面
          return Number(A_key);
        }
      }
    } else if (staY <= nowY) {
      //下向きへの移動
      for (let i = 0; i < mediaObejctDivHeightKeys.length - 1; i++) {
        const A_key: number = mediaObejctDivHeightKeys[i];
        const A_yPosArray: Array<number> = mediaObejctDivHeight[A_key];
        const A_yPos: number = A_yPosArray[1];

        const B_key: number = mediaObejctDivHeightKeys[i + 1];
        const B_yPosArray: Array<number> = mediaObejctDivHeight[B_key];
        const B_yPos: number = B_yPosArray[1];

        if (A_yPos <= nowY && nowY <= B_yPos) {
          //下方面
          return Number(A_key) + 1;
        }
      }
    }
     return -1;
  };

  
  //elementTimelineWidthSetState elementLayerPanelWidthSetState elementLayerDurationWidthSetState
  const windowSizeEvent = () => {
    const size = timelineMousePosition.elementSize(
      timelineAreaElement
    );

    elementTimelineWidthSetState(size[0])
  }

  useEffect(() => {

  }, [elementTimelineWidth])

  useEffect(() => {
    window.addEventListener('resize', windowSizeEvent);
    windowSizeEvent()
    elementLayerPanelWidthSetState(400)
    elementLayerDurationWidthSetState(4000)

    return () => {
      window.removeEventListener('resize', windowSizeEvent);
    }
  }, [])
  

  // mediaObejctDivHeightSetState(new Array(10)) //レンダリングがかかるたびに要素高さ管理stateの要素数更新する

  return (
    <>
      <p>選択中のコンポジット：{SetupEditorContextValue.choiceComposite}</p>

      <div
        className="timeline-area"
        draggable="false"
        ref={timelineAreaElement}
      >
        <div
          className="timeline-area-scroll"
          ref={timelineScrollElement}
          draggable="false"

          style={{"width":elementLayerPanelWidth+elementLayerDurationWidth+"px"}}

          // onScroll={TimeLineAreaMove}
        >
          <TimelineAreaDivContext.Provider
            value={{
              insertUserHandMediaObjectList: insertUserHandMediaObjectList,
              deleteUserHandMediaObjectList: deleteUserHandMediaObjectList,
              hasUserHandMediaObjectList: hasUserHandMediaObjectList,
              getUserHandMediaObjectList: getUserHandMediaObjectList,
              timelineAreaElement: timelineAreaElement,
              timelineScrollElement: timelineScrollElement,

              timelineUpdateDOM: timelineUpdateDOM,
              mediaObejctDivHeightSetStateValue:
                mediaObejctDivHeightSetStateValue,
              // middleDataOperation: middleDataOperation,
              // MouseSelectedSetValue: MouseSelectedSetValue,
              // MouseUnselectedSetValue: MouseUnselectedSetValue,
              mediaObjectSwopInsertionDestination:
                mediaObjectSwopInsertionDestination,
              focusMediaObjectSpace: focusMediaObjectSpace,
              focusMediaObjectSpaceSetState: focusMediaObjectSpaceSetState,

              elementTimelineWidth:elementTimelineWidth,
              elementLayerPanelWidth:elementLayerPanelWidth,
              elementLayerDurationWidth:elementLayerDurationWidth
            }}
          >
            <>
              <MediaObjectAreaSpaceComponent.switchMediaObjectAreaSpace
                spaceIndex={0}
              />

              {/* {componentGenerateMediaObjectAreaSpace(-1)} */}
              {AppContextValue.componentConvertMediaObjectArea(
                SetupEditorContextValue.choiceComposite
              ).map((output: any, index: number) => (
                // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

                <MediaObjectAreaComponent
                  DownstreamMiddleDataMediaObject={output}
                  indexMediaObejct={index}
                  key={index}
                />
              ))}
            </>
          </TimelineAreaDivContext.Provider>
        </div>
      </div>
    </>
  );
};
export default TimelineComponent;
