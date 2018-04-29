import { readFileSync } from 'fs';
import { extname } from 'path';
import { has, isObject, find } from 'lodash';
import getParser from './parsers';
import getRenderer from './renderers';

const diffTypes = [
  {
    type: 'added',
    check: (obj1, obj2, key) => !has(obj1, key),
    process: (obj1, obj2, key) => ({
      name: key,
      type: 'added',
      newValue: obj2[key],
    }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !has(obj2, key),
    process: (obj1, obj2, key) => ({
      name: key,
      type: 'deleted',
      oldValue: obj1[key],
    }),
  },
  {
    type: 'merged',
    check: (obj1, obj2, key) => isObject(obj1[key]) && isObject(obj2[key]),
    process: (obj1, obj2, key, cb) => ({ name: key, type: 'merged', children: cb(obj1[key], obj2[key]) }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => ({
      name: key,
      type: 'unchanged',
      oldValue: obj1[key],
      newValue: obj2[key],
    }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => ({
      name: key,
      type: 'changed',
      oldValue: obj1[key],
      newValue: obj2[key],
    }),
  },
];

const buildMerged = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  return keys.map((key) => {
    const { process } = find(diffTypes, ({ check }) => check(obj1, obj2, key));
    return process(obj1, obj2, key, buildMerged);
  });
};

export const genAST = (obj1, obj2) => buildMerged(obj1, obj2);

const genDiff = (path1, path2, format = 'tree') => {
  const ext1 = extname(path1);
  const data1 = readFileSync(path1, 'utf8');
  const obj1 = getParser(ext1)(data1);

  const ext2 = extname(path2);
  const data2 = readFileSync(path2, 'utf8');
  const obj2 = getParser(ext2)(data2);

  const ast = genAST(obj1, obj2);
  const renderer = getRenderer(format);
  return renderer.toString(ast);
};

export default genDiff;
