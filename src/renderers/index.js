import treeRenderer from './treeRenderer';
import plainRenderer from './plainRenderer';
import jsonRenderer from './jsonRenderer';

const renderers = {
  tree: treeRenderer,
  plain: plainRenderer,
  json: jsonRenderer,
};

const getRenderer = format => ({ toString: renderers[format] });

export default getRenderer;
