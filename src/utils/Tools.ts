export default class Tools {
  static generateId(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static templateString(
    [first, ...strs]: TemplateStringsArray,
    ...values: any[]
  ): string {
    return values
      .reduce((acc, curr) => acc.concat(curr, strs.shift()), [first])
      .filter((x: any) => (x && x !== true) || x === 0)
      .join('')
      .trim();
  }

  static applyAlphaColorHex(color: string, opacity: number = 1): string {
    let newColor = color;

    if (!newColor.startsWith('#')) {
      console.warn('Make sure you start color with "#". Ex: #F00F00');
      newColor = '#00000000';
    }

    if (opacity === 1) return newColor;

    const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
    return newColor + _opacity.toString(16).toUpperCase();
  }
}
