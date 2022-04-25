import semver from 'semver';
import { Audit } from '../model';
import { normalizeAudits } from '../convert';

describe('semver', () => {
  test('Detect minimum patched version', () => {
    expect(semver.minVersion('>5.0.0')?.version).toBe('5.0.1');
  });
});

describe('normalizeAudits', () => {
  test('Normalize multiple patched versions of same package', () => {
    const audits: Audit[] = [
      {
        pkg: 'vuln',
        paths: ['a>vuln'],
        patchedVersions: '3.0.0',
      },
      {
        pkg: 'vuln',
        paths: ['a>vuln'],
        patchedVersions: '>4.0.0',
      },
    ];

    expect(normalizeAudits(audits)).toEqual({
      vuln: {
        'a>vuln': '4.0.1',
      },
    });
  });

  test('Normalize multiple packages', () => {
    const audits: Audit[] = [
      {
        pkg: 'vuln',
        paths: ['a>vuln', 'b>c>vuln'],
        patchedVersions: '3.0.0',
      },
    ];

    expect(normalizeAudits(audits)).toEqual({
      vuln: {
        'a>vuln': '3.0.0',
        'b>c>vuln': '3.0.0',
      },
    });
  });
});
