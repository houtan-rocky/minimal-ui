import { it, expect, describe } from 'vitest';

import { flattenArray } from './flatten-array';

describe('Flattens array', () => {
  it('flattens given array', () => {
    const array = [{ name: 'Ali' }];
    const flattenResult = flattenArray(array, 'name');
    const flatForm = [{ name: 'Ali' }, 'A', 'l', 'i'];
    expect(flattenResult).toStrictEqual(flatForm);
  });
});
