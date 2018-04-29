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
  merged: (tree, path, cb) => cb(tree, path),
};

const buildNested = (tree, path) => {
  const { name, children } = tree;
  return children.map((node) => {
    const build = builders[node.type];
    return build(node, name ? `${path}${name}.` : `${name}`, buildNested);
  });
};

export default (ast) => {
  const builded = buildNested(ast);
  return flattenDeep(builded).join('\n');
};
