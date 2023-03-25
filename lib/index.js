#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.version('0.0.1');

program
  .command('create <folder>')
  .description('create a new component directory')
  .action(async (folder) => {
    const createFile = await import('./command/create/index.js');
    return createFile.default(folder);
  }
);

program.parse(process.argv);