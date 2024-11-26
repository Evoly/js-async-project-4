import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const getFixturePath = (filename) => path.join(__dirname, '../__tests__/__fixtures__', filename);
console.log(getFixturePath);

//  const data1 = fs.readFileSync(getFixturePath('after.html'), 'utf-8');

const parse = (data, dir, imgPath) => {
  const $ = cheerio.load(data);
  const pathToImges = $('img').map((_, element) => {
    const src = $(element).attr('src');
    const imageName = src.match(/[^/]+$/)[0];
    $(element).attr('src', `${imgPath}/${imageName}`);
    return src;
  });
  const link = $('[rel="stylesheet"]').attr('href');
  console.log('link', link);
  return { images: pathToImges.toArray(), link, html: $.html() };
};

export default parse;

//  $('img').attr('src', 'https://example.com/image.jpg');

//  $("p").each((index, element) => $(element).replaceWith(items[index]))
