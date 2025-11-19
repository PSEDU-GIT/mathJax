import cx from "classnames";
import { renderMathInElement } from "mathlive";
import { useEffect, useRef, useState } from "react";
import { makeGroup } from "./_state/makeGroup";
import { onResultLoad } from "./_state/onResultLoad";
import { useLatex } from "./_lib/useLatex";
import { onStripOuterDivs } from "./_state/onStripOuterDivs";
import * as styles from "./baseMathJax.css";

type Props = {
  content: string;
  className?: string;
  questionIndex?: number;

  onLoad?: (height: number[], element?: HTMLElement[]) => void;
};

export const BaseMathJax = ({
  content,
  className,
  onLoad,
  questionIndex = 0,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (content === "") {
      setIsLoaded(true);
      return;
    }

    const replaceContent = onStripOuterDivs(content)
      .replace(/<SPAN[^>]*>/gi, "")
      .replace(/<\/SPAN>/gi, "")
      .replaceAll("font-size", "")
      .replace(/<br[^>]*>/gi, "")
      .replaceAll(" black", " #aaa")
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
      .replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_m, body) => {
        const inner = body.replace(
          /\\begin\{array\}\{[lcr|]+\}([\s\S]*?)\\end\{array\}/g,
          (_m2: any, content: any) => content,
        );

        return `\\begin{cases} ${inner} \\end{cases}`;
      })
      .replaceAll("\\cfrac", "\\displaystyle \\frac")
      .replaceAll("`", "")
      .replaceAll("•", "x");

    const nContent = replaceContent.replace(/\[!\s*(.*?)\s*!]/g, (_, math) => {
      math = useLatex(math);
      return `\\(${math}\\)`;
    });

    ref.current.innerHTML = nContent;

    makeGroup(ref.current);

    /**
     * content가 변경이 되는 경우가 없을경우 예외처리
     */
    if (replaceContent === nContent) setIsLoaded(true);
    /**
     * 이미지나 라텍스 문자로 인해 높이값 변화 측정을 위해서 observer 처리
     */
    const observer = onResultLoad(ref.current, setIsLoaded);

    renderMathInElement(ref.current);

    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    if (!ref.current || !isLoaded || !onLoad) return;

    const groups = ref.current.querySelectorAll(".question-choice-group");

    groups.forEach((element) => {
      const group = element as HTMLDivElement;
      const children = Array.from(group.children) as HTMLDivElement[];

      if (children.length === 0) return;

      const maxWidth = Math.max(...children.map((el) => el.scrollWidth));
      const groupWidth = group.getBoundingClientRect().width;

      const ratio = maxWidth / groupWidth;

      let itemsPerRow = questionIndex;
      if (questionIndex === 0) {
        if (ratio <= 0.2) itemsPerRow = 5;
        else if (ratio <= 0.33) itemsPerRow = 3;
        else if (ratio <= 0.5) itemsPerRow = 2;
        else itemsPerRow = 1;
      }

      children.forEach((child) => {
        child.style.flex = `0 0 ${100 / itemsPerRow}%`;
      });
    });

    onLoad(
      Array.from(ref.current.children).map(
        (child) => (child as HTMLElement).getBoundingClientRect().height,
      ),
      Array.from(ref.current.children) as HTMLElement[],
    );
  }, [isLoaded]);

  return <div ref={ref} className={cx(className, styles.container)} />;
};

export default BaseMathJax;
