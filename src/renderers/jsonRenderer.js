const getKeysOfType = (tree, typeToSearch) =>
  tree.reduce((acc, node) => {
    const {
      type,
      children,
    } = node;
    const newAcc = type === typeToSearch ? [...acc, node] : acc;
    if (type === 'merged') {
      return [...newAcc, ...getKeysOfType(children, typeToSearch)];
    }
    return newAcc;
  }, []);


export default (ast) => {
  const deleted = getKeysOfType(ast, 'deleted');
  const added = getKeysOfType(ast, 'added');
  const changed = getKeysOfType(ast, 'changed');
  const unchanged = getKeysOfType(ast, 'unchanged');
  const merged = getKeysOfType(ast, 'merged');

  const firstConfigKeys = [...deleted, ...changed, ...unchanged, ...merged];
  const secondConfigKeys = [...changed, ...unchanged, ...merged, ...added];

  const stats = {
    configs: [
      {
        keys: firstConfigKeys,
        total: firstConfigKeys.length,
      },
      {
        keys: secondConfigKeys,
        total: secondConfigKeys.length,
      },
    ],
    keys: [
      {
        type: 'deleted',
        keys: deleted,
        count: deleted.length,
      },
      {
        type: 'added',
        keys: added,
        count: added.length,
      },
      {
        type: 'changed',
        keys: changed,
        count: changed.length,
      },
      {
        type: 'unchanged',
        keys: unchanged,
        count: unchanged.length,
      },
      {
        type: 'merged',
        keys: merged,
        count: merged.length,
      },
    ],
  };
  return JSON.stringify(stats);
};
