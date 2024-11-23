#!/usr/bin/env node
import os from 'os';
import { Command } from 'commander';
import version from '../src/version.js';
import fetchData from '../index.js';

const program = new Command();
const dir = os.tmpdir();

program
  .name('page-loader')
  .arguments('url')
  .description('to do')
  .version(version, '-V, --version', 'output the version number')
  .option('-o --output <path>', 'choose output dir', dir)
  .helpOption('-h --help', 'output usage information')
  .action((url, options) => {
    console.log('opts', options.output);
    fetchData(url, options.output);
  });

program.parse();
