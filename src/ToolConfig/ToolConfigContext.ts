import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const configSettingGUI: Array<string> = [
  "not",
  "textbox",
  "textboxNumber",
  "listBox",
  "checkBox",
  "radiobutton",
];

// *******************************************************************************************************

export type settingItemsData = {
  settingTitle: string;
  settingMessage: string;
  //   buttonFunc: Function;
  thisConfigSettingGUI: string;
  exposeValue: Array<string> | string | number | boolean;
  configItem: string;
};

type ConfigModeContextValue = {
  settingItemsArray: Array<settingItemsData>;
  configContent: ConfigItemType;
  configContentSetStateValue: Function;
  buttonOperationFunc: Function;
};

export const ConfigModeContext = createContext<ConfigModeContextValue>(
  {} as ConfigModeContextValue
);

// *******************************************************************************************************

export type ConfigItemType = {
  [name: string]: string | number | boolean;
};

export const ConfigItemNewComposite: Array<string> = [
  "compositeName",
  "compositeTime",
  "compositeMode",
];

// export type ConfigItemNewComposite = {
//   compositeName: "";
//   compositeTime: "";
//   compositeMode: "";
// };

// export type ConfigItemEditComposite = {
//   compositeName: "";
//   compositeTime: "";
//   compositeMode: "";
// };

// *******************************************************************************************************