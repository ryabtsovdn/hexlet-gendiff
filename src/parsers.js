import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
};

const getParser = format =>
  (data) => {
    const parse = parsers[format];
    if (!parse) {
      throw new Error(`File has unsupported format: ${format}`);
    }
    return parse(data);
  };

export default getParser;
