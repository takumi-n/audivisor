import NpmApi from 'npm-api';
import semver from 'semver';

export async function fetchLatestVersion(
  pkg: string,
  semVer: string
): Promise<string> {
  const npm = new NpmApi();
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
