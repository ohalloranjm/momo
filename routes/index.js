const path = require('node:path');
const fs = require('node:fs');

const filePaths = fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .map(file => path.join(__dirname, file));

for (const filePath of filePaths) {
  const callback = require(filePath);
  if ('name' in callback && 'execute' in callback) {
    module.exports[callback.name] = callback.execute;
  } else {
    console.error(
      `[WARNING] ${filePath} is missing a required "name" or "execute" property.`
    );
  }
}
