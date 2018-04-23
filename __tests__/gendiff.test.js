import fs from 'fs';
import genDiff from '../src';

it('Diff flat JSONs', () => {
  const json1 = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/flat1.json', 'utf8'));
  const json2 = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/flat2.json', 'utf8'));
  const actual = genDiff(json1, json2);
  const expected = fs.readFileSync('./__tests__/__fixtures__/flatDiff.diff', 'utf8');
  expect(actual).toBe(expected);
});
