import { canResolveVuln, fetchLatestVersion } from '../version';

describe('version', () => {
  test.skip('canResolveVuln', async () => {
    console.log(
      await canResolveVuln(['npm-api', 'download-stats', 'moment'], '^2.29.2')
    );
  });

  test('fetchLatestVersion', async () => {
    expect(await fetchLatestVersion('semver', '^2.0.0')).toBe('2.3.2');
  });
});
