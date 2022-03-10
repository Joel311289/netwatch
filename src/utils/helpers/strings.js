import _ from 'lodash';
import moment from 'moment';
import 'moment/dist/locale/es';

export const isValidateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
};

export const backgroundImageUrl = (path) => (path ? `url(${path})` : '');

export const diffYearsDate = (date, now) => moment(now || new Date()).diff(date, 'years');
export const formattedDate = (date) => {
  moment.locale('es');
  return date ? moment(new Date(date)).format('DD MMM YYYY') : '';
};
export const formattedYear = (date) => (date ? new Date(date).getFullYear() : '');
export const formattedTime = (duration) => {
  const hours = duration / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return duration
    ? [
        { number: rhours, sufix: 'h' },
        { number: rminutes, sufix: 'm' }
      ]
        .filter(({ number }) => !!number)
        .map(({ number, sufix }) => `${number}${sufix}`)
        .join(' ')
    : '';
};

export const queryParams = (url = window.location.search) => {
  const urlSearchParams = new URLSearchParams(url);
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  return queryParams;
};
export const queryString = (params) =>
  Object.keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])})`;
    })
    .join('&');

export const truncatedText = (text, limit) => _.truncate(text, { length: limit, separator: ' ' });
export const removeSpecialCharactersText = (text) =>
  text
    .replace(/Â|À|Å|Ã/g, 'A')
    .replace(/â|à|å|ã/g, 'a')
    .replace(/Ä/g, 'AE')
    .replace(/ä/g, 'ae')
    .replace(/Ç/g, 'C')
    .replace(/ç/g, 'c')
    .replace(/É|Ê|È|Ë/g, 'E')
    .replace(/é|ê|è|ë/g, 'e')
    .replace(/Ó|Ô|Ò|Õ|Ø/g, 'O')
    .replace(/ó|ô|ò|õ/g, 'o')
    .replace(/Ö/g, 'OE')
    .replace(/ö/g, 'oe')
    .replace(/Š/g, 'S')
    .replace(/š/g, 's')
    .replace(/ß/g, 'ss')
    .replace(/Ú|Û|Ù/g, 'U')
    .replace(/ú|û|ù/g, 'u')
    .replace(/Ü/g, 'UE')
    .replace(/ü/g, 'ue')
    .replace(/Ý|Ÿ/g, 'Y')
    .replace(/ý|ÿ/g, 'y')
    .replace(/Ž/g, 'Z')
    .replace(/ž/, 'z')
    .replace(/[^a-zA-Z0-9 ]/g, '');
export const string = (text) => (text ? String(text) : '');

export const camelCase = _.camelCase;
export const kebabCase = _.kebabCase;
