import { parseToken } from './parse-token';

describe('utilLib', () => {
  it('should work', () => {
    expect(parseToken('coba')).toBeDefined();
  });
});
