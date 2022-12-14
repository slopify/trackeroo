import css2json from 'css2json';

export default function encapsulateCss(parent: string, css: string): string {
  try {
    if (!(parent?.length && css?.length)) return null;

    const cssEntries = Object.entries(css2json(css)).map((item) => [
      `${parent} ${item[0]}`,
      Object.entries(item[1]).map((item) => `${item[0]}:${item[1]} !important`),
    ]);

    return cssEntries.map((item) => `${item[0]} { ${(item[1] as string[]).join(';')} }`).join(' ');
  } catch (err) {
    return '';
  }
}
