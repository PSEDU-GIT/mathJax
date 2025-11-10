import * as he from "he";
import { convertLatexToMathMl } from "mathlive";

export const useLatex = (latex: string) => {
  let result = latex;

  const originalLog = console.info;
  let hasMathLiveLogError = false;

  console.info = (...args: any[]) => {
    if (
      args.some(
        (arg) => typeof arg === "string" && arg.includes("Unexpected element"),
      )
    ) {
      const command = (args[1] as { command: string }).command;
      if (!(command === "\\overline") && !(command === "\\underline"))
        hasMathLiveLogError = true;
    }
    originalLog(...args);
  };

  convertLatexToMathMl(result);

  console.info = originalLog;

  if (hasMathLiveLogError) {
    console.error("MathLive 내부 로그로 오류 감지:", result);
    result = result
      .replace(/\\left\.?/g, "")
      .replace(/\\right\.?/g, "")
      .replace(/\\begin{matrix}((\s|\\)*)\\end{matrix}/g, "")
      .replace(/\\end\s*{(?:array|matrix|pmatrix|bmatrix|cases)}/g, "");

    console.log("재변환", result);
    convertLatexToMathMl(result);
    console.log("에러 확인");
  }

  return he.decode(result);
};
