import { describe, expect, it } from '@jest/globals';
import { comparePassword, hashPassword } from '../src/services';

describe('Bcrypt service', () => {
  it('should hash and compare passwords', async () => {
    const passwordHash = await hashPassword('Dairo_1234');
    const isMatch = await comparePassword('Dairo_1234', passwordHash);
    expect(isMatch).toBeTruthy();
  });

  it('should not match different passwords', async () => {
    const passwordHash = await hashPassword('Dairo_1234');
    const isMatch = await comparePassword('Dairo_12345', passwordHash);
    expect(isMatch).toBeFalsy();
  });
});
