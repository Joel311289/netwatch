import idc from 'is-dark-color';

export const isValidHex = (hex) => new RegExp(/[0-9A-Fa-f]{6}/g).test(hex);
export const isValidRgb = (rgb) =>
  new RegExp(/^(?:(?:^|,\s*)([01]?\d\d?|2[0-4]\d|25[0-5])){3}$/).test(rgb);

export const hexToRgb = (hex) =>
  hex
    ? hex
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16))
        .join(', ')
    : '';

export const isDarkColor = (color) =>
  isValidHex(color) ? idc(color) : isValidRgb(color) ? idc(hexToRgb(color)) : false;
