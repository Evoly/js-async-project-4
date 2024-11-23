import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'os';

import nock from 'nock';
import fetchData from '../src/index.js';

const dir = os.tmpdir();
const fileName = 'ru-hexlet-io-courses.html';
const response = "<!DOCTYPE html><html data - bs - theme='light' lang = 'ru' prefix = 'og: https://ogp.me/ns#' >";

test('fetchData', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, response);
  const pathToFile = path.join(dir, fileName);
  console.log(pathToFile);
  await fetchData('https://ru.hexlet.io/courses', dir);
  const data = await fs.readFile(pathToFile, { encoding: 'utf8' });
  expect(data).toBe(response);
});
