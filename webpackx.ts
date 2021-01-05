import path from 'path';
import { ChildProcess, spawn } from 'child_process';

import webpack from 'webpack';

import config, { outputPath, outputFilename } from './webpack/webpack.config';

const compilerRunPromise = (compiler) =>
  new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats && stats.hasErrors()) {
        reject(err || stats.toString());
      }

      resolve(stats);
    });
  });

export function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Exit with error code: ${code}`));
      }
    });
    childProcess.once('error', (err: Error) => {
      reject(err);
    });
  });
}

const runProgram = async () => {
  const outputFile = path.join(outputPath, outputFilename);

  console.log({
    execPath: process.execPath,
    outputFile,
  });
  const childProcess = spawn(
    process.execPath,
    ['--conditions=react-server', outputFile],
    {
      stdio: [process.stdin, process.stdout, process.stderr],
    },
  );

  await onExit(childProcess);
};

(async () => {
  try {
    const wpConfig = {
      ...config,
      entry: path.join(__dirname, process.argv[2]),
    };

    const compiler = webpack(wpConfig);

    const stats = await compilerRunPromise(compiler);

    // eslint-disable-next-line
    console.log(stats.toString());

    await runProgram();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
})();
