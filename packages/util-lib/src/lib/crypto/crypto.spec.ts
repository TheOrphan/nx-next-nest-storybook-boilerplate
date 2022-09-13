import { encrypt, decrypt } from './crypto';

describe('utilLib', () => {
  it('should work', () => {
    expect(encrypt('coba')).toBeDefined();
  });
  it('should work', () => {
    expect(decrypt('coba')).toBeDefined();
  });
});
