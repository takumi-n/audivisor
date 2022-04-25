import { canResolveVuln } from '../resolve';

describe('version', () => {
  test.skip('canResolveVuln', async () => {
    console.log(
      await canResolveVuln(['npm-api', 'download-stats', 'moment'], '^2.29.2')
    );
  });
});
