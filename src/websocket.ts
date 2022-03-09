import { Server } from 'http';
import { Server as wsServer } from 'ws';
import fs from 'fs';
import { resolve } from 'path';
import mime from "mime";

export default function CreateWebSocket(server: Server) {
  const ws = new wsServer({ server });
  ws.on('connection', (client) => {
    console.log('connected');
    client.on('message', (data) => {
      const msg = '.' + data.toString('utf-8');
      console.log(msg);
      if (!fs.existsSync(msg)) {
        client.close();
        return;
      }
      client.send(getFile(msg));
      fs.watchFile(msg, {}, () => {
        client.send(getFile(msg));
      });
    });
  });
  return ws;
}
function getFile (path:string) {
  const type = mime.getType(path);
  const data = fs.readFileSync(path).toString('base64');
  return `data:${type};base64,${data}`
}

console.log(resolve('.'));
