import semver from 'semver';
import NpmApi from 'npm-api';
import { fetchLatestVersion } from './util';

export async function canResolveVuln(
  pkgs: string[],
  minPatchedVersion: string
): Promise<boolean> {
  const npm = new NpmApi();

  let versionRange = '';
  for (let index = 0; index < pkgs.length; index++) {
    const pkg = pkgs[index];
    const version = await fetchLatestVersion(pkg, versionRange);
    const deps = (await npm.repo(pkg).version(version)).dependencies;

    const nextPkg = pkgs[index + 1];
    if (nextPkg) {
      const dep = Object.keys(deps).find((k) => k === nextPkg);
      if (!dep) {
        // root package dose not depend on vulnerable package no longer
        return true;
      }

      versionRange = deps[dep];
      continue;
    }

    return semver.satisfies(version, minPatchedVersion);
  }

  return false;
}
