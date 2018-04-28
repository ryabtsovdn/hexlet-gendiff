import defaultRenderer from './default';
import plainRenderer from './plain';

const renderers = {
  default: defaultRenderer,
  plain: plainRenderer,
};

const getRenderer = format => ({ toString: renderers[format] });

export default getRenderer;
