import { flattenDeep, isObject } from 'lodash';

const stringify = value => (isObject(value) ? 'complex value' : `'${value}'`);

const builders = {
  unchanged: ({ name, oldValue }, path) =>
    `Property '${path}${name}' was unchanged. Equal to: ${stringify(oldValue)}`,
  deleted: ({ name }, path) =>
    `Property '${path}${name}' was deleted`,
  added: ({ name, newValue }, path) => {
    const value = isObject(newValue) ? `${stringify(newValue)}` : `value: ${stringify(newValue)}`;
    return `Property '${path}${name}' was added with ${value}`;
  },
  changed: ({ name, oldValue, newValue }, path) =>
    `Property '${path}${name}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  merged: ({ name, children }, path, cb) => cb(children, `${path}${name}.`),
};

const buildMerged = (tree, path) =>
  tree.map((node) => {
    const build = builders[node.type];
    return build(node, path, buildMerged);
  });

export default (ast) => {
  const builded = buildMerged(ast, '');
  return flattenDeep(builded).join('\n');
};
