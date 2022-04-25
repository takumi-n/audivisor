import semver from 'semver';
import NpmApi from 'npm-api';

const npm = new NpmApi();

export async function canResolveVuln(
  pkgs: string[],
  minPatchedVersion: string
): Promise<boolean> {
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

export async function fetchLatestVersion(
  pkg: string,
  semVer: string
): Promise<string> {
  if (!semVer) {
    return (await npm.repo(pkg).package()).version;
  }

  const pkgs = await npm.repo(pkg).package('all');
  const versions = Object.keys(pkgs.versions);
  const latestVersionConstrainedBySemver = versions
    .reverse()
    .find((v) => semver.satisfies(v, semVer));
  if (!latestVersionConstrainedBySemver) {
    throw new Error(`${pkg} does not satisfy version range '${semVer}'`);
  }

  return latestVersionConstrainedBySemver;
}
