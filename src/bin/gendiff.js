#!/usr/bin/env node
import program from 'commander';
import { compareFiles } from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => console.log(compareFiles(firstConfig, secondConfig)));

program.parse(process.argv);
