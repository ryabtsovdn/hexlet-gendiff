import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import getParser from './parsers';

const genDiff = (path1, path2) => {
  const obj1 = getParser(extname(path1))(readFileSync(path1, 'utf8'));
  const obj2 = getParser(extname(path2))(readFileSync(path2, 'utf8'));

  const compareResult = Object.keys({ ...obj1, ...obj2 })
    .reduce((acc, key) => {
      if (!has(obj1, key)) {
        return [...acc, `  + ${key}: ${obj2[key]}`];
      }
      if (!has(obj2, key)) {
        return [...acc, `  - ${key}: ${obj1[key]}`];
      }
      if (obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      return [...acc, `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`];
    }, []);

  return ['{', ...compareResult, '}'].join('\n');
};

export default genDiff;
