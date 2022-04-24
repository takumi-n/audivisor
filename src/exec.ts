import { Readable } from 'stream';
import readline from 'readline';
import { spawn } from 'child_process';

export async function* execYarnAudit(): AsyncGenerator<any> {
  const command = spawn('yarn', ['audit', '--json']).stdout;
  for await (const line of lineIterator(command)) {
    yield JSON.parse(line);
  }
}

async function* lineIterator(stream: Readable): AsyncGenerator<string> {
  const rl = readline.createInterface(stream);
  for await (const line of rl) {
    yield line;
  }
}
