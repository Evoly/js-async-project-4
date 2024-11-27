import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import parse from '../../src/parse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const before = fs.readFileSync(getFixturePath('before.html'), 'utf-8');
const after = fs.readFileSync(getFixturePath('after.html'), 'utf-8');
const imageDir = 'ru-hexlet-io-courses_files';
const regex = /[\n\s]/gm;

const expected = {};

beforeAll(() => {
  const $ = cheerio.load(after);
  const src = $('img').attr('src');
  const link = $('[rel="stylesheet"]').attr('href');
  const html = $.html();
  expected.html = html.replaceAll(regex, '');
  expected.src = src;
  expected.link = link;
});

test('parse', () => {
  const result = parse(before, imageDir);
  const parseHtml = result.html;
  const $ = cheerio.load(parseHtml);
  const parseSrc = $('img').attr('src');
  const link = $('[rel="stylesheet"]').attr('href');

  expect(parseHtml.replaceAll(regex, '')).toEqual(expected.html);
  expect(expected.src).toEqual(parseSrc);
  expect(expected.link).toEqual(link);
});

// todo old src ?
