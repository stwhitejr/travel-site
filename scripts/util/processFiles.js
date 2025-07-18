const fs = require('fs-extra');
const path = require('path');

async function processFiles(inputDir, processFunc) {
  await fs.ensureDir(inputDir);
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const filePath = path.join(inputDir, file);
    const ext = path.extname(file).toLowerCase();
    const fileName = path.basename(file, ext);
    const result = await processFunc(file, {filePath, fileName});
    if (result === 'continue') {
      continue;
    } else if (result === 'break') {
      break;
    }
  }
}

module.exports = processFiles;
