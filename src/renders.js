import { flattenDeep, isObject } from 'lodash';

const indent = tab => '  '.repeat(tab);

const stringify = (value, tab) => {
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
        return `${indent(tab + 1)}${str}`;
      }
      return `${indent(tab + 2)}${str}`;
    })
    .join('\n')
    .replace(/"/g, '');
};

const getDiffString = (name, value, tab, mod) =>
  `${indent(tab)}${mod}${name}: ${stringify(value, tab)}`;

const builders = {
  unchanged: ({ name, value }, tab) => getDiffString(name, value, tab, '  '),
  deleted: ({ name, value }, tab) => getDiffString(name, value, tab, '- '),
  added: ({ name, value }, tab) => getDiffString(name, value, tab, '+ '),
  changed: ({ name, valueBefore, valueAfter }, tab) => [
    getDiffString(name, valueBefore, tab, '- '),
    getDiffString(name, valueAfter, tab, '+ '),
  ],
  merged: (tree, tab) => {
    const { name, children } = tree;
    return [
      `${indent(tab + 1)}${name}: {`,
      children.map((node) => {
        const build = builders[node.type];
        return build(node, tab + 2);
      }),
      `${indent(tab + 1)}}`,
    ];
  },
};

const render = ({ children }) => {
  const builded = [
    '{',
    children.map((node) => {
      const build = builders[node.type];
      return build(node, 1);
    }),
    '}',
  ];
  return flattenDeep(builded).join('\n');
};

export default render;
