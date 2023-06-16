// https://jamesthom.as/2021/05/setting-up-esbuild-for-typescript-libraries/
// https://souporserious.com/bundling-typescript-with-esbuild-for-npm/
type Data = Record<string, any>;

const TMPL_RE = /\{([^}]+)\}/g;

function tmplKeys(tmpl: string): string[] {
  const keys: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = TMPL_RE.exec(tmpl))) {
    keys.push(match[1]);
  }
  return keys;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function slice2data(inKeys, inData: Data) {
  const tmpl = {};
  const data = {};

  if (!inData || isEmpty(inData)) return [null, null];
  Object.keys(inData).forEach((key) => {
    const target = inKeys.includes(key) ? tmpl : data;
    target[key] = inData[key];
  });

  return [tmpl, data].map((item) => (isEmpty(item) ? null : item));
}

export default (inUrlTmpl: string, inData: Data) => {
  const keys = tmplKeys(inUrlTmpl);
  return slice2data(keys, inData);
};
