import { flattenDeep } from 'lodash';

const stringify = (value, deep) => {
  if (typeof value !== 'object') {
    return value;
  }
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((str, index, arr) => {
      if (index === 0) {
        return str;
      }
      if (index === arr.length - 1) {
        return `${'  '.repeat(deep + 1)}${str}`;
      }
      return `${'  '.repeat(deep + 2)}${str}`;
    })
    .join('\n')
    .replace(/"/g, '');
};

const builders = {
  unchanged: ({ name, value }, deep) => `${'  '.repeat(deep)}  ${name}: ${stringify(value, deep)}`,
  added: ({ name, value }, deep) => `${'  '.repeat(deep)}+ ${name}: ${stringify(value, deep)}`,
  deleted: ({ name, value }, deep) => `${'  '.repeat(deep)}- ${name}: ${stringify(value, deep)}`,
  changed: ({ name, value: [before, after] }, deep) => [
    `${'  '.repeat(deep)}- ${name}: ${stringify(before, deep)}`,
    `${'  '.repeat(deep)}+ ${name}: ${stringify(after, deep)}`,
  ],
  // eslint-disable-next-line no-use-before-define
  merged: (node, deep) => build(node, deep + 1),
};

const build = (ast, deep) => {
  const { name, children } = ast;
  return [
    deep === 0 ? '{' : `${'  '.repeat(deep)}${name}: {`,
    children.map((node) => {
      const builder = builders[node.type];
      return builder(node, deep + 1);
    }),
    `${'  '.repeat(deep)}}`,
  ];
};

const render = ast => flattenDeep(build(ast, 0)).join('\n');

export default render;
