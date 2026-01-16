export const makeGroup = (element: HTMLDivElement) => {
  const choiceRegex = /^[①②③④⑤⑥⑦⑧⑨⑩]/;

  const titleGroup: HTMLElement[] = [];
  const choiceGroup: HTMLElement[] = [];

  const children = Array.from(element.children ?? []) as HTMLElement[];

  let idx = children.length - 1;
  const tailChoices: HTMLElement[] = [];

  while (idx >= 0) {
    const el = children[idx];
    const text = el.textContent?.trim() || "";

    if (choiceRegex.test(text)) {
      tailChoices.push(el);
      idx--;
      continue;
    }
    break;
  }

  tailChoices.reverse();

  if (tailChoices.length >= 5) {
    choiceGroup.push(...tailChoices);
  }

  const choiceSet = new Set(choiceGroup);
  children.forEach((el) => {
    if (choiceSet.has(el)) return;

    el.classList.add("question-title-group");
    if (el.style.textAlign === "justify") el.style.textAlign = "initial";

    titleGroup.push(el);
  });

  if (choiceGroup.length !== 5) return;

  const choiceWrapper = document.createElement("div");
  choiceWrapper.className = "question-choice-group";
  choiceGroup.forEach((el) => {
    const firstTextNode = Array.from(el.childNodes).find(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
    );
    if (!firstTextNode) return;

    const textContent = firstTextNode.textContent!;
    const match = textContent.match(choiceRegex);

    if (match) {
      const span = document.createElement("span");
      span.className = "choice-index";
      span.textContent = match[0];

      const rest = textContent.slice(match[0].length);
      const restNode = document.createTextNode(rest);

      el.replaceChild(restNode, firstTextNode);
      el.insertBefore(span, restNode);
    }

    const children = Array.from(el.childNodes);
    const indexSpan = children.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).classList.contains("choice-index"),
    );

    const wrapper = document.createElement("div");
    children.forEach((child) => {
      if (child !== indexSpan) wrapper.appendChild(child);
    });

    if (indexSpan) {
      el.innerHTML = "";
      el.appendChild(indexSpan);
      el.appendChild(wrapper);
    }

    choiceWrapper.appendChild(el);
  });

  element.innerHTML = "";

  titleGroup.forEach((el) => {
    element.appendChild(el);
  });

  element.appendChild(choiceWrapper);
};
