export const loadJSON = (path: string) => {
  return fetch(`${path}`, { headers: { 'Cache-Control': 'no-cache' } }).then(res => res.json());
};
export const changeHTMLAttribute = (attribute: string, value: any) => {
  if (document.documentElement) document.documentElement.setAttribute(attribute, value);
  return true;
};
