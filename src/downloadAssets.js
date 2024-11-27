import fs from 'node:fs/promises';
import axios from 'axios';
import path from 'node:path';

export const downloadImages = async (host, urls, dir) => {
  if (urls.length === 0) return;
  fs.mkdir(dir, { recursive: true })
    .then(() => {
      const promises = urls.map((pathToImg) => {
        const newUrl = new URL(pathToImg, host);
        return axios.get(newUrl, { responseType: 'arraybuffer' });
      });
      Promise.all(promises)
        .then((response) => {
          const data = response.map((item) => {
            //  console.log('item:', item.data);
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

export const getCss = async (host, link, dir) => {
  if (link.length === 0) return;

  const newUrl = new URL(link, host);
  console.log('css:', newUrl.toString());
  const fileName = newUrl.toString().match(/[^/]+$/)[0];
  const pathToFile = path.join(dir, `${fileName}`);
  axios(newUrl.toString(), { timeout: 15000 })
    .then((response) => fs.writeFile(pathToFile, response.data));
};
