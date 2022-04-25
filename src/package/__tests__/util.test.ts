import { fetchLatestVersion } from '../util';

describe('version', () => {
  test('fetchLatestVersion', async () => {
    expect(await fetchLatestVersion('semver', '^2.0.0')).toBe('2.3.2');
  });
});
