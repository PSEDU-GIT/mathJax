import { type CSSProperties } from "react";
import { globalStyle, type GlobalStyleRule, style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
});

/**
 * -----------------------------------------------------------------------
 * 기본 스타일
 */

export const mathGlobal: GlobalStyleRule = {
  fontFamily: "STIX Two Math, Latin Modern Math, math_bjsc3, serif",
};

export const mathTable: CSSProperties = {
  maxWidth: "100%",
  height: "auto",
};

export const mathImg: CSSProperties = {
  maxWidth: "100%",
  height: "auto",
};

export const mathRect: CSSProperties = {
  maxWidth: "100%",
  height: "auto !important",
  padding: 6,
  borderRadius: 4,
};

export const mathLatex: GlobalStyleRule = {
  width: "auto",
  whiteSpace: "normal",
};

export const mathSrOnly: GlobalStyleRule = {
  "@media": {
    print: {
      display: "none !important",
    },
  },
};

export const mathBase: CSSProperties = {
  width: "auto",
};

export const mathFracLine: CSSProperties = {
  minHeight: 0,
};

globalStyle(`${container}`, mathGlobal);
globalStyle(`${container} table`, mathTable);
globalStyle(`${container} img`, mathImg);
globalStyle(`${container} .RECT`, mathRect);
globalStyle(`${container} .ML__latex`, mathLatex);
globalStyle(`${container} .ML__sr-only`, mathSrOnly);
globalStyle(`${container} .ML__base`, mathBase);
globalStyle(`${container} .ML__frac-line`, mathFracLine);

/**
 * -----------------------------------------------------------------------
 * 문번 스타일
 */

export const questionChoiceGroup: CSSProperties = {
  paddingTop: 6,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "4px 0",
};

export const questionChoiceGroupInner: CSSProperties = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  fontSize: 13,
  color: "#000 !important",
};

export const choiceIndex: CSSProperties = {
  marginRight: 5,
};

globalStyle(`${container} .question-choice-group`, questionChoiceGroup);
globalStyle(
  `${container} .question-choice-group > div`,
  questionChoiceGroupInner,
);
globalStyle(`${container} .choice-index`, choiceIndex);

/**
 * -----------------------------------------------------------------------
 * 타이틀 스타일
 */

export const titleGroup: GlobalStyleRule = {
  lineHeight: 1.7,
  fontWeight: 300,
  fontSize: 12,
  color: "#000 !important",
  letterSpacing: "0.2px !important",
};

export const titleGroupSub: GlobalStyleRule = {
  margin: "0 2px",
};

export const titleGroupMath: GlobalStyleRule = {
  letterSpacing: `0 !important`,
};

globalStyle(`${container} > .question-title-group`, titleGroup);
globalStyle(`${container} > .question-title-group > span`, titleGroupSub);
globalStyle(`${container} > .question-title-group span`, titleGroupMath);
