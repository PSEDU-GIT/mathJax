export const onStripOuterDivs = (html: string) => {
  let s = html.trim();

  const RE_START_DIV = /^<div[^>]*>/i;
  const RE_END_DIV = /<\/div>\s*$/i;
  const RE_QZ_DIV = /^<div[^>]*\bclass=["']?[^>"']*\bqz\b[^>"']*["']?[^>]*>/i;

  while (RE_START_DIV.test(s)) {
    if (RE_QZ_DIV.test(s)) {
      s = s.replace(RE_START_DIV, '').replace(RE_END_DIV, '').trim();
      break;
    }

    s = s.replace(RE_START_DIV, '').replace(RE_END_DIV, '').trim();
  }

  return s;
};
