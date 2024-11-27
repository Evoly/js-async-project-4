import * as cheerio from 'cheerio';

const parse = (data, imgPath) => {
  const $ = cheerio.load(data);
  const pathToImges = $('img').map((_, element) => {
    const src = $(element).attr('src');
    const imageName = src.match(/[^/]+$/)[0];
    $(element).attr('src', `${imgPath}/${imageName}`);
    return src;
  });
  const images = pathToImges.toArray() ?? [];
  const link = $('[rel="stylesheet"]').attr('href') ?? [];
  const html = $.html();
  return { html, images, link };
};

export default parse;

//  $('img').attr('src', 'https://example.com/image.jpg');

//  $("p").each((index, element) => $(element).replaceWith(items[index]))
