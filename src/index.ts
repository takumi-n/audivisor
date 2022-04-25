import { cac } from 'cac';
import fs from 'fs';
import { execYarnAudit } from './exec';
import * as logger from './logger';
import { Audit, convertAuditObj, normalizeAudits } from './audit';
import pkg from '../package.json';

async function main() {
  const cli = cac(pkg.name);
  cli.option('-f, --file <file>', 'File to read from');
  cli.version(pkg.version);
  cli.help();
  const parsed = cli.parse();

  const audits: Audit[] = [];

  if (parsed.options.file) {
    if (
      (typeof parsed.options.file !== 'string' &&
        typeof parsed.options.file !== 'number') ||
      `${parsed.options.file}` === ''
    ) {
      logger.error('File must be specified');
      process.exit(1);
    }

    const file = `${parsed.options.file}`;
    if (!fs.existsSync(file)) {
      logger.error(`File ${file} does not exist`);
      process.exit(1);
    }

    const fileContents = fs.readFileSync(file);
    audits.push(
      ...JSON.parse(fileContents.toString())
        .filter((obj: any) => obj.type === 'auditAdvisory') // eslint-disable-line @typescript-eslint/no-explicit-any
        .map(convertAuditObj)
    );
  } else {
    for await (const obj of execYarnAudit()) {
      if (obj.type !== 'auditAdvisory') {
        continue;
      }

      audits.push(convertAuditObj(obj));
    }
  }

  const normalized = normalizeAudits(audits);
  console.log(JSON.stringify(normalized, null, 2));
}

main();