import express from 'express';
import fs from 'fs';

function ReadFile(path: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
export default async function CreateWeb() {
  const cache = {
    script: await ReadFile('./web/script.js'),
    style: await ReadFile('./web/style.css'),
    index: await ReadFile('./web/index.html')
  };
  const app = express();
  app.get('/script.js', (req, res) => {
    res.header("Content-Type", "text/javascript").end(cache.script);
  });
  app.get('/style.css', (req, res) => {
    res.header("Content-Type", "text/css").end(cache.style);
  });
  app.get('*', (req, res) => {
    res.header("Content-Type", "text/html").end(cache.index);
  });
  return app;
}
