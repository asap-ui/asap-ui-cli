#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.version('0.0.2');

program
  .command('create <folder>')
  .description('create a new component directory')
  .action(async (folder) => {
    const createFile = await import('./command/create/index.js');
    return createFile.default(folder);
  });

program
  .command('analysis')
  .description('code analysis report')
  .action(async () => {
    const codeAnalysis = await import('./command/codeAnalysis/index.js');
    return codeAnalysis.default();
  });

program.parse(process.argv);
