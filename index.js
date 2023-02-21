#! /usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const path = require('path')
const demoTemplate =
  `import { AppBar } from 'asap-ui';
import React from 'react';

const Demo = () => {
  return (
    <>
        
    </>
  );
};
`

yargs
  .commands('create <folder>', 'Create a new component folder', (yargs)=> {
    yargs.positional('folder', {
      describe: 'Folder name',
      type: 'string'
    });
  }, (argv) => {
    const absoluteFolderPath = path.resolve('src')
    const folderName = argv.folder;
    fs.mkdirSync(path.join(absoluteFolderPath, folderName));
    fs.mkdirSync(path.join(absoluteFolderPath, `${folderName}/demo`))
    fs.writeFileSync(path.join(absoluteFolderPath, `${folderName}/demo`, 'index.tsx'), demoTemplate )
    fs.writeFileSync(path.join(absoluteFolderPath, `${folderName}`, 'index.less'), '')
    fs.writeFileSync(path.join(absoluteFolderPath, `${folderName}`, 'index.tsx'), '')
    fs.writeFileSync(path.join(absoluteFolderPath, `${folderName}`, 'index.md'), '')
    fs.writeFileSync(path.join(absoluteFolderPath, `${folderName}`, 'props.ts'), '')
  })
  .help()
  .argv;
