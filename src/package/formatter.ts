import columnify from 'columnify';
import picocolors from 'picocolors';
import { AuditSolution } from './resolve';

export function outputTextSolution(result: AuditSolution) {
  console.log(
    `
${picocolors.bgGreen(picocolors.bold(' Upgrading '))}
You can resolve the vulnerabilities by upgrading dependent packages.

${columnify(result.upgrade, {
  columnSplitter: ' | ',
  columns: ['pkg', 'vulnPkg'],
  config: {
    pkg: {
      headingTransform: () => picocolors.bold(' Dependent package '),
      align: 'center',
    },
    vulnPkg: {
      headingTransform: () => picocolors.bold(' Vulnerable package '),
      align: 'center',
    },
  },
})}

${picocolors.bgYellow(picocolors.bold(' Resolution '))}
You can resolve the vulnerabilities by dependency resolution.
see: https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/


${columnify(result.resolution, {
  columnSplitter: ' | ',
  columns: ['pkg', 'vulnPkg'],
  config: {
    pkg: {
      headingTransform: () => picocolors.bold(' Dependent package '),
      align: 'center',
    },
    vulnPkg: {
      headingTransform: () => picocolors.bold(' Vulnerable package '),
      align: 'center',
    },
  },
})}
`
  );
}

export function outpuJsonSolution(result: AuditSolution) {
  console.log(JSON.stringify(result));
}
