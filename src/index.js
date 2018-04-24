import fs from 'fs';
import { has } from 'lodash';

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));

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
