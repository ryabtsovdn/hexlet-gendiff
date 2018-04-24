import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': ini.parse,
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
