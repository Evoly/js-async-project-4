// const fs = require('fs');
import fs from 'node:fs';

const data = fs.readFileSync(
  './package.json',
  { encoding: 'utf8', flag: 'r' },
);

const { version } = JSON.parse(data);

export default version;
