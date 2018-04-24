import fs from 'fs';
import genDiff from '../src';

it('Diff flat JSONs', () => {
  const actual = genDiff('./__tests__/__fixtures__/flat1.json', './__tests__/__fixtures__/flat2.json');
  const expected = fs.readFileSync('./__tests__/__fixtures__/flatDiff.diff', 'utf8');
  expect(actual).toBe(expected);
});
