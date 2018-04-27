import { readFileSync } from 'fs';
import { extname } from 'path';
import { has, isObject, find } from 'lodash';
import getParser from './parsers';
import render from './renders';

const makeNode = (name, type, oldValue, newValue) =>
  ({
    name,
    type,
    oldValue,
    newValue,
  });

const diffTypes = [
  {
    type: 'added',
    check: (obj1, obj2, key) => !has(obj1, key),
    process: (obj1, obj2, key) => makeNode(key, 'added', '', obj2[key]),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !has(obj2, key),
    process: (obj1, obj2, key) => makeNode(key, 'deleted', obj1[key], ''),
  },
  {
    type: 'merged',
    check: (obj1, obj2, key) => isObject(obj1[key]) && isObject(obj2[key]),
    process: (obj1, obj2, key, cb) => cb(obj1[key], obj2[key], key),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => makeNode(key, 'unchanged', obj1[key], obj2[key]),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => makeNode(key, 'changed', obj1[key], obj2[key]),
  },
];

export const genAST = (obj1, obj2, name = '') => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const children = keys.map((key) => {
    const { process } = find(diffTypes, ({ check }) => check(obj1, obj2, key));
    return process(obj1, obj2, key, genAST);
  });
  return { name, type: 'merged', children };
};

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
