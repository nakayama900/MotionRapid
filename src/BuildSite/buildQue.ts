import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

import { testJoin, textReplace } from "./buildHTML/buildAuxiliaryFunction";

const htmlElementSpeciesList = ["not", "BlockClass", "SubstanceClass", "TopClass"];
const cssElementSpeciesList = ["not", "Default", "SubstanceCSS", "Keyframe"];

export let htmlElementQue: { [name: string]: htmlElement } = {};
export const pushHtmlElementQue = (pushData: htmlElement, parentID: string = null) => {
  htmlElementQue[pushData.elementID] = pushData;

  console.log("parentID", htmlElementQue, parentID);
  if (parentID) {
    htmlElementQue[parentID].childID.push(pushData.elementID);
  }

  return pushData.elementID;
};

export const alldeleteHtmlElementQue = () => {
  htmlElementQue = {};
};

export const getHtmlElementQue = (htmlID: string) => {
  return htmlElementQue[htmlID];
};

export abstract class htmlElement {
  abstract species: string;
  abstract getText: Function;
  abstract elementID: string;
  childID: Array<string> = [];

  constructor() {}
}

export class htmlElementTopClass extends htmlElement {
  species = htmlElementSpeciesList[3];
  elementID = "htmlTopID_" + getUUID();
  getText = () => {};

  constructor() {
    super();
  }
}

export class htmlElementSubstanceClass extends htmlElement {
  substanc: string;
  species = htmlElementSpeciesList[2];
  elementID = "htmlSubstanceID_" + getUUID();

  constructor(send_substanc: string) {
    super();
    this.substanc = send_substanc;
  }
  getText = () => {
    return [this.substanc, this.childID];
  };
}

export class htmlElementBlockClass extends htmlElement {
  indent: number; //1ならindentを下げる -1ならあげる
  htmlTag: string;

  attribute: { [name: string]: string };
  species = htmlElementSpeciesList[1];
  elementID = "htmlBlockID_" + getUUID();

  constructor(send_tag: string, send_attribute: { [name: string]: string } = {}) {
    super();

    // this.indent = send_indent;
    this.htmlTag = send_tag;
    this.attribute = send_attribute;
  }

  getText = () => {
    let returnText = "";

    // let tempArray: Array<string> = [];
    returnText += testJoin(["<", this.htmlTag, " "]);
    for (let attributeKey in this.attribute) {
      returnText += testJoin([attributeKey, "=", this.attribute[attributeKey]]);
    }
    returnText += testJoin([">", "\n"]);

    // console.log("tempArray", tempArray);

    // returnText += testJoin(tempArray);
    returnText += testJoin(["%%%", "\n"]);
    returnText += testJoin(["</", this.htmlTag, ">", "\n"]);
    return returnText;
  };
}

//ここまでhtml
// *********************************************************************************
//ここからCSS

abstract class cssElement {
  abstract species: string;
  abstract elementID: string;
  abstract getText: Function;
  childID: Array<string> = [];

  // constructor(send_parentID: string) {
  //   this.parentID = send_parentID;
  // }
}

export let cssElementQue: { [name: string]: cssElement } = {};
export const pushCSSElementQue = (pushData: cssElement, parentID: string) => {
  cssElementQue[pushData.elementID] = pushData;

  if (parentID) {
    cssElementQue[parentID].childID.push(pushData.elementID);
  }

  return pushData.elementID;
};

export const alldeleteCSSElementQue = () => {
  cssElementQue = {};
};

export const getCSSElementQue = (CSSID: string) => {
  return cssElementQue[CSSID];
};

export class cssElementDefault extends cssElement {
  species = cssElementSpeciesList[1];

  elementID = "cssID_" + getUUID();
  selectorName: string;
  // substanc: string;

  constructor(send_selectorName: string) {
    super();
    this.selectorName = send_selectorName;
    // this.substanc = send_substanc;
  }

  getText = () => {
    let returnText = "";

    returnText += testJoin([".", this.selectorName, "{", "\n"]);
    returnText += testJoin(["%%%"]);
    returnText += testJoin(["}"]);
    return returnText;
  };
}

export class cssElementSubstance extends cssElement {
  species: string = cssElementSpeciesList[2];
  elementID = "cssID_" + getUUID();
  substance: string;

  constructor(send_substance: string) {
    super();
    this.substance = send_substance;
  }

  getText = () => {
    let returnText = "";
    returnText += this.substance;
    return returnText;
  };
}

// export class cssElementDefaultClass extends cssElement {
//   selector: string;
//   property: string;

//   constructor() {
//     super();
//   }
// }
