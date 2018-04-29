const getKeysOfType = ({ children }, type, path = '') =>
  children.reduce((acc, value) => {
    const newAcc = value.type === type ? [...acc, `${path}${value.name}`] : acc;
    if (value.type === 'merged') {
      return [...newAcc, ...getKeysOfType(value, type, `${path}${value.name}.`)];
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
