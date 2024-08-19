#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";
import faker from "faker";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get the framework argument
const argv = yargs(hideBin(process.argv))
  .option("framework", {
    alias: "f",
    describe: "The framework to simulate building",
    type: "string",
    choices: ["react", "svelte", "vue", "angular"],
    default: "react",
  })
  .help().argv;

const framework = argv.framework;

// Validate the framework
const validFrameworks = ["react", "svelte", "vue", "angular"];
if (!validFrameworks.includes(framework)) {
  console.log(
    chalk.red(
      `Invalid framework. Please use one of: ${validFrameworks.join(", ")}`
    )
  );
  process.exit(1);
}

const frameworkConfig = {
  react: {
    buildTool: "webpack",
    testRunner: "Jest",
    styleProcessor: "CSS-in-JS",
    linter: "ESLint",
    formatter: "Prettier",
  },
  svelte: {
    buildTool: "rollup",
    testRunner: "Jest",
    styleProcessor: "SCSS",
    linter: "ESLint",
    formatter: "Prettier",
  },
  vue: {
    buildTool: "Vite",
    testRunner: "Vitest",
    styleProcessor: "SCSS",
    linter: "ESLint",
    formatter: "Prettier",
  },
  angular: {
    buildTool: "Angular CLI",
    testRunner: "Karma",
    styleProcessor: "SCSS",
    linter: "TSLint",
    formatter: "Prettier",
  },
};

async function simulateCrash() {
  console.log(chalk.red("\nERROR: Build process crashed unexpectedly!"));
  console.log(chalk.yellow("Stack trace:"));

  const errorTypes = [
    "TypeError",
    "ReferenceError",
    "SyntaxError",
    "RangeError",
  ];

  const errorMessages = [
    "Cannot read property of undefined",
    "is not a function",
    "Unexpected token",
    "Maximum call stack size exceeded",
  ];

  for (let i = 0; i < 5; i++) {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    const errorMessage =
      errorMessages[Math.floor(Math.random() * errorMessages.length)];
    const file = faker.system.fileName();
    const line = faker.datatype.number({ min: 1, max: 500 });
    const col = faker.datatype.number({ min: 1, max: 80 });

    console.log(chalk.gray(`    at ${errorType}: ${errorMessage}`));
    console.log(
      chalk.gray(`        at Object.<anonymous> (${file}:${line}:${col})`)
    );
    await sleep(500);
  }

  console.log(chalk.red("\nBuild failed. Restarting process in 5 seconds..."));
  await sleep(5000);
}

async function simulateBuild(framework) {
  const config = frameworkConfig[framework];
  console.log(chalk.blue(`Starting ${framework} app build process...`));

  // Initialize project
  const initSpinner = ora("Initializing project").start();
  await sleep(2000);
  initSpinner.succeed("Project initialized");

  // Install dependencies
  const depsSpinner = ora("Installing dependencies").start();
  for (let i = 0; i < 20; i++) {
    await sleep(200);
    depsSpinner.text = `Installing dependencies (${i * 5}%)`;
  }
  depsSpinner.succeed("Dependencies installed");

  // Configure build tools
  console.log(chalk.yellow(`Configuring ${config.buildTool}...`));
  for (let i = 0; i < 5; i++) {
    await sleep(500);
    console.log(
      chalk.gray(
        `[${faker.random.alphaNumeric(8)}] Setting up ${
          config.buildTool
        } config: ${faker.system.fileName()}`
      )
    );
  }

  // Set up test environment
  const testSetupSpinner = ora(`Setting up ${config.testRunner}`).start();
  await sleep(3000);
  testSetupSpinner.succeed(`${config.testRunner} configured`);

  // Compile source code
  console.log(chalk.yellow("Compiling source code..."));
  const files = ["components", "services", "utils", "models", "hooks"];
  for (const file of files) {
    const compileSpinner = ora(`Compiling ${file}`).start();
    await sleep(1500);
    compileSpinner.succeed(`${file} compiled`);
  }

  // Process styles
  const styleSpinner = ora(
    `Processing ${config.styleProcessor} styles`
  ).start();
  await sleep(2500);
  styleSpinner.succeed("Styles processed");

  // Run linter
  console.log(chalk.yellow(`Running ${config.linter}...`));
  for (let i = 0; i < 10; i++) {
    await sleep(300);
    console.log(
      chalk.gray(
        `[${faker.random.alphaNumeric(8)}] Linting: ${faker.system.fileName()}`
      )
    );
  }

  // Run formatter
  const formatSpinner = ora(`Running ${config.formatter}`).start();
  await sleep(2000);
  formatSpinner.succeed("Code formatted");

  // Run tests
  console.log(chalk.yellow(`Running ${config.testRunner} tests...`));
  for (let i = 0; i < 15; i++) {
    await sleep(400);
    console.log(
      chalk.gray(
        `[${faker.random.alphaNumeric(8)}] ${faker.random.words(3)} test: ${
          faker.random.boolean() ? "PASS" : "FAIL"
        }`
      )
    );
  }

  // Build production bundle
  const buildSpinner = ora(`Building ${framework} production bundle`).start();
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    buildSpinner.text = `Building ${framework} production bundle (${i * 5}%)`;
  }
  buildSpinner.succeed(`${framework} production bundle built`);

  // Optimize bundle
  const optimizeSpinner = ora("Optimizing bundle").start();
  await sleep(3000);
  optimizeSpinner.succeed("Bundle optimized");

  // Generate source maps
  const sourcemapSpinner = ora("Generating source maps").start();
  await sleep(2500);
  sourcemapSpinner.succeed("Source maps generated");

  // Run final checks
  console.log(chalk.yellow("Running final checks..."));
  const checks = [
    "Security audit",
    "Performance benchmark",
    "Accessibility scan",
    "Browser compatibility check",
  ];
  for (const check of checks) {
    const checkSpinner = ora(check).start();
    await sleep(1500);
    checkSpinner.succeed(`${check} passed`);
  }


  if (Math.random() < 0.7) {
    await simulateCrash();
  } else {
    console.log(chalk.green("\nBuild completed successfully!"));
    console.log(chalk.cyan("Waiting for changes..."));
    await sleep(10000);
  }
}

async function run() {
  while (true) {
    await simulateBuild(framework);
  }
}

run();
