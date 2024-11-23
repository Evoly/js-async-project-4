import fs from 'node:fs/promises';
//  import fs from 'fs';
import path from 'node:path';
import axios from 'axios';

const fetchData = async (url, dir) => {
  const fileName = url.replace(/(^\w+:|^)\/\//, '').replace(/[./]/g, '-');
  const pathToFile = path.join(dir, `${fileName}.html`);
  console.log('path fetch:', pathToFile);

  return axios(url, { timeout: 15000 })
    .then((response) => response.data)
    .then((data) => fs.writeFile(pathToFile, data))
    .catch((err) => console.log(err));
};

export default fetchData;

/*
      const stream = fs.createWriteStream(pathToFile, { encoding: 'utf8' });
      stream.write(data);
      stream.end();
*/
