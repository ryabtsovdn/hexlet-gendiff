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

const builders = {
  unchanged: ({ name, value }, deep) => `${indent(deep)}  ${name}: ${stringify(value, deep)}`,
  added: ({ name, value }, deep) => `${indent(deep)}+ ${name}: ${stringify(value, deep)}`,
  deleted: ({ name, value }, deep) => `${indent(deep)}- ${name}: ${stringify(value, deep)}`,
  changed: ({ name, value: [before, after] }, deep) => [
    `${indent(deep)}- ${name}: ${stringify(before, deep)}`,
    `${indent(deep)}+ ${name}: ${stringify(after, deep)}`,
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
