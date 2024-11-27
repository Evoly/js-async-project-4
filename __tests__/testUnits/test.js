import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import os from 'os';
import nock from 'nock';

import { config } from 'node:process';
import { url } from 'node:inspector';
import { getCss, downloadImages } from '../../src/downloadAssets.js';
import fetchData from '../../src/index.js';

const dir = os.tmpdir();
const fileName = 'ru-hexlet-io-courses.html';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

beforeAll(async () => {
  await fs.mkdir(path.join(dir, 'test'), { recursive: true });
});

test('fetchData', async () => {
  const response = await fs.readFile(getFixturePath('before1.html'), 'utf-8');

  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, response);
  const pathToFile = path.join(`${dir}/test`, fileName);
  console.log(pathToFile);
  await fetchData('https://ru.hexlet.io/courses', path.join(dir, 'test'));
  const result = await fs.readFile(pathToFile, { encoding: 'utf8' });
  expect(result).toBe(response);
});

test('getCss', async () => {
  const response = await fs.readFile(getFixturePath('main.css'), 'utf-8');

  nock('https://ru.hexlet.io')
    .get('/courses/main.css')
    .reply(200, response);
  const pathToFile = path.join(`${dir}/test`, 'main.css');
  await getCss('https://ru.hexlet.io/courses/', 'main.css', path.join(dir, 'test'));
  const result = await fs.readFile(pathToFile, { encoding: 'utf8' });
  expect(result).toBe(response);
});

test('downloadImages', async () => {
  const img = '00111100 01110011 01110110 01100111 00100000 01110111 01101001 01100100 01110100 01101000 00111101 00100010 00110001 00110100 00100010 00100000 01101000 01100101 01101001 01100111 01101000 01110100 00111101 00100010 00110110 00100010 00100000 01110110 01101001 01100101 01110111 01000010 01101111 01111000 00111101 00100010 00110000 00100000 00110000 00100000 00110001 00110100 00100000 00110110 00100010 00100000 01100110 01101001 01101100 01101100 00111101 00100010 01101110 01101111 01101110 01100101 00100010 00100000 01111000 01101101 01101100 01101110 01110011 00111101 00100010 01101000 01110100 01110100 01110000 00111010 00101111 00101111 01110111 01110111 01110111 00101110 01110111 00110011 00101110 01101111 01110010 01100111 00101111 00110010 00110000 00110000 00110000 00101111 01110011 01110110 01100111 00100010 00111110 00001010 00111100 01110000 01100001 01110100 01101000 00100000 01100100 00111101 00100010 01001101 00110001 00110100 00100000 00110010 01010110 00110100 01001000 00110011 01010110 00110110 01001100 00110000 00100000 00110011 01001100 00110011 00100000 00110000 01010110 00110010 01001000 00110001 00110100 01011010 00100010 00100000 01100110 01101001 01101100 01101100 00111101 00100010 00100011 00110010 00111001 00110010 00111001 00110010 00111001 00100010 00101111 00111110 00001010 00111100 00101111 01110011 01110110 01100111 00111110 00001010';
  const buf = Buffer.from(img);
  const response = {
    data: buf,
    config: {
      url: {
        pathname: 'test.svg',
      },
    },
  };

  nock('https://ru.hexlet.io')
    .get('/courses/test.svg')
    .reply(200, response);
  const pathToFile = path.join(`${dir}/test`, 'test.svg');
  await downloadImages('https://ru.hexlet.io/courses/', ['test.svg'], path.join(dir, 'test'));
  const result = await fs.access(pathToFile).then(() => true).catch(() => false);
  expect(result).toBe(true);
});

/*
afterAll(async () => {
  await fs.rmdir(path.join(dir, 'test'), { recursive: true, force: true });
});
*/
