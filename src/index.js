import { readFileSync } from 'fs';
import { extname } from 'path';
import { has, isObject } from 'lodash';
import getParser from './parsers';
import render from './renders';

const makeLeaf = (name, type, valueBefore, valueAfter) => {
  if (type === 'changed') {
    return {
      name,
      type,
      valueBefore,
      valueAfter,
    };
  }
  return { name, type, value: valueBefore };
};

const makeBranch = (name, type, obj1, obj2) => {
  const children = Object.keys({ ...obj1, ...obj2 })
    .map((key) => {
      if (!has(obj1, key)) {
        return makeLeaf(key, 'added', obj2[key]);
      }
      if (!has(obj2, key)) {
        return makeLeaf(key, 'deleted', obj1[key]);
      }
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return makeBranch(key, 'merged', obj1[key], obj2[key]);
      }
      if (obj1[key] === obj2[key]) {
        return makeLeaf(key, 'unchanged', obj1[key]);
      }
      return makeLeaf(key, 'changed', obj1[key], obj2[key]);
    });
  return { name, type, children };
};

export const genAST = (obj1, obj2) =>
  makeBranch('', 'merged', obj1, obj2);

const genDiff = (path1, path2) => {
  const ext1 = extname(path1);
  const data1 = readFileSync(path1, 'utf8');
  const obj1 = getParser(ext1)(data1);

  const ext2 = extname(path2);
  const data2 = readFileSync(path2, 'utf8');
  const obj2 = getParser(ext2)(data2);

  const ast = genAST(obj1, obj2);
  return render(ast);
};

export default genDiff;
