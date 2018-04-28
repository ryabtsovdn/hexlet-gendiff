import { readFileSync } from 'fs';
import genDiff, { genAST } from '../src';

describe('genAST', () => {
  it('should form a correct AST', () => {
    const astStr = readFileSync('./__tests__/__fixtures__/complex/ast.json', 'utf8');
    const beforeJSON = readFileSync('./__tests__/__fixtures__/complex/before.json', 'utf8');
    const afterJSON = readFileSync('./__tests__/__fixtures__/complex/after.json', 'utf8');

    const expected = JSON.parse(astStr);
    const actual = genAST(JSON.parse(beforeJSON), JSON.parse(afterJSON));

    expect(actual).toEqual(expected);
  });
});

describe('genDiff default', () => {
  const expectedFlat = readFileSync('./__tests__/__fixtures__/flat/result.diff', 'utf8');
  const expectedComplex = readFileSync('./__tests__/__fixtures__/complex/result.diff', 'utf8');

  it('should compare flat JSONs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.json',
      './__tests__/__fixtures__/flat/after.json',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat YAMLs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.yml',
      './__tests__/__fixtures__/flat/after.yml',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat INIs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.ini',
      './__tests__/__fixtures__/flat/after.ini',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should throw unsupported format error', () => {
    try {
      genDiff(
        './__tests__/__fixtures__/flat/before.docx',
        './__tests__/__fixtures__/flat/after.docx',
      );
    } catch (error) {
      expect(error.message).toBe('File has unsupported format: .docx');
    }
  });

  it('should compare complex JSONs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.json',
      './__tests__/__fixtures__/complex/after.json',
    );
    expect(actual).toBe(expectedComplex);
  });

  it('should compare complex YAMLs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.yml',
      './__tests__/__fixtures__/complex/after.yml',
    );
    expect(actual).toBe(expectedComplex);
  });

  it('should compare complex INIs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.ini',
      './__tests__/__fixtures__/complex/after.ini',
    );
    expect(actual).toBe(expectedComplex);
  });
});

describe('genDiff plain', () => {
  const expectedFlat = readFileSync('./__tests__/__fixtures__/flat/resultPlain.diff', 'utf8');
  const expectedComplex = readFileSync('./__tests__/__fixtures__/complex/resultPlain.diff', 'utf8');

  it('should compare flat JSONs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.json',
      './__tests__/__fixtures__/flat/after.json',
      'plain',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat YAMLs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.yml',
      './__tests__/__fixtures__/flat/after.yml',
      'plain',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat INIs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/before.ini',
      './__tests__/__fixtures__/flat/after.ini',
      'plain',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare complex JSONs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.json',
      './__tests__/__fixtures__/complex/after.json',
      'plain',
    );
    expect(actual).toBe(expectedComplex);
  });

  it('should compare complex YAMLs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.yml',
      './__tests__/__fixtures__/complex/after.yml',
      'plain',
    );
    expect(actual).toBe(expectedComplex);
  });

  it('should compare complex INIs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/complex/before.ini',
      './__tests__/__fixtures__/complex/after.ini',
      'plain',
    );
    expect(actual).toBe(expectedComplex);
  });
});
