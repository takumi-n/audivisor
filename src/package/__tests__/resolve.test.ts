import { NormalizedAudits } from '../../audit';
import { canResolveVuln, suggestAuditSolution } from '../resolve';

describe('version', () => {
  test.skip('canResolveVuln', async () => {
    console.log(
      await canResolveVuln(['npm-api', 'download-stats', 'moment'], '^2.29.2')
    );
  });

  test('suggestAuditSolution', async () => {
    const normalized: NormalizedAudits = {
      moment: {
        'npm-api>download-stats>moment': '2.29.2',
      },
    };

    expect(await suggestAuditSolution(normalized)).toEqual({
      upgrade: [{ vulnPkg: 'moment', pkg: 'npm-api' }],
      resoluton: [],
    });
  });
});
