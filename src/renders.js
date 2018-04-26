import { flattenDeep, isObject } from 'lodash';

const indent = size => '  '.repeat(size);

const stringify = (value, deep) => {
  if (!isObject(value)) {
    return value;
  }
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((str, index, arr) => {
      if (index === 0) {
        return str;
      }
      if (index === arr.length - 1) {
        return `${indent(deep + 1)}${str}`;
      }
      return `${indent(deep + 2)}${str}`;
    })
    .join('\n')
    .replace(/"/g, '');
};

const getDiffString = (name, value, deep, mod) =>
  `${indent(deep)}${mod}${name}: ${stringify(value, deep)}`;

const builders = {
  unchanged: ({ name, value }, deep) => getDiffString(name, value, deep, '  '),
  deleted: ({ name, value }, deep) => getDiffString(name, value, deep, '- '),
  added: ({ name, value }, deep) => getDiffString(name, value, deep, '+ '),
  changed: ({ name, value: [before, after] }, deep) => [
    getDiffString(name, before, deep, '- '),
    getDiffString(name, after, deep, '+ '),
  ],
  merged: (node, deep) => {
    const { name, children } = node;
    return [
      deep === -1 ? '{' : `${indent(deep + 1)}${name}: {`,
      children.map((child) => {
        const build = builders[child.type];
        return build(child, deep + 2);
      }),
      `${indent(deep + 1)}}`,
    ];
  },
};

const render = ast => flattenDeep(builders.merged(ast, -1)).join('\n');

export default render;
