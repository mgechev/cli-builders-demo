import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import * as childProcess from 'child_process';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  command: string;
  args: string[];
}

export default createBuilder<Options>((options, context) => {
  return new Promise<BuilderOutput>((resolve, reject) => {
    context.reportStatus(`Executing "${options.command}"...`);
    const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe' });

    child.stdout.on('data', (data) => {
      context.logger.info(data.toString());
    });
    child.stderr.on('data', (data) => {
      context.logger.error(data.toString());
      reject();
    });

    context.reportStatus(`Done.`);
    child.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
});
