import { readFileSync } from 'fs';
import genDiff from '../src';

describe('Tests', () => {
  it('Diff flat JSONs', () => {
    const actual = genDiff('./__tests__/__fixtures__/flat1.json', './__tests__/__fixtures__/flat2.json');
    const expected = readFileSync('./__tests__/__fixtures__/flat.diff', 'utf8');
    expect(actual).toBe(expected);
  });

  it('Diff flat YAMLs', () => {
    const actual = genDiff('./__tests__/__fixtures__/flat1.yml', './__tests__/__fixtures__/flat2.yml');
    const expected = readFileSync('./__tests__/__fixtures__/flat.diff', 'utf8');
    expect(actual).toBe(expected);
  });

  it('Diff flat INIs', () => {
    const actual = genDiff('./__tests__/__fixtures__/flat1.ini', './__tests__/__fixtures__/flat2.ini');
    const expected = readFileSync('./__tests__/__fixtures__/flat.diff', 'utf8');
    expect(actual).toBe(expected);
  });

  it('Unsupported format', () => {
    try {
      genDiff('./__tests__/__fixtures__/flat1.docx', './__tests__/__fixtures__/flat2.docx');
    } catch (error) {
      expect(error.message).toBe('File has unsupported format: .docx');
    }
  });
});
