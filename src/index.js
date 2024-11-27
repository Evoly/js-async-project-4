import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import axios from 'axios';

import parse from './parse.js';
import { getCss, downloadImages } from './downloadAssets.js';

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
