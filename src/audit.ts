import semver from 'semver';

export type Audit = {
  pkg: string;
  paths: string[];
  patchedVersions: string;
};

export type NormalizedAudits = {
  [packageName: string]: {
    [path: string]: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertAuditObj(obj: any): Audit {
  const pkg = obj.data.advisory.module_name;
  const patchedVersions = obj.data.advisory.patched_versions;
  const paths = (obj.data.advisory.findings as any[]) // eslint-disable-line @typescript-eslint/no-explicit-any
    .map((f: any) => f.paths) // eslint-disable-line @typescript-eslint/no-explicit-any
    .flat();
  return { pkg, paths, patchedVersions };
}

export function normalizeAudits(audits: Audit[]): NormalizedAudits {
  const normalized: NormalizedAudits = {};
  audits.forEach((audit) => {
    if (!normalized[audit.pkg]) {
      normalized[audit.pkg] = {};
    }

    const minPatchedVersion = semver.minVersion(audit.patchedVersions)?.version;
    if (!minPatchedVersion) {
      return;
    }

    audit.paths.forEach((path) => {
      if (
        !normalized[audit.pkg][path] ||
        semver.gt(minPatchedVersion, normalized[audit.pkg][path])
      ) {
        normalized[audit.pkg][path] = minPatchedVersion;
      }
    });
  });

  return normalized;
}
