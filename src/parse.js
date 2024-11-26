import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const getFixturePath = (filename) => path.join(__dirname, '../__tests__/__fixtures__', filename);
console.log(getFixturePath);

//  const data1 = fs.readFileSync(getFixturePath('after.html'), 'utf-8');

const parse = (data, dir, imgPath) => {
  console.log('dir:', dir)
  const imgSrc = [];
  const $ = cheerio.load(data);
  $('img').each((index, element) => {
    const src = $(element).attr('src');
    const imageName = src.match(/[^/]+$/)[0];
    imgSrc.push(src);
    $(element).attr('src', `${imgPath}/${imageName}`);
  });
  fs.writeFileSync(dir, $.html());
  return imgSrc;
};

//  parse(data1);

export default parse;

//  $('img').attr('src', 'https://example.com/image.jpg');

//  $("p").each((index, element) => $(element).replaceWith(items[index]))
