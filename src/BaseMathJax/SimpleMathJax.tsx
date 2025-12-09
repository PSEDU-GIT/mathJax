import { useEffect, useRef } from "react";
import { onStripOuterDivs } from "./_state/onStripOuterDivs";
import { useLatex } from "./_lib/useLatex";
import { renderMathInElement } from "mathlive";
import * as styles from "./baseMathJax.css";

type Props = {
  content: string;
};

export const SimpleMathJax = ({ content }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const replaceContent = onStripOuterDivs(content)
      .replaceAll("\\rightarrow", "→")
      .replaceAll("* PER *", "꿷")
      .replaceAll("* PYUNG *", "꿶")
      .replaceAll("\\emptyset", "꿸")
      .replaceAll("󰁀", "꿵")
      .replaceAll("* DAL *", "꿵")
      .replace(/\\not(?!in\b)/g, "\\notin")
      .replaceAll("\\boldsymbol", "")
      .replace(/\\rm\s*/g, "")
      .replace(/\\it\s*/g, "")
      .replace(/\\left\(\s*([\s\S]*?)\s*\\right\)/g, (_, inner) => {
        if (!inner.includes("\\\\")) return `\\left(${inner}\\right)`;

        return `\\left(\\begin{array}{l}${inner}\\end{array}\\right)`;
      })
      .replaceAll("\\cfrac", "\\displaystyle \\frac")
      .replaceAll("`", "")
      .replaceAll("_", "\\;")
      .replace(/\[!.*?!\]/g, "\\;")
      .replace(/\s+/g, "\\;")
      .replaceAll("•", "x");

    ref.current.innerHTML = `[!${replaceContent}!]`.replace(
      /\[!\s*([\s\S]*?)\s*!\]/g,
      (_, raw) => {
        const math = useLatex(raw);

        const looksLikeTeX =
          /\\|[{^}_]|\\frac|\\sum|\\int|\\sqrt|[=+\-*/<>]/.test(math);
        return looksLikeTeX ? `\\(${math}\\)` : math;
      },
    );

    renderMathInElement(ref.current);
  }, [content]);

  return <div ref={ref} className={styles.container} />;
};
