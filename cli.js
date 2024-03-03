#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fsExtra from 'fs-extra'; // Import fs-extra

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = new Command();

async function addModuleTypeToPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json'); // Adjusted to use process.cwd()
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
  packageJson.type = "module";
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log(chalk.green('Successfully added "type": "module" to package.json in your workspace.'));
}

async function copyDirectory(sourceDir, targetDir) {
 try {
    await fsExtra.copy(sourceDir, targetDir, {
      filter: (src, dest) => {
        const excludeFiles = ['package.json', 'tea.yaml', 'package-lock.json', '.gitignore', 'cli.js', 'README.md', '.vscode', 'cache', 'node_modules', '.npmignore'];
        return !excludeFiles.includes(path.basename(src));
      }
    });
    console.log(chalk.green(`Successfully copied directory to your workspace directory.`));
 } catch (error) {
    console.error(chalk.red('Oopsss:'), error);
 }
}

pkg
 .command('init')
 .description('Moving project to your workspace')
 .action(async () => {
    try {
      await addModuleTypeToPackageJson(); // Add "type": "module" to package.json
      const sourceDir = path.join(__dirname, ''); // This is the root of your source directory
      const targetDir = process.cwd();
      await copyDirectory(sourceDir, targetDir);
    } catch (error) {
      console.error(chalk.red('Oopsss:'), error);
    }
 });

pkg.parse(process.argv);
