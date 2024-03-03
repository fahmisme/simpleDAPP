#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import pkg from 'commander';
const { program } = pkg;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

pkg
 .command('init')
 .description('Moving project to your workspace')
 .action(async () => {
    try {
      const sourceDir = path.join(__dirname, '');
      const targetDir = process.cwd();

      // List file and folders wanna to exclude
      const excludeFiles = ['package.json', 'tea.yaml', 'package-lock.json', '.gitignore', 'cli.js', 'README.md', '.vscode', 'cache', 'node_modules', '.npmignore'];

      const files = await fs.readdir(sourceDir);
      for (const file of files) {
        if (!excludeFiles.includes(file)) {
          const sourcePath = path.join(sourceDir, file);
          const targetPath = path.join(targetDir, file);
          await fs.copy(sourcePath, targetPath, { overwrite: true });
          console.log(chalk.green(`Success moving ${file} to your workspace directory.`));
        }
      }
    } catch (error) {
      console.error(chalk.red('Oopsss:'), error);
    }
 });

pkg.parse(process.argv);
