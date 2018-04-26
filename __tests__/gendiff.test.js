import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import { genDiff, genAST } from '../src';

describe('complex fixtures', () => {
  it('have an appropriate content', () => {
    const beforeJSON = readFileSync('./__tests__/__fixtures__/complex/before.json', 'utf8');
    const afterJSON = readFileSync('./__tests__/__fixtures__/complex/after.json', 'utf8');
    const beforeYAML = readFileSync('./__tests__/__fixtures__/complex/before.yml', 'utf8');
    const afterYAML = readFileSync('./__tests__/__fixtures__/complex/after.yml', 'utf8');
    const beforeINI = readFileSync('./__tests__/__fixtures__/complex/before.ini', 'utf8');
    const afterINI = readFileSync('./__tests__/__fixtures__/complex/after.ini', 'utf8');

    const expectedBefore = JSON.parse(beforeJSON);
    const expectedAfter = JSON.parse(afterJSON);

    expect(safeLoad(beforeYAML)).toEqual(expectedBefore);
    expect(safeLoad(afterYAML)).toEqual(expectedAfter);
    expect(ini.parse(beforeINI)).toEqual(expectedBefore);
    expect(ini.parse(afterINI)).toEqual(expectedAfter);
  });
});

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

describe('genDiff', () => {
  const expectedFlat = readFileSync('./__tests__/__fixtures__/flat/flat.diff', 'utf8');
  const expectedComplex = readFileSync('./__tests__/__fixtures__/complex/result.diff', 'utf8');

  it('should compare flat JSONs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/flat1.json',
      './__tests__/__fixtures__/flat/flat2.json',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat YAMLs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/flat1.yml',
      './__tests__/__fixtures__/flat/flat2.yml',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should compare flat INIs', () => {
    const actual = genDiff(
      './__tests__/__fixtures__/flat/flat1.ini',
      './__tests__/__fixtures__/flat/flat2.ini',
    );
    expect(actual).toBe(expectedFlat);
  });

  it('should throw unsupported format error', () => {
    try {
      genDiff(
        './__tests__/__fixtures__/flat/flat1.docx',
        './__tests__/__fixtures__/flat/flat2.docx',
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
});
