import picocolors from 'picocolors';

type LogLevel = 'error' | 'warn' | 'info';

export function log(level: LogLevel, message: string) {
  const bold = picocolors.bold(` ${level} `);
  const prefix =
    level === 'error'
      ? picocolors.bgRed(bold)
      : level === 'warn'
      ? picocolors.bgYellow(bold)
      : picocolors.bgCyan(bold);

  console[level](`${prefix} ${message}`);
}

export function info(message: string) {
  log('info', message);
}

export function warn(message: string) {
  log('warn', message);
}

export function error(message: string) {
  log('error', message);
}
