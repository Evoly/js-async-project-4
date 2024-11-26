import fs from 'node:fs/promises';
//  import fs from 'fs';
import path from 'node:path';
import url from 'node:url';
import axios from 'axios';
import parse from './parse.js';

const downloadImages = (host, urls, dir) => {
  fs.mkdir(dir, { recursive: true })
    .then(() => {
      const promises = urls.map((pathToImg) => {
        const newUrl = new URL(pathToImg, host);
        return axios.get(newUrl, { responseType: 'arraybuffer' });
      });
      Promise.all(promises)
        .then((response) => {
          const data = response.map((item) => {
            //  console.log('item', item);
            const img = item.config.url.pathname;
            const fileName = img.match(/[^/]+$/)[0];
            const binary = Buffer.from(item.data, 'binary');
            return { fileName, binary };
          });
          return data;
        })
        .then((data) => data.forEach((item) => {
          const pathTofile = path.join(dir, item.fileName);
          fs.writeFile(pathTofile, item.binary);
        }));
    })
    .catch((e) => console.log(e));
};

const getCss = (host, link, dir) => {
  const newUrl = new URL(link, host);
  const fileName = newUrl.toString().match(/[^/]+$/)[0];
  const pathToFile = path.join(dir, `${fileName}`);
  return axios(newUrl.toString(), { timeout: 15000 })
    .then((response) => fs.writeFile(pathToFile, response.data));
};

const fetchData = (link, dir) => {
  const fileName = link.replace(/(^\w+:|^)\/\//, '').replace(/[./]/g, '-');
  const imgDirName = path.join(dir, `${fileName}__files`);
  const pathToFile = path.join(dir, `${fileName}.html`);
  const newUrl = new URL(link);

  return axios(newUrl.toString(), { timeout: 15000 })
    .then((response) => response.data)
    .then((data) => parse(data, pathToFile, `${fileName}__files`))
    .then((data) => {
      const promise1 = downloadImages(newUrl.toString(), data.images, imgDirName);
      const promise2 = getCss(newUrl.toString(), data.link, dir);
      const promise3 = fs.writeFile(pathToFile, data.html);
      return Promise.all([promise1, promise2, promise3]);
    })
    .catch((err) => console.log(err));
};

export default fetchData;

/*
      const stream = fs.createWriteStream(pathToFile, { encoding: 'utf8' });
      stream.write(data);
      stream.end();
*/
