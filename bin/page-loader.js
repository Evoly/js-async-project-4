#!/usr/bin/env node
import { Command } from 'commander';
import version from '../src/version.js';

const program = new Command();

program
  .name('page-loader')
  .arguments('url')
  .description('to do')
  .version(version, '-V, --version', 'output the version number')
  .option('-o --output', 'choose output dir', './dist')
  .helpOption('-h --help', 'output usage information')
  .action((url, options) => {
    console.log(url, options);
  });

program.parse();
