import { globalStyle, type GlobalStyleRule, style } from "@vanilla-extract/css";
import {
  choiceIndex,
  mathBase,
  mathFracLine,
  mathImg,
  mathLatex,
  mathRect,
  mathSrOnly,
  mathTable,
  questionChoiceGroup,
  questionChoiceGroupInner,
  titleGroup,
  titleGroupMath,
  titleGroupSub,
} from "./baseMathJax.css";

export const container = style({
  width: "100%",
});

export const mathGlobal: GlobalStyleRule = {
  fontFamily: "inherit",
};

globalStyle(`${container}`, mathGlobal);
globalStyle(`${container} table`, mathTable);
globalStyle(`${container} img`, mathImg);
globalStyle(`${container} .RECT`, mathRect);
globalStyle(`${container} .ML__latex`, mathLatex);
globalStyle(`${container} .ML__sr-only`, mathSrOnly);
globalStyle(`${container} .ML__base`, mathBase);
globalStyle(`${container} .ML__frac-line`, mathFracLine);

globalStyle(`${container} .question-choice-group`, questionChoiceGroup);
globalStyle(
  `${container} .question-choice-group > div`,
  questionChoiceGroupInner,
);
globalStyle(`${container} .choice-index`, choiceIndex);

globalStyle(`${container} > .question-title-group`, titleGroup);
globalStyle(`${container} > .question-title-group > span`, titleGroupSub);
globalStyle(`${container} > .question-title-group span`, titleGroupMath);
